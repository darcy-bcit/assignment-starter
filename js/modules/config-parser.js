const fs = require('fs').promises;
const yaml = require('js-yaml');

async function parse(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        const config = yaml.load(content);

        // defaults
        config.projectName = config.projectName || 'project';
        config.language = config.language || 'C';

        validateConfig(config);

        return config;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`Config file not found: ${filePath}`);
        }
        throw error;
    }
}

function validateConfig(config) {
    if (!config.files || !Array.isArray(config.files)) {
        throw new Error('Config must include a "files" array');
    }

    if (!config.states || !Array.isArray(config.files)) {
        throw new Error('Config must include a "states" array');
    }
}

module.exports = {
    parse
};
