const path = require('path');
const BaseGenerator = require('./base-generator');

class CPlusPlusGenerator extends BaseGenerator {
    async createSourceDirs(projectDir) {
        const fs = require('fs').promises;

        // Create C++-specific directories
        await fs.mkdir(path.join(projectDir, 'source', 'src'), { recursive: true });
        await fs.mkdir(path.join(projectDir, 'source', 'include'), { recursive: true });
        await fs.mkdir(path.join(projectDir, 'source', 'lib'), { recursive: true });

        // Also ensure the report directory exists
        await fs.mkdir(path.join(projectDir, 'report'), { recursive: true });
    }

    async generateFile(fileConfig, projectDir) {
        if (!fileConfig.name) {
            return;
        }

        // Generate header file
        await this.generateHeaderFile(fileConfig, projectDir);

        // Generate implementation file
        await this.generateImplementationFile(fileConfig, projectDir);
    }

    async generateHeaderFile(fileConfig, projectDir) {
        const headerName = `${fileConfig.name}.hpp`;
        const headerPath = path.join(projectDir, 'source', 'include', headerName);

        const guardName = `${fileConfig.name.toUpperCase()}_HPP`;

        let content = `/**
 * @file ${headerName}
 * @brief Header file for ${fileConfig.name}
 */

#ifndef ${guardName}
#define ${guardName}

// Standard includes
#include <iostream>
#include <string>
#include <vector>
#include <memory>

namespace ${this.toLowerSnakeCase(path.basename(projectDir))} {

`;

        // Add class declarations
        if (fileConfig.types && fileConfig.types.length > 0) {
            for (const typeConfig of fileConfig.types) {
                content += this.generateClassDeclaration(typeConfig);
                content += '\n';
            }
        }

        // Add function declarations
        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                content += this.generateFunctionDeclaration(func);
                content += '\n';
            }
        }

        content += `} // namespace ${this.toLowerSnakeCase(path.basename(projectDir))}\n\n`;
        content += `#endif // ${guardName}\n`;

        await this.writeFile(headerPath, content);
    }

    async generateImplementationFile(fileConfig, projectDir) {
        const sourceName = `${fileConfig.name}.cpp`;
        const sourcePath = path.join(projectDir, 'source', 'src', sourceName);

        let content = `/**
 * @file ${sourceName}
 * @brief Implementation file for ${fileConfig.name}
 */

#include "${fileConfig.name}.hpp"

namespace ${this.toLowerSnakeCase(path.basename(projectDir))} {

`;

        // Add class implementations
        if (fileConfig.types && fileConfig.types.length > 0) {
            for (const typeConfig of fileConfig.types) {
                content += this.generateClassImplementation(typeConfig);
                content += '\n';
            }
        }

        // Add function implementations
        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                content += this.generateFunctionImplementation(func);
                content += '\n';
            }
        }

        content += `} // namespace ${this.toLowerSnakeCase(path.basename(projectDir))}\n`;

        await this.writeFile(sourcePath, content);
    }

    async generateMainFile(config, projectDir) {
        const mainPath = path.join(projectDir, 'source', 'src', 'main.cpp');

        let content = `/**
 * @file main.cpp
 * @brief Main entry point for the application
 */

#include <iostream>
#include <string>
#include <vector>

`;

        // Include all headers
        for (const fileConfig of config.files) {
            if (fileConfig.name) {
                content += `#include "${fileConfig.name}.hpp"\n`;
            }
        }
        content += '\n';

        // Using namespace
        content += `using namespace ${this.toLowerSnakeCase(path.basename(projectDir))};\n\n`;

        // Main function
        content += 'int main(int argc, char** argv) {\n';
        content += '    std::cout << "Starting application..." << std::endl;\n\n';

        // Call functions based on state config if available
        if (config.states && config.states.length > 0) {
            const startState = config.states.find(s => s.name === 'START') || config.states[0];

            if (startState.transitions && startState.transitions.length > 0) {
                for (const transition of startState.transitions) {
                    content += `    // Transition to ${transition.to}\n`;
                    content += `    ${transition.function}();\n\n`;
                }
            }
        }

        content += '    std::cout << "Application completed." << std::endl;\n';
        content += '    return 0;\n';
        content += '}\n';

        await this.writeFile(mainPath, content);

        // Generate a CMakeLists.txt file
        await this.generateCMakeLists(config, projectDir);
    }

    async generateCMakeLists(config, projectDir) {
        const cmakeListsPath = path.join(projectDir, 'source', 'CMakeLists.txt');
        const projectName = path.basename(projectDir);

        let content = `# CMakeLists.txt for ${projectName}

cmake_minimum_required(VERSION 3.10)
project(${projectName} VERSION 0.1.0)

# C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Include directories
include_directories(include)

# Source files
file(GLOB SOURCES src/*.cpp)

# Main executable
add_executable(\${PROJECT_NAME} \${SOURCES})

# Compiler options
target_compile_options(\${PROJECT_NAME} PRIVATE -Wall -Wextra)

# Install target
install(TARGETS \${PROJECT_NAME} DESTINATION bin)
`;

        await this.writeFile(cmakeListsPath, content);
    }

    generateClassDeclaration(typeConfig) {
        let content = '';
        const className = this.toPascalCase(typeConfig.name);

        // Add class documentation
        content += '/**\n';
        content += ` * @brief Class representing a ${typeConfig.name}\n`;
        content += ' */\n';

        if (typeConfig.dataType.toLowerCase() === 'class') {
            const accessModifier = typeConfig.access ? typeConfig.access.toLowerCase() : 'public';
            content += `class ${className} {\n`;

            // Public members
            content += 'public:\n';

            // Constructor
            content += `    /**\n`;
            content += `     * @brief Default constructor\n`;
            content += `     */\n`;
            content += `    ${className}();\n\n`;

            // Destructor
            content += `    /**\n`;
            content += `     * @brief Destructor\n`;
            content += `     */\n`;
            content += `    ~${className}();\n\n`;

            // Public methods go here

            // Private/protected members
            if (typeConfig.fields && typeConfig.fields.length > 0) {
                content += 'private:\n';

                for (const field of typeConfig.fields) {
                    const fieldName = this.toCamelCase(field.name);
                    const cppType = this.mapToCppType(field.type);

                    // Add field with documentation
                    content += `    /**\n`;
                    content += `     * @brief ${field.name} field\n`;
                    content += `     */\n`;
                    content += `    ${cppType} ${fieldName}_;\n\n`;
                }
            }

            content += '};\n';
        } else if (typeConfig.dataType.toLowerCase() === 'struct') {
            content += `struct ${className} {\n`;

            // Fields
            if (typeConfig.fields && typeConfig.fields.length > 0) {
                for (const field of typeConfig.fields) {
                    const fieldName = this.toCamelCase(field.name);
                    const cppType = this.mapToCppType(field.type);

                    // Add field with documentation
                    content += `    /**\n`;
                    content += `     * @brief ${field.name} field\n`;
                    content += `     */\n`;
                    content += `    ${cppType} ${fieldName};\n\n`;
                }
            }

            content += '};\n';
        } else if (typeConfig.dataType.toLowerCase() === 'enum') {
            content += `enum class ${className} {\n`;

            // Enum values
            if (typeConfig.fields && typeConfig.fields.length > 0) {
                for (let i = 0; i < typeConfig.fields.length; i++) {
                    const field = typeConfig.fields[i];
                    const enumValue = this.toUpperSnakeCase(field.name);

                    content += `    ${enumValue}`;
                    if (i < typeConfig.fields.length - 1) {
                        content += ',';
                    }
                    content += '\n';
                }
            }

            content += '};\n';
        }

        return content;
    }

    generateClassImplementation(typeConfig) {
        let content = '';
        const className = this.toPascalCase(typeConfig.name);

        if (typeConfig.dataType.toLowerCase() === 'class') {
            // Constructor implementation
            content += `/**\n`;
            content += ` * @brief Default constructor for ${className}\n`;
            content += ` */\n`;
            content += `${className}::${className}() {\n`;
            content += '    // TODO: Implement\n';
            content += '}\n\n';

            // Destructor implementation
            content += `/**\n`;
            content += ` * @brief Destructor for ${className}\n`;
            content += ` */\n`;
            content += `${className}::~${className}() {\n`;
            content += '    // TODO: Implement\n';
            content += '}\n\n';

            // Other methods would go here
        }

        return content;
    }

    generateFunctionDeclaration(func) {
        let content = '';

        // Function documentation
        content += '/**\n';
        if (func.comment) {
            content += ` * @brief ${func.comment}\n`;
        } else {
            content += ` * @brief ${func.name} function\n`;
        }

        // Document parameters
        if (func.parameters && func.parameters.length > 0) {
            for (const param of func.parameters) {
                const paramName = this.toCamelCase(param.name);
                content += ` * @param ${paramName} Parameter description\n`;
            }
        }

        // Document return value
        if (func.returnType && func.returnType !== 'void') {
            content += ' * @return Return value description\n';
        }

        content += ' */\n';

        // Return type
        const returnType = this.mapToCppType(func.returnType || 'void');
        content += `${returnType} ${func.name}(`;

        // Parameters
        if (func.parameters && func.parameters.length > 0) {
            const params = func.parameters.map(param => {
                const paramName = this.toCamelCase(param.name);
                const cppType = this.mapToCppType(param.type);

                // Use const references for complex types
                if (cppType.includes('std::') || cppType === 'string') {
                    return `const ${cppType}& ${paramName}`;
                } else {
                    return `${cppType} ${paramName}`;
                }
            });

            content += params.join(', ');
        }

        content += ');\n';

        return content;
    }

    generateFunctionImplementation(func) {
        let content = '';

        // Function documentation
        content += '/**\n';
        if (func.comment) {
            content += ` * @brief ${func.comment}\n`;
        } else {
            content += ` * @brief ${func.name} function implementation\n`;
        }
        content += ' */\n';

        // Return type
        const returnType = this.mapToCppType(func.returnType || 'void');
        content += `${returnType} ${func.name}(`;

        // Parameters
        if (func.parameters && func.parameters.length > 0) {
            const params = func.parameters.map(param => {
                const paramName = this.toCamelCase(param.name);
                const cppType = this.mapToCppType(param.type);

                // Use const references for complex types
                if (cppType.includes('std::') || cppType === 'string') {
                    return `const ${cppType}& ${paramName}`;
                } else {
                    return `${cppType} ${paramName}`;
                }
            });

            content += params.join(', ');
        }

        content += ') {\n';

        // Add pseudocode as comments
        if (func.pseudocode) {
            const lines = func.pseudocode.split('\n');
            for (const line of lines) {
                content += `    // ${line}\n`;
            }
            content += '\n';
        }

        // Add implementation
        content += '    // TODO: Implement\n';

        // Default return statement
        if (returnType !== 'void') {
            if (returnType === 'int' || returnType === 'size_t' || returnType.includes('int')) {
                content += '    return 0;\n';
            } else if (returnType === 'bool') {
                content += '    return false;\n';
            } else if (returnType === 'float' || returnType === 'double') {
                content += '    return 0.0;\n';
            } else if (returnType === 'char') {
                content += "    return '\\0';\n";
            } else if (returnType === 'std::string') {
                content += '    return "";\n';
            } else if (returnType.includes('std::vector')) {
                content += `    return {};\n`;
            } else if (returnType.includes('std::unique_ptr') || returnType.includes('std::shared_ptr')) {
                content += '    return nullptr;\n';
            } else {
                content += `    ${returnType} result{};\n`;
                content += '    return result;\n';
            }
        }

        content += '}\n';

        return content;
    }

    mapToCppType(otherType) {
        // Map common types to C++ types
        const typeMap = {
            'int': 'int',
            'long': 'long',
            'float': 'float',
            'double': 'double',
            'char*': 'std::string',
            'char *': 'std::string',
            'void': 'void',
            'bool': 'bool',
            'char': 'char',
            'byte': 'uint8_t',
            'short': 'short',
            'unsigned int': 'unsigned int',
            'unsigned char': 'unsigned char',
            'unsigned long': 'unsigned long',
            'unsigned short': 'unsigned short',
            'char**': 'std::vector<std::string>',
            'String': 'std::string',
            'String[]': 'std::vector<std::string>',
            'int[]': 'std::vector<int>',
            'float[]': 'std::vector<float>',
            'boolean[]': 'std::vector<bool>',
            'object': 'std::any', // C++17
            'Object': 'std::any'  // C++17
        };

        return typeMap[otherType] || otherType;
    }

    // Helper: convert to camelCase
    toCamelCase(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/[\s-_]+/g, '');
    }

    // Helper: convert to PascalCase
    toPascalCase(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
                return word.toUpperCase();
            })
            .replace(/[\s-_]+/g, '');
    }

    // Helper: convert to snake_case
    toLowerSnakeCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toLowerCase();
    }

    // Helper: convert to UPPER_SNAKE_CASE
    toUpperSnakeCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toUpperCase();
    }
}

module.exports = CPlusPlusGenerator;