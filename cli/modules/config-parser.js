const fs = require('fs').promises;
const yaml = require('js-yaml');
const path = require('path');

async function parse(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const config = yaml.load(content);

        if (!config) {
            throw new Error(`Config file is empty or invalid: ${filePath}`);
        }

        applyDefaults(config);
        await validateConfig(config, filePath);
        return config;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`Config file not found: ${filePath}`);
        }
        if (error.message.includes('Config validation error')) {
            throw error;
        }
        throw new Error(`Error parsing config file: ${filePath}: ${error.message}`);
    }
}

function applyDefaults(config) {
    // top level defaults
    config.projectName = config.projectName || 'exampleProject';
    config.language = config.language || 'C';
    config.author = config.author || 'John Doe';
    config.studentNum = config.studentNum || 'A00000000';
    config.date = config.date || new Date().toISOString().split('T')[0];
    config.assignmentName = config.assignmentName || 'assign';
    config.courseNum = config.courseNum || 'COMP 3980';
    config.purpose = config.purpose || '';
    config.license = config.license || 'MIT';
    config.githubPath = config.githubPath || '';

    // top level arrays
    config.files = config.files || [];
    config.states = config.states || [];

    // docs
    config.report = config.report || {};
    config.report.requirements = config.report.requirements || [];
    config.report.platforms = config.report.platforms || [];
    config.report.language = config.report.language || config.language;
    config.report.findings = config.report.findings || '';

    config.userGuide = config.userGuide || {};
    config.userGuide.installing = config.userGuide.installing || {};
    config.userGuide.installing.obtaining = config.userGuide.installing.obtaining || '';
    config.userGuide.installing.building = config.userGuide.installing.building || '';
    config.userGuide.installing.running = config.userGuide.installing.running || '';
    config.userGuide.env = config.userGuide.env || [];
    config.userGuide.configuration = config.userGuide.configuration || [];

    config.testing = config.testing || {};
    config.testing.testcases = config.testing.testcases || [];

    // nested defaults
    for (const file of config.files) {
        file.name = file.name || '';
        file.types = file.types || [];
        file.functions = file.functions || [];

        for (const type of file.types) {
            type.fields = type.fields || [];
            type.access = type.access || 'public';
            type.description = type.description || '';

            for (const field of type.fields) {
                field.access = field.access || 'public';
            }
        }

        // functions
        for (const func of file.functions) {
            func.parameters = func.parameters || [];
            func.returnType = func.returnType || 'void';
            func.access = func.access || 'public';
            func.pseudocode = func.pseudocode || '';

            if (!func.description && func.comment) {
                func.description = func.comment;
            } else if (!func.description) {
                func.description = '';
            }

            if (!func.comment && func.description) {
                func.comment = func.description;
            } else if (!func.comment) {
                func.comment = '';
            }
        }
    }

    // states
    for (const state of config.states) {
        state.transitions = state.transitions || [];
        state.description = state.description || '';
    }

    // report
    for (const req of config.report.requirements) {
        req.req = req.req || '';
        req.status = req.status || 'Not Implemented';
    }

    // user guide
    for (const env of config.userGuide.env) {
        env.variable = env.variable || '';
        env.purpose = env.purpose || '';
    }
    for (const conf of config.userGuide.configuration) {
        conf.variable = conf.variable || '';
        conf.purpose = conf.purpose || '';
    }

    // test cases
    for (const test of config.testing.testcases) {
        test.name = test.name || '';
        test.expected = test.expected || 'pass';
    }
}

