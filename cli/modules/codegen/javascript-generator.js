const path = require('path');
const BaseGenerator = require('./base-generator');

class JavaScriptGenerator extends BaseGenerator {
    async createSourceDirs(projectDir) {
        const fs = require('fs').promises;

        // Create JavaScript-specific directories
        await fs.mkdir(path.join(projectDir, 'source', 'modules'), { recursive: true });
        await fs.mkdir(path.join(projectDir, 'source', 'tests'), { recursive: true });

        // Also ensure the report directory exists
        await fs.mkdir(path.join(projectDir, 'report'), { recursive: true });
    }

    async generateFile(fileConfig, projectDir) {
        if (!fileConfig.name) {
            return;
        }

        const fileName = this.toCamelCase(fileConfig.name) + '.js';
        const filePath = path.join(projectDir, 'source', 'modules', fileName);

        let content = `/**
 * @fileoverview ${fileConfig.name} module
 */

'use strict';\n\n`;

        // Add imports (ES modules)
        content += '// Standard imports\n';
        content += "const fs = require('fs');\n";
        content += "const path = require('path');\n\n";

        // Add classes (types)
        if (fileConfig.types && fileConfig.types.length > 0) {
            for (const typeConfig of fileConfig.types) {
                content += this.generateClass(typeConfig);
                content += '\n\n';
            }
        }

        // Add functions
        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                content += this.generateFunction(func);
                content += '\n\n';
            }
        }

        // Exports at the bottom
        content += '// Exports\n';
        content += 'module.exports = {\n';

        const exports = [];

        // Export classes
        if (fileConfig.types && fileConfig.types.length > 0) {
            for (const typeConfig of fileConfig.types) {
                const className = this.toPascalCase(typeConfig.name);
                exports.push(`    ${className}`);
            }
        }

        // Export functions
        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                const funcName = this.toCamelCase(func.name);
                exports.push(`    ${funcName}`);
            }
        }

        content += exports.join(',\n');
        content += '\n};\n';

        await this.writeFile(filePath, content);

        // Generate a test file for this module
        await this.generateTestFile(fileConfig, projectDir);
    }

    async generateTestFile(fileConfig, projectDir) {
        const fileName = this.toCamelCase(fileConfig.name) + '.test.js';
        const filePath = path.join(projectDir, 'source', 'tests', fileName);

        let content = `/**
 * @fileoverview Tests for ${fileConfig.name} module
 */

'use strict';\n\n`;

        // Add imports
        content += "const assert = require('assert');\n";
        const modulePath = `../src/${this.toCamelCase(fileConfig.name)}`;
        content += `const ${this.toCamelCase(fileConfig.name)} = require('${modulePath}');\n\n`;

        content += "describe('${fileConfig.name}', () => {\n";

        // Test classes
        if (fileConfig.types && fileConfig.types.length > 0) {
            for (const typeConfig of fileConfig.types) {
                const className = this.toPascalCase(typeConfig.name);

                content += `    describe('${className}', () => {\n`;
                content += "        it('should be instantiable', () => {\n";
                content += `            const instance = new ${this.toCamelCase(fileConfig.name)}.${className}();\n`;
                content += "            assert(instance);\n";
                content += "        });\n\n";

                // Test each method?

                content += "    });\n\n";
            }
        }

        // Test functions
        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                const funcName = this.toCamelCase(func.name);

                content += `    describe('${funcName}()', () => {\n`;
                content += "        it('should be callable', () => {\n";

                // Build parameters
                const params = [];
                if (func.parameters && func.parameters.length > 0) {
                    for (const param of func.parameters) {
                        if (param.type === 'int' || param.type === 'float' || param.type === 'double') {
                            params.push('0');
                        } else if (param.type === 'bool' || param.type === 'boolean') {
                            params.push('false');
                        } else if (param.type === 'string' || param.type === 'char*') {
                            params.push("''");
                        } else {
                            params.push('null');
                        }
                    }
                }

                content += `            const result = ${this.toCamelCase(fileConfig.name)}.${funcName}(${params.join(', ')});\n`;
                content += "            // TODO: Add proper assertions\n";
                content += "        });\n";
                content += "    });\n\n";
            }
        }

        content += "});\n";

        await this.writeFile(filePath, content);
    }

    async generateMainFile(config, projectDir) {
        const mainPath = path.join(projectDir, 'source', 'index.js');

        let content = `/**
 * @fileoverview Main entry point for the application
 */

'use strict';\n\n`;

        // Add imports
        for (const fileConfig of config.files) {
            if (fileConfig.name) {
                const moduleName = this.toCamelCase(fileConfig.name);
                content += `const ${moduleName} = require('./modules/${moduleName}');\n`;
            }
        }
        content += '\n';

        // Main function
        content += '/**\n * Main entry point for the application\n */\n';
        content += 'function main() {\n';
        content += '    console.log("Starting application...");\n\n';

        // Call functions based on state config if available
        if (config.states && config.states.length > 0) {
            const startState = config.states.find(s => s.name === 'START') || config.states[0];

            if (startState.transitions && startState.transitions.length > 0) {
                for (const transition of startState.transitions) {
                    // Find which module has this function
                    const module = this.findModuleForFunction(config, transition.function);

                    content += `    // Transition to ${transition.to}\n`;
                    if (module) {
                        content += `    ${module}.${this.toCamelCase(transition.function)}();\n\n`;
                    } else {
                        content += `    // Function ${transition.function} not found in any module\n\n`;
                    }
                }
            }
        }

        content += '    console.log("Application completed.");\n';
        content += '}\n\n';

        content += '// Run the application if this file is executed directly\n';
        content += 'if (require.main === module) {\n';
        content += '    main();\n';
        content += '}\n\n';

        content += '// Export the main function for programmatic use\n';
        content += 'module.exports = { main };\n';

        await this.writeFile(mainPath, content);

        // Generate package.json
        await this.generatePackageJson(config, projectDir);
    }

    async generatePackageJson(config, projectDir) {
        const packageJsonPath = path.join(projectDir, 'source', 'package.json');
        const packageName = this.toKebabCase(path.basename(projectDir));

        const packageJson = {
            name: packageName,
            version: '0.1.0',
            description: 'Generated project',
            main: 'src/index.js',
            scripts: {
                test: 'mocha tests/*.test.js',
                start: 'node src/index.js'
            },
            keywords: [],
            author: config.author || '',
            license: config.license || 'ISC',
            dependencies: {},
            devDependencies: {
                mocha: '^10.0.0'
            }
        };

        await this.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    findModuleForFunction(config, functionName) {
        for (const fileConfig of config.files) {
            if (fileConfig.functions) {
                for (const func of fileConfig.functions) {
                    if (func.name === functionName) {
                        return this.toCamelCase(fileConfig.name);
                    }
                }
            }
        }
        return null;
    }

    generateClass(typeConfig) {
        let content = '';
        const className = this.toPascalCase(typeConfig.name);

        // Add class documentation
        content += '/**\n';
        content += ` * Class representing a ${typeConfig.name}\n`;
        content += ' */\n';
        content += `class ${className} {\n`;

        // Add constructor
        content += '    /**\n';
        content += '     * Create a new instance\n';

        // Document parameters
        if (typeConfig.fields && typeConfig.fields.length > 0) {
            content += '     *\n';
            for (const field of typeConfig.fields) {
                const fieldName = this.toCamelCase(field.name);
                const jsType = this.mapToJSType(field.type);
                content += `     * @param {${jsType}} [${fieldName}] - The ${fieldName} value\n`;
            }
        }

        content += '     */\n';
        content += '    constructor(';

        // Constructor parameters
        if (typeConfig.fields && typeConfig.fields.length > 0) {
            const params = typeConfig.fields.map(field => this.toCamelCase(field.name));
            content += params.join(', ');
        }

        content += ') {\n';

        // Initialize fields
        if (typeConfig.fields && typeConfig.fields.length > 0) {
            for (const field of typeConfig.fields) {
                const fieldName = this.toCamelCase(field.name);
                content += `        this.${fieldName} = ${fieldName};\n`;
            }
        }

        content += '    }\n';

        content += '}\n';

        return content;
    }

    generateFunction(func) {
        let content = '';
        const funcName = this.toCamelCase(func.name);

        // Add function documentation
        content += '/**\n';
        if (func.description) {
            content += ` * ${func.description}\n`;
        } else {
            content += ` * ${funcName} function\n`;
        }

        // Document parameters
        if (func.parameters && func.parameters.length > 0) {
            content += ' *\n';
            for (const param of func.parameters) {
                const paramName = this.toCamelCase(param.name);
                const jsType = this.mapToJSType(param.type);
                content += ` * @param {${jsType}} ${paramName} - The ${paramName} parameter\n`;
            }
        }

        // Document return value
        if (func.returnType && func.returnType !== 'void') {
            const jsType = this.mapToJSType(func.returnType);
            content += ' *\n';
            content += ` * @returns {${jsType}} The result\n`;
        }

        content += ' */\n';

        // Function declaration
        content += `function ${funcName}(`;

        // Parameters
        if (func.parameters && func.parameters.length > 0) {
            const params = func.parameters.map(param => this.toCamelCase(param.name));
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

        // Return statement
        if (func.returnType && func.returnType !== 'void') {
            const jsType = this.mapToJSType(func.returnType);

            if (jsType === 'number') {
                content += '    return 0;\n';
            } else if (jsType === 'boolean') {
                content += '    return false;\n';
            } else if (jsType === 'string') {
                content += "    return '';\n";
            } else if (jsType === 'Array') {
                content += '    return [];\n';
            } else if (jsType === 'Object') {
                content += '    return {};\n';
            } else {
                content += '    return null;\n';
            }
        }

        content += '}\n';

        return content;
    }

    mapToJSType(otherType) {
        // Map common types to JavaScript types
        const typeMap = {
            'int': 'number',
            'long': 'number',
            'float': 'number',
            'double': 'number',
            'char*': 'string',
            'char *': 'string',
            'void': 'void',
            'bool': 'boolean',
            'boolean': 'boolean',
            'char': 'string',
            'byte': 'number',
            'short': 'number',
            'unsigned int': 'number',
            'unsigned char': 'number',
            'unsigned long': 'number',
            'unsigned short': 'number',
            'char**': 'Array<string>',
            'String': 'string',
            'String[]': 'Array<string>',
            'int[]': 'Array<number>',
            'float[]': 'Array<number>',
            'boolean[]': 'Array<boolean>',
            'object': 'Object',
            'Object': 'Object'
        };

        return typeMap[otherType] || 'any';
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

    // Helper: convert to kebab-case
    toKebabCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }
}

module.exports = JavaScriptGenerator;
