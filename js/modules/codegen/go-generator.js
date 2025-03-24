const path = require('path');
const BaseGenerator = require('./base-generator');

class GoGenerator extends BaseGenerator {
    async createSourceDirs(projectDir) {
        const fs = require('fs').promises;

        // Create Go-specific directories following standard Go project layout
        await fs.mkdir(path.join(projectDir, 'source', 'cmd'), { recursive: true });
        await fs.mkdir(path.join(projectDir, 'source', 'pkg'), { recursive: true });
        await fs.mkdir(path.join(projectDir, 'source', 'internal'), { recursive: true });

        // Also ensure the report directory exists
        await fs.mkdir(path.join(projectDir, 'report'), { recursive: true });
    }

    async generateFile(fileConfig, projectDir) {
        if (!fileConfig.name) {
            return;
        }

        // Convert to snake_case for file name
        const fileName = this.toSnakeCase(fileConfig.name);

        // Generate a package file
        await this.generatePackageFile(fileConfig, fileName, projectDir);
    }

    async generatePackageFile(fileConfig, fileName, projectDir) {
        // Determine if this is a command or a package
        const isCommand = fileName === 'main' || fileName.includes('cmd') || fileName.includes('command');
        const packageName = isCommand ? 'main' : this.toSnakeCase(fileConfig.name);

        // Place command files in cmd directory, others in pkg
        const dirPath = isCommand
            ? path.join(projectDir, 'source', 'cmd', fileName)
            : path.join(projectDir, 'source', 'pkg', packageName);

        const filePath = path.join(dirPath, `${fileName}.go`);

        let content = `// Package ${packageName} provides functionality for ${fileConfig.name}\n`;
        content += `package ${packageName}\n\n`;

        // Add imports
        content += 'import (\n';
        content += '\t"fmt"\n';

        // Add additional standard library imports
        if (isCommand) {
            content += '\t"os"\n';
            content += '\t"flag"\n';
        }

        content += ')\n\n';

        // Add types as structs
        if (fileConfig.types && fileConfig.types.length > 0) {
            for (const typeConfig of fileConfig.types) {
                content += this.generateType(typeConfig);
                content += '\n';
            }
        }

        // Add functions
        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                content += this.generateFunction(func);
                content += '\n';
            }
        }

        await this.writeFile(filePath, content);
    }

    async generateMainFile(config, projectDir) {
        // Create the main.go file
        const mainPath = path.join(projectDir, 'source', 'cmd', 'main', 'main.go');

        let content = `// Package main is the entry point for the ${config.projectName} application\n`;
        content += 'package main\n\n';

        // Add imports
        content += 'import (\n';
        content += '\t"fmt"\n';
        content += '\t"os"\n';

        // Add imports for other packages
        for (const fileConfig of config.files) {
            if (fileConfig.name && fileConfig.name !== 'main') {
                const pkgName = this.toSnakeCase(fileConfig.name);
                // Skip if it's a command file
                if (pkgName !== 'main' && !pkgName.includes('cmd') && !pkgName.includes('command')) {
                    content += `\t"${config.projectName}/pkg/${pkgName}"\n`;
                }
            }
        }

        content += ')\n\n';

        // Add main function
        content += 'func main() {\n';
        content += '\tfmt.Println("Starting application...")\n\n';

        // Call functions based on state config if available
        if (config.states && config.states.length > 0) {
            const startState = config.states.find(s => s.name === 'START') || config.states[0];

            if (startState.transitions && startState.transitions.length > 0) {
                for (const transition of startState.transitions) {
                    // Find the package that contains this function
                    const funcPackage = this.findPackageForFunction(config, transition.function);

                    if (funcPackage) {
                        content += `\t// Transition to ${transition.to}\n`;

                        // If it's in a package, call via package name
                        if (funcPackage !== 'main') {
                            content += `\t${funcPackage}.${this.toPascalCase(transition.function)}()\n\n`;
                        } else {
                            content += `\t${this.toPascalCase(transition.function)}()\n\n`;
                        }
                    } else {
                        content += `\t// Function ${transition.function} not found in any package\n`;
                    }
                }
            }
        }

        content += '\tfmt.Println("Application completed.")\n';
        content += '}\n';

        await this.writeFile(mainPath, content);

        // Create a go.mod file
        await this.generateGoMod(config, projectDir);
    }

    async generateGoMod(config, projectDir) {
        const goModPath = path.join(projectDir, 'source', 'go.mod');
        const moduleImportPath = config.githubPath || `github.com/example/${config.projectName}`;

        let content = `module ${moduleImportPath}\n\n`;
        content += 'go 1.24.1\n'; // Using a recent Go version

        await this.writeFile(goModPath, content);
    }

    findPackageForFunction(config, functionName) {
        for (const fileConfig of config.files) {
            if (fileConfig.functions) {
                for (const func of fileConfig.functions) {
                    if (func.name === functionName) {
                        // If it's a command/main file, return "main"
                        const pkgName = this.toSnakeCase(fileConfig.name);
                        if (pkgName === 'main' || pkgName.includes('cmd') || pkgName.includes('command')) {
                            return 'main';
                        }
                        return pkgName;
                    }
                }
            }
        }
        return null;
    }

    generateType(typeConfig) {
        let content = '';
        const typeName = this.toPascalCase(typeConfig.name); // Types in Go use PascalCase

        // Add comment
        content += `// ${typeName} represents a ${typeConfig.name}\n`;

        if (typeConfig.dataType.toLowerCase() === 'struct') {
            content += `type ${typeName} struct {\n`;

            if (typeConfig.fields && typeConfig.fields.length > 0) {
                for (const field of typeConfig.fields) {
                    const fieldName = this.toPascalCase(field.name); // Public fields use PascalCase
                    const goType = this.mapToGoType(field.type);

                    // Add json tags
                    content += `\t${fieldName} ${goType} \`json:"${field.name}"\`\n`;
                }
            }

            content += '}\n\n';

            // Generate constructor for the struct
            content += `// New${typeName} creates a new ${typeName}\n`;
            content += `func New${typeName}() *${typeName} {\n`;
            content += `\treturn &${typeName}{}\n`;
            content += '}\n';
        } else if (typeConfig.dataType.toLowerCase() === 'enum' || typeConfig.dataType.toLowerCase() === 'const') {
            // Go doesn't have enums, so use constants
            content += `// ${typeName} constants\n`;
            content += 'const (\n';

            if (typeConfig.fields && typeConfig.fields.length > 0) {
                for (let i = 0; i < typeConfig.fields.length; i++) {
                    const field = typeConfig.fields[i];
                    const constName = this.toPascalCase(field.name);

                    if (i === 0) {
                        content += `\t${constName} = iota\n`; // Start with iota
                    } else {
                        content += `\t${constName}\n`;
                    }
                }
            }

            content += ')\n';
        }

        return content;
    }

    generateFunction(func) {
        let content = '';
        const funcName = this.toPascalCase(func.name); // Public functions use PascalCase

        // Add comment
        if (func.comment) {
            content += `// ${funcName} ${func.comment}\n`;
        }

        // Function signature
        content += `func ${funcName}(`;

        // Parameters
        if (func.parameters && func.parameters.length > 0) {
            const params = func.parameters.map(param => {
                const paramName = this.toCamelCase(param.name);
                const goType = this.mapToGoType(param.type);
                return `${paramName} ${goType}`;
            });
            content += params.join(', ');
        }

        // Return type
        const returnType = this.mapToGoType(func.returnType || 'void');
        if (returnType !== 'void') {
            content += `) ${returnType} {\n`;
        } else {
            content += `) {\n`;
        }

        // Function body
        if (func.pseudocode) {
            const lines = func.pseudocode.split('\n');
            for (const line of lines) {
                content += `\t// ${line}\n`;
            }
            content += '\n';
        }

        // Default implementation
        content += '\t// TODO: Implement\n';
        if (returnType !== 'void') {
            if (returnType === 'int' || returnType === 'float64') {
                content += '\treturn 0\n';
            } else if (returnType === 'bool') {
                content += '\treturn false\n';
            } else if (returnType === 'string') {
                content += '\treturn ""\n';
            } else if (returnType.startsWith('*') || returnType.includes('interface')) {
                content += '\treturn nil\n';
            } else {
                content += `\tvar result ${returnType}\n`;
                content += '\treturn result\n';
            }
        }

        content += '}\n';

        return content;
    }

    mapToGoType(otherType) {
        // Map common types to Go types
        const typeMap = {
            'int': 'int',
            'long': 'int64',
            'float': 'float32',
            'double': 'float64',
            'char*': 'string',
            'char *': 'string',
            'void': 'void', // will be removed since Go doesn't use void
            'bool': 'bool',
            'char': 'byte',
            'byte': 'byte',
            'short': 'int16',
            'unsigned int': 'uint',
            'unsigned char': 'byte',
            'unsigned long': 'uint64',
            'unsigned short': 'uint16',
            'char**': '[]string',
            'String': 'string',
            'String[]': '[]string'
        };

        // Handle void separately since Go doesn't have void
        if (otherType === 'void' || otherType === undefined) {
            return 'void'; // This will be handled specially
        }

        return typeMap[otherType] || otherType;
    }

    // Helper: convert to snake_case (for package and file names)
    toSnakeCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toLowerCase();
    }

    // Helper: convert to PascalCase (for public types and functions)
    toPascalCase(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return word.toUpperCase();
            })
            .replace(/[\s-_]+/g, '');
    }

    // Helper: convert to camelCase (for parameters)
    toCamelCase(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/[\s-_]+/g, '');
    }
}

module.exports = GoGenerator;
