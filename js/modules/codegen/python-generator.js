const path = require('path');
const BaseGenerator = require('./base-generator');

class PythonGenerator extends BaseGenerator {
    async createSourceDirs(projectDir) {
        const fs = require('fs').promises;

        // Create main package directory using project name
        const packageName = this.toSnakeCase(path.basename(projectDir));
        await fs.mkdir(path.join(projectDir, 'source', packageName), { recursive: true });

        // Create tests directory
        await fs.mkdir(path.join(projectDir, 'source', 'tests'), { recursive: true });

        // Also ensure the report directory exists
        await fs.mkdir(path.join(projectDir, 'report'), { recursive: true });

        // Create __init__.py files to make the directories packages
        await this.writeFile(path.join(projectDir, 'source', packageName, '__init__.py'), '');
        await this.writeFile(path.join(projectDir, 'source', 'tests', '__init__.py'), '');
    }

    async generateFile(fileConfig, projectDir) {
        if (!fileConfig.name) {
            return;
        }

        const fileName = this.toSnakeCase(fileConfig.name) + '.py';
        const packageName = this.toSnakeCase(path.basename(projectDir));
        const filePath = path.join(projectDir, 'source', packageName, fileName);

        let content = '#!/usr/bin/env python3\n';
        content += '# -*- coding: utf-8 -*-\n\n';

        // Add docstring
        content += '"""\n';
        content += `${fileConfig.name} module for ${packageName}\n\n`;

        if (fileConfig.comment) {
            content += `${fileConfig.comment}\n`;
        }

        content += '"""\n\n';

        // Standard imports
        content += 'import os\n';
        content += 'import sys\n';
        content += 'from typing import Dict, List, Optional, Union, Any\n\n';

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

        // Add test code if this is the main module
        if (fileConfig.name.toLowerCase() === 'main') {
            content += 'if __name__ == "__main__":\n';
            content += '    # Code to run when this module is executed directly\n';
            content += '    print("Running main module...")\n';

            // Call functions based on state config if available
            if (fileConfig.functions && fileConfig.functions.length > 0) {
                const mainFunctions = fileConfig.functions.filter(f =>
                    f.name && !f.name.startsWith('_') && f.access !== 'private');

                if (mainFunctions.length > 0) {
                    for (const func of mainFunctions) {
                        content += `    ${func.name}()\n`;
                    }
                }
            }
        }

        await this.writeFile(filePath, content);

        // Create test file
        await this.generateTestFile(fileConfig, projectDir);
    }

    async generateTestFile(fileConfig, projectDir) {
        const testFileName = `test_${this.toSnakeCase(fileConfig.name)}.py`;
        const packageName = this.toSnakeCase(path.basename(projectDir));
        const testFilePath = path.join(projectDir, 'source', 'tests', testFileName);

        let content = '#!/usr/bin/env python3\n';
        content += '# -*- coding: utf-8 -*-\n\n';

        // Add docstring
        content += '"""\n';
        content += `Tests for ${fileConfig.name} module\n`;
        content += '"""\n\n';

        // Standard imports
        content += 'import unittest\n';
        content += `import sys\n`;
        content += `import os\n\n`;

        // Import the module to test
        content += `# Add the parent directory to the path to import the package\n`;
        content += `sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))\n`;
        content += `from ${packageName}.${this.toSnakeCase(fileConfig.name)} import *\n\n`;

        // Test class
        content += `class Test${this.toPascalCase(fileConfig.name)}(unittest.TestCase):\n`;
        content += '    """\n';
        content += `    Test cases for ${fileConfig.name} module\n`;
        content += '    """\n\n';

        content += '    def setUp(self):\n';
        content += '        """Set up test fixtures"""\n';
        content += '        pass\n\n';

        content += '    def tearDown(self):\n';
        content += '        """Tear down test fixtures"""\n';
        content += '        pass\n\n';

        // Add test methods for each function
        if (fileConfig.functions && fileConfig.functions.length > 0) {
            for (const func of fileConfig.functions) {
                if (func.access !== 'private' && !func.name.startsWith('_')) {
                    content += `    def test_${func.name}(self):\n`;
                    content += `        """Test ${func.name} function"""\n`;
                    content += '        # TODO: Implement test\n';
                    content += '        self.assertTrue(True)\n\n';
                }
            }
        }

        // Add main test runner
        content += 'if __name__ == "__main__":\n';
        content += '    unittest.main()\n';

        await this.writeFile(testFilePath, content);
    }

