const path = require('path');
const BaseGenerator = require('./base-generator');

class CGenerator extends BaseGenerator {
    async createSourceDirs(projectDir) {
    }

    async generateFile(fileConfig, projectDir) {
        if (!fileConfig.name) {
            return;
        }

        await this.generateHeaderFile(fileConfig, projectDir);

        await this.generateImplementationFile(fileConfig, projectDir);
    }

    async generateHeaderFile(fileConfig, projectDir) {
        const headerName = `${fileConfig.name}.h`;
        const headerPath = path.join(projectDir, 'source', 'include', headerName);

        let content = `#ifndef ${fileConfig.name.toUpperCase()}_H\n`;
        content += `#define ${fileConfig.name.toUpperCase()}_H\n\n`;

        // dependencies
        if (fileConfig.dependencies && fileConfig.dependencies.length > 0) {
            for (const dep of fileConfig.dependencies) {
                content += `#include <${dep}.h>\n`;
            }
            content += '\n';
        }

        // structs
        if (fileConfig.types && fileConfig.types.length > 0) {
            for (const struct of fileConfig.types) {
                content += this.generateTypeDefinition(struct);
                content += '\n';
            }
        }

        // function sigs
        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                if (func.access === 'static') {
                    continue;
                }
                content += this.generateFunctionPrototype(func);
                content += '\n';
            }
        }

        content += `\n#endif /* ${fileConfig.name.toUpperCase()}_H */\n`;

        await this.writeFile(headerPath, content);
    }

    async generateImplementationFile(fileConfig, projectDir) {
        const sourceName = `${fileConfig.name}.c`;
        const sourcePath = path.join(projectDir, 'source', 'src', sourceName);

        let content = `#include "../include/${fileConfig.name}.h"\n`;

        // standard library
        content += '#include <stdio.h>\n';
        content += '#include <stdlib.h>\n';
        content += '#include <string.h>\n';

        // function skeletons
        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                content += this.generateFunctionImplementation(func);
                content += '\n';
            }
        }

        await this.writeFile(sourcePath, content);
    }

    async generateMainFile(config, projectDir) {
        const mainPath = path.join(projectDir, 'source', 'src', 'main.c');

        let content = '';

        // standard library
        content += '#include <stdio.h>\n';
        content += '#include <stdlib.h>\n';
        content += '#include <string.h>\n';

        // include header files
        for (const fileConfig of config.files) {
            if (fileConfig.name) {
                content += `#include "../include/${fileConfig.name}.h"\n`;
            }
        }
        content += '\n';

        // main
        content += 'int main(int argc, char *argv[])\n{\n';

        // call functions based on state config
        if (config.states && config.states.length > 0) {
            const startState = config.states.find(s => s.name === 'START') || config.states[0];

            if (startState.transitions && startState.transitions.length > 0) {
                for (const transition of startState.transitions) {
                    content += `    // Transition to ${transition.to}\n`;
                    content += `    ${transition.function}();\n`;
                }
            }
        }

        content += '    return 0;\n';
        content += '}\n';

        await this.writeFile(mainPath, content);
    }

    generateTypeDefinition(type) {
        let content = '';

        if (type.dataType.toLowerCase() === 'struct') {
            content += `typedef struct ${type.name.toLowerCase()} {\n`;
            if (type.fields && type.fields.length > 0) {
                for (const field of type.fields) {
                    content += `    ${field.type} ${field.name};\n`
                }
            }

            content += `} ${type.name};\n`;
        } else if (type.dataType.toLowerCase() === 'enum') {
            content += `typedef enum {\n`;

            if (type.fields && type.fields.length > 0) {
                for (let i = 0; i < type.fields.length; i++) {
                    const field = type.fields[i];
                    content += `    ${field.name}`;
                    if (i < type.fields.length - 1) {
                        content += ',';
                    }
                    content += '\n';
                }
            }
            content += `} ${type.name};\n`;
        }

        return content;
    }

    generateFunctionPrototype(func) {
        let content = '';

        const returnType = func.returnType || 'void';
        let access = func.access ? `${func.access} ` : ''; // static maybe
        if (access === 'public') {
            access = '';
        }

        content += `${access}${returnType} ${func.name}(`;

        if (func.parameters && func.parameters.length > 0) {
            content += func.parameters.map(param => `${param.type} ${param.name}`).join(', ');
        }

        content += ');';

        return content;
    }

    generateFunctionImplementation(func) {
        let content = '';

        const returnType = func.returnType || 'void';
        let access = func.access ? `${func.access} ` : ''; // static maybe
        if (access === 'public') {
            access = '';
        }

        // add the description comment
        if (func.comment) {
            content += `/**\n * ${func.comment}\n */\n`;
        }

        content += `${access} ${returnType} ${func.name}(`;

        if (func.parameters && func.parameters.length > 0) {
            content += func.parameters.map(param => `${param.type} ${param.name}`).join(', ');
        }

        content += ')\n{\n';

        // add psedocode as a comment
        if (func.pseudocode) {
            const lines = func.pseudocode.split('\n');
            for (const line of lines) {
                content += `    // ${line}\n`;
            }
            content += '\n';
        }

        // default return
        if (returnType.toLowerCase() !== 'void') {
            if (returnType.toLowerCase() === 'int') {
                content += '    return 0;\n';
            } else if (returnType.toLowerCase() === 'char*' || returnType === 'char *') {
                content += '    return NULL;\n';
            } else {
                content += `    ${returnType} result;\n`;
                content += '    // TODO: Implement\n';
                content += '    return result;\n';
            }
        } else {
            content += '    // TODO: Implement\n';
        }
        
        content += '}\n';

        return content;
    }
}

module.exports = CGenerator;