async function validateConfig(config, filePath) {
    const errors = [];

    if (!config.language) {
        errors.push('Missing required field: language');
    } else if (typeof config.language !== 'string') {
        errors.push(`Invalid language: ${config.language}. Must be a string.`);
    } else {
        const supportedLanguages = ['c', 'java', 'go', 'javascript', 'python', 'c++', 'cpp'];
        if (!supportedLanguages.some(lang => lang === config.language.toLowerCase())) {
            errors.push(`Unsupported language: ${config.language}. Supported languages: ${supportedLanguages.join(', ')}`);
        }
    }

    if (!config.projectName) {
        errors.push('Missing required field: projectName');
    } else if (typeof config.projectName !== 'string') {
        errors.push(`Invalid projectName: ${config.projectName}. Must be a string.`);
    }

    if (config.language && config.language.toLowerCase() === 'go' && !config.githubPath) {
        errors.push(`Warning: Missing githubPath for Go project. This is recommended for proper module path.`);
    }

    if (!Array.isArray(config.files)) {
        errors.push(`Config must include a "files" array`);
    } else {
        for (let i = 0; i < config.files.length; i++) {
            const file = config.files[i];

            if (!file.name) {
                errors.push(`File at index ${i} is missing a name`);
                continue;
            }

            if (!Array.isArray(file.types)) {
                errors.push(`Types in file "${file.name}" must be an array`);
            } else {
                for (let j = 0; j < file.types.length; j++) {
                    const type = file.types[j];

                    if (!type.name) {
                        errors.push(`Type at index ${j} in file "${file.name}" is missing a name`);
                    }

                    if (!type.dataType) {
                        errors.push(`Type "${type.name}" in file "${file.name}" is missing a dataType`);
                    } else {
                        const validDataTypes = ['class', 'struct', 'enum', 'interface', 'type', 'const'];
                        if (!validDataTypes.includes(type.dataType.toLowerCase())) {
                            errors.push(`Invalid dataType "${type.dataType}" for type "${type.name}" in file "${file.name}". Valid types: ${validDataTypes.join(', ')}`);
                        }
                    }
                    if (!Array.isArray(type.fields)) {
                        errors.push(`Fields in type "${type.name}" in file "${file.name}" must be an array`);
                    } else {
                        for (let k = 0; k < type.fields.length; k++) {
                            const field = type.fields[k];

                            if (!field.name) {
                                errors.push(`Field at index ${k} in type "${type.name}" in file "${file.name}" is missing a name`);
                            }

                            if (!field.type && type.dataType.toLowerCase() !== 'enum') {
                                errors.push(`Field "${field.name}" in type "${type.name}" in file "${file.name}" is missing a type`);
                            }

                            if (field.access && !['public', 'private', 'protected', 'internal', 'static'].includes(field.access.toLowerCase())) {
                                errors.push(`Invalid access "${field.access}" for field "${field.name}" in type "${type.name}" in file "${file.name}". Valid values are: public, private, protected, internal, static`);
                            }
                        }
                    }
                }
            }

            if (!Array.isArray(file.functions)) {
                errors.push(`Functions in file "${file.name}" must be an array`);
            } else {
                for (let j = 0; j < file.functions.length; j++) {
                    const func = file.functions[j];

                    if (!func.name) {
                        errors.push(`Function at index ${j} in file "${file.name}" is missing a name`);
                    }

                    if (func.access && !['public', 'private', 'protected', 'internal', 'static'].includes(func.access.toLowerCase())) {
                        errors.push(`Invalid access "${func.access}" for function "${func.name}" in file "${file.name}". Valid values are: public, private, protected, internal, static`);
                    }

                    if (!Array.isArray(func.parameters)) {
                        errors.push(`Parameters in function "${func.name}" in file "${file.name}" must be an array`);
                    } else {
                        for (let k = 0; k < func.parameters.length; k++) {
                            const param = func.parameters[k];

                            if (!param.name) {
                                errors.push(`Parameter at index ${k} in function "${func.name}" in file "${file.name}" is missing a name`);
                            }

                            if (!param.type) {
                                errors.push(`Parameter "${param.name}" in function "${func.name}" in file "${file.name}" is missing a type`);
                            }
                        }
                    }
                }
            }
        }
    }

    if (!Array.isArray(config.states)) {
        errors.push('Config must include a "states" array');
    } else {
        const hasStartState = config.states.some(state => state.name === 'START');
        if (!hasStartState && config.states.length > 0) {
            errors.push('No START state found in the states array. A START state is recommended.');
        }

        for (let i = 0; i < config.states.length; i++) {
            const state = config.states[i];

            if (!state.name) {
                errors.push(`State at index ${i} is missing a name`);
                continue;
            }

            if (!Array.isArray(state.transitions)) {
                errors.push(`Transitions in state "${state.name}" must be an array`);
            } else {
                for (let j = 0; j < state.transitions.length; j++) {
                    const transition = state.transitions[j];

                    if (!transition.to) {
                        errors.push(`Transition at index ${j} in state "${state.name}" is missing a "to" field`);
                    } else {
                        const targetExists = config.states.some(s => s.name === transition.to);
                        if (!targetExists) {
                            errors.push(`Transition from "${state.name}" to "${transition.to}" references a state that doesn't exist`);
                        }
                    }

                    if (!transition.function) {
                        errors.push(`Transition at index ${j} in state "${state.name}" is missing a "function" field`);
                    } else {
                        let functionExists = false;
                        for (const file of config.files) {
                            if (file.functions && file.functions.some(f => f.name === transition.function)) {
                                functionExists = true;
                                break;
                            }
                        }

                        if (!functionExists) {
                            errors.push(`Transition from "${state.name}" uses function "${transition.function}" that isn't defined in any file`);
                        }
                    }
                }
            }
        }
    }

    if (config.report) {
        if (config.report.requirements && !Array.isArray(config.report.requirements)) {
            errors.push(`Report requirements must be an array`);
        } else if (config.report.requirements) {
            for (let i = 0; i < config.report.requirements.length; i++) {
                const req = config.report.requirements[i];
                if (!req.req) {
                    errors.push(`Requirement at index ${i} is missing a "req" field`);
                }
            }
        }

        if (config.report.platforms && !Array.isArray(config.report.platforms)) {
            errors.push(`Report platforms must be an array`);
        }
    }

    if (config.userGuide) {
        if (config.userGuide.env && !Array.isArray(config.userGuide.env)) {
            errors.push(`UserGuide env must be an array`);
        } else if (config.userGuide.env) {
            for (let i = 0; i < config.userGuide.env.length; i++) {
                const env = config.userGuide.env[i];
                if (!env.variable) {
                    errors.push(`Environment variable at index ${i} is missing a "variable" field`);
                }
            }
        }

        if (config.userGuide.configuration && !Array.isArray(config.userGuide.configuration)) {
            errors.push(`UserGuide configuration must be an array`);
        } else if (config.userGuide.configuration) {
            for (let i = 0; i < config.userGuide.configuration.length; i++) {
                const conf = config.userGuide.configuration[i];
                if (!conf.variable) {
                    errors.push(`Configuration variable at index ${i} is missing a "variable" field`);
                }
            }
        }
    }

    if (config.testing) {
        if (config.testing.testcases && !Array.isArray(config.testing.testcases)) {
            errors.push(`Testing testcases must be an array`);
        } else if (config.testing.testcases) {
            for (let i = 0; i < config.testing.testcases.length; i++) {
                const test = config.testing.testcases[i];
                if (!test.name) {
                    errors.push(`Test case at index ${i} is missing a "name" field`);
                }
                if (test.expected && !['pass', 'fail'].includes(test.expected.toLowerCase())) {
                    errors.push(`Test case "${test.name}" has an invalid "expected" value: ${test.expected}. Valid values are: pass, fail`);
                }
            }
        }
    }

    try {
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) {
            errors.push(`${filePath} is not a file`);
        }
    } catch (error) {
        // Error already handled in parse function
    }

    // Format all errors
    if (errors.length > 0) {
        const errorMessage = [`Config validation error in ${path.basename(filePath)}:`]
            .concat(errors.map(err => `- ${err}`))
            .join('\n');

        throw new Error(errorMessage);
    }
}

module.exports = {
    parse
};