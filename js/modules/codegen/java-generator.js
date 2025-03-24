const path = require('path');
const BaseGenerator = require('./base-generator');

class JavaGenerator extends BaseGenerator {
    async createSourceDirs(projectDir) {
        const fs = require('fs').promises;

        await fs.mkdir(path.join(projectDir, 'source', 'src', 'main', 'java'), { recursive: true });
        await fs.mkdir(path.join(projectDir, 'source', 'src', 'test', 'java'), { recursive: true });

        // ensure the report directory exists, might not be needed
        await fs.mkdir(path.join(projectDir, 'report'), { recursive: true });
    }

    async generateFile(fileConfig, projectDir) {
        if (!fileConfig.name) {
            return;
        }

        // For Java, each class gets its own file
        await this.generateClassFile(fileConfig, projectDir);
    }

    async generateClassFile(fileConfig, projectDir) {
        const className = fileConfig.name.charAt(0).toUpperCase() + fileConfig.name.slice(1);
        const filePath = path.join(projectDir, 'source', 'src', 'main', 'java', `${className}.java`);

        let content = 'package com.example;\n\n';
        content += 'import java.util.*;\n';
        content += 'import java.io.*;\n\n';
        content += `public class ${className} {\n\n`;

        // Fields from types
        if (fileConfig.types && fileConfig.types.length > 0) {
            for (const type of fileConfig.types) {
                if (type.dataType.toLowerCase() === 'class') {
                    content += this.generateFields(type);
                    content += '\n';
                }
            }
        }

        content += `    public ${className}() {\n`;
        content += '        // Default constructor\n';
        content += '    }\n\n';

        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                content += this.generateMethod(func);
                content += '\n';
            }
        }
        content += '}\n';

        await this.writeFile(filePath, content);
    }

    async generateMainFile(config, projectDir) {
        const filePath = path.join(projectDir, 'source', 'src', 'main', 'java', 'Main.java');

        let content = 'package com.example;\n\n';
        content += 'import java.util.*;\n\n';
        content += 'public class Main {\n\n';
        content += '    public static void main(String[] args) {\n';
        content += '        System.out.println("Starting application...");\n\n';

        // Call functions based on state config -- might be janky
        if (config.states && config.states.length > 0) {
            const startState = config.states.find(s => s.name === 'START') || config.states[0];

            if (startState.transitions && startState.transitions.length > 0) {
                for (const transition of startState.transitions) {
                    const targetClass = this.findClassForFunction(config, transition.function);

                    if (targetClass) {
                        const className = targetClass.charAt(0).toUpperCase() + targetClass.slice(1);
                        content += `        // Transition to ${transition.to}\n`;
                        content += `        ${className} ${targetClass} = new ${className}();\n`;
                        content += `        ${targetClass}.${transition.function}();\n\n`;
                    } else {
                        content += `        // Function ${transition.function} not found in any class\n`;
                    }
                }
            }
        }

        content += '        System.out.println("Application completed.");\n';
        content += '    }\n';
        content += '}\n';

        await this.writeFile(filePath, content);
    }

    findClassForFunction(config, functionName) {
        for (const fileConfig of config.files) {
            if (fileConfig.functions) {
                for (const func of fileConfig.functions) {
                    if (func.name === functionName) {
                        return fileConfig.name;
                    }
                }
            }
        }
        return null;
    }

    generateFields(type) {
        let content = '';

        if (type.fields && type.fields.length > 0) {
            for (const field of type.fields) {
                const accessModifier = field.access || 'private';
                const javaType = this.mapToJavaType(field.type);
                content += `    ${accessModifier} ${javaType} ${field.name};\n`;
            }
        }
        return content;
    }

    generateMethod(func) {
        let content = '';

        // description
        if (func.comment) {
            content += `    /**\n     * ${func.comment}\n     */\n`;
        }

        const accessModifier = func.access === 'public' ? 'public' :
            func.access === 'static' ? 'private static' : 'private';

        const returnType = this.mapToJavaType(func.returnType || 'void');

        content += `    ${accessModifier} ${returnType} ${func.name}(`;

        if (func.parameters && func.parameters.length > 0) {
            content += func.parameters.map(param => `${this.mapToJavaType(param.type)} ${param.name}`).join(', ');
        }

        content += ') {\n';

        if (func.pseudocode) {
            const lines = func.pseudocode.split('\n');
            for (const line of lines) {
                content += `        // ${line}\n`;
            }
            content += '\n';
        }
        content += '        // TODO: Implement method\n';

        // Return statement if needed
        if (returnType !== 'void') {
            if (returnType === 'int' || returnType === 'double' || returnType === 'float' ||
                returnType === 'long' || returnType === 'short' || returnType === 'byte') {
                content += '        return 0;\n';
            } else if (returnType === 'boolean') {
                content += '        return false;\n';
            } else if (returnType === 'char') {
                content += "        return ' ';\n";
            } else {
                content += '        return null;\n';
            }
        }
        content += '    }\n';
        return content;
    }

    // converts from C typing if needed. Mainly if we want to use only one yaml
    mapToJavaType(cType) {
        const typeMap = {
            'int': 'int',
            'char*': 'String',
            'char *': 'String',
            'float': 'float',
            'double': 'double',
            'void': 'void',
            'bool': 'boolean',
            'char': 'char',
            'long': 'long',
            'short': 'short',
            'unsigned int': 'int',
            'unsigned char': 'byte',
            'unsigned long': 'long',
            'unsigned short': 'short',
            'char**': 'String[]'
        };

        return typeMap[cType] || cType;
    }
}

module.exports = JavaGenerator;