    async generateMainFile(config, projectDir) {
        const packageName = this.toSnakeCase(path.basename(projectDir));
        const mainPath = path.join(projectDir, 'source', '__main__.py');

        let content = '#!/usr/bin/env python3\n';
        content += '# -*- coding: utf-8 -*-\n\n';

        // Add docstring
        content += '"""\n';
        content += `Main entry point for ${packageName}\n\n`;
        content += `This module provides the main entry point for the ${packageName} package.\n`;
        content += 'It can be run with "python -m source"\n';
        content += '"""\n\n';

        // Standard imports
        content += 'import sys\n';
        content += 'import argparse\n\n';

        // Import all modules
        for (const fileConfig of config.files) {
            if (fileConfig.name && fileConfig.name !== 'main') {
                const moduleName = this.toSnakeCase(fileConfig.name);
                content += `from ${packageName}.${moduleName} import *\n`;
            }
        }
        content += '\n';

        // Main function
        content += 'def main():\n';
        content += '    """Main entry point for the application"""\n';
        content += '    parser = argparse.ArgumentParser(description="CLI for the application")\n';
        content += '    parser.add_argument("-v", "--verbose", action="store_true", help="Increase output verbosity")\n';
        content += '    args = parser.parse_args()\n\n';
        content += '    print("Starting application...")\n\n';

        // Call functions based on state config if available
        if (config.states && config.states.length > 0) {
            const startState = config.states.find(s => s.name === 'START') || config.states[0];

            if (startState.transitions && startState.transitions.length > 0) {
                for (const transition of startState.transitions) {
                    content += `    # Transition to ${transition.to}\n`;
                    content += `    ${transition.function}()\n\n`;
                }
            }
        }

        content += '    print("Application completed.")\n\n';

        // Call main when executed directly
        content += 'if __name__ == "__main__":\n';
        content += '    main()\n';

        await this.writeFile(mainPath, content);

        // Create a setup.py file for packaging
        await this.generateSetupPy(config, projectDir);
    }

    async generateSetupPy(config, projectDir) {
        const setupPath = path.join(projectDir, 'source', 'setup.py');
        const packageName = this.toSnakeCase(path.basename(projectDir));

        let content = '#!/usr/bin/env python3\n';
        content += '# -*- coding: utf-8 -*-\n\n';

        content += 'from setuptools import setup, find_packages\n\n';

        content += 'setup(\n';
        content += `    name="${packageName}",\n`;
        content += '    version="0.1.0",\n';
        content += '    description="Generated project",\n';

        if (config.author) {
            content += `    author="${config.author}",\n`;
        }

        content += `    packages=find_packages(),\n`;
        content += '    python_requires=">=3.7",\n';
        content += '    entry_points={\n';
        content += `        'console_scripts': [\n`;
        content += `            '${packageName}=source.__main__:main',\n`;
        content += '        ],\n';
        content += '    },\n';
        content += ')\n';

        await this.writeFile(setupPath, content);
    }

    generateClass(typeConfig) {
        let content = '';
        const className = this.toPascalCase(typeConfig.name);

        content += `class ${className}:\n`;
        content += '    """\n';
        content += `    ${className} class\n`;
        content += '    """\n\n';

        // Add constructor
        content += '    def __init__(self';

        // Constructor parameters
        const initializers = [];
        if (typeConfig.fields && typeConfig.fields.length > 0) {
            for (const field of typeConfig.fields) {
                const fieldName = this.toSnakeCase(field.name);
                const pythonType = this.mapToPythonType(field.type);

                // Add parameter with default value
                content += `, ${fieldName}: ${pythonType} = None`;

                // Store initializer for later
                initializers.push(`        self.${fieldName} = ${fieldName}`);
            }
        }

        content += '):\n';
        content += '        """\n';
        content += '        Initialize a new instance\n';
        content += '        """\n';

        // Add initializers
        if (initializers.length > 0) {
            for (const init of initializers) {
                content += `${init}\n`;
            }
        } else {
            content += '        pass\n';
        }

        // Add string representation
        content += '\n    def __str__(self) -> str:\n';
        content += '        """\n';
        content += '        Return a string representation\n';
        content += '        """\n';

        if (typeConfig.fields && typeConfig.fields.length > 0) {
            content += '        return f"';

            // Add each field
            const fieldStrings = [];
            for (const field of typeConfig.fields) {
                const fieldName = this.toSnakeCase(field.name);
                fieldStrings.push(`${fieldName}={self.${fieldName}}`);
            }

            content += `${className}(${fieldStrings.join(', ')})"\n`;
        } else {
            content += `        return "${className}()"\n`;
        }

        return content;
    }

    generateFunction(func) {
        let content = '';
        const funcName = this.toSnakeCase(func.name);

        // Add function definition
        content += `def ${funcName}(`;

        // Parameters
        if (func.parameters && func.parameters.length > 0) {
            const params = func.parameters.map(param => {
                const paramName = this.toSnakeCase(param.name);
                const pythonType = this.mapToPythonType(param.type);
                return `${paramName}: ${pythonType}`;
            });
            content += params.join(', ');
        }

        // Return type
        const returnType = this.mapToPythonType(func.returnType || 'None');
        content += `) -> ${returnType}:\n`;

        // Docstring
        content += '    """\n';
        if (func.comment) {
            content += `    ${func.comment}\n\n`;
        } else {
            content += `    ${funcName} function\n\n`;
        }

        // Parameter descriptions
        if (func.parameters && func.parameters.length > 0) {
            content += '    Args:\n';
            for (const param of func.parameters) {
                const paramName = this.toSnakeCase(param.name);
                content += `        ${paramName}: Parameter description\n`;
            }
            content += '\n';
        }

        // Return description
        if (returnType !== 'None') {
            content += '    Returns:\n';
            content += `        ${returnType}: Return value description\n`;
        }

        content += '    """\n';

        // Add pseudocode as comments
        if (func.pseudocode) {
            const lines = func.pseudocode.split('\n');
            for (const line of lines) {
                content += `    # ${line}\n`;
            }
            content += '\n';
        }

        // Add implementation
        content += '    # TODO: Implement\n';

        // Return statement
        if (returnType !== 'None') {
            if (returnType === 'int' || returnType === 'float') {
                content += '    return 0\n';
            } else if (returnType === 'bool') {
                content += '    return False\n';
            } else if (returnType === 'str') {
                content += '    return ""\n';
            } else if (returnType === 'List' || returnType.startsWith('List[')) {
                content += '    return []\n';
            } else if (returnType === 'Dict' || returnType.startsWith('Dict[')) {
                content += '    return {}\n';
            } else if (returnType === 'Any' || returnType === 'Optional' || returnType.startsWith('Optional[')) {
                content += '    return None\n';
            } else {
                content += '    return None\n';
            }
        }

        return content;
    }

    mapToPythonType(otherType) {
        // Map common types to Python types with typing hints
        const typeMap = {
            'int': 'int',
            'long': 'int',
            'float': 'float',
            'double': 'float',
            'char*': 'str',
            'char *': 'str',
            'void': 'None',
            'bool': 'bool',
            'char': 'str',
            'byte': 'bytes',
            'short': 'int',
            'unsigned int': 'int',
            'unsigned char': 'int',
            'unsigned long': 'int',
            'unsigned short': 'int',
            'char**': 'List[str]',
            'String': 'str',
            'String[]': 'List[str]',
            'int[]': 'List[int]',
            'float[]': 'List[float]',
            'boolean[]': 'List[bool]',
            'object': 'Any',
            'Object': 'Any'
        };

        return typeMap[otherType] || 'Any';
    }

    // Helper: convert to snake_case (for Python identifiers)
    toSnakeCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toLowerCase();
    }

    // Helper: convert to PascalCase (for class names)
    toPascalCase(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return word.toUpperCase();
            })
            .replace(/[\s-_]+/g, '');
    }
}

module.exports = PythonGenerator;