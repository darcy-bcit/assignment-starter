const fs = require('fs').promises;
const path = require('path');

class BaseGenerator {
    constructor() {
        if (this.constructor === BaseGenerator) {
            throw new Error("Abstract class cannot be instantiated");
        }
    }

    async generate(config, projectDir) {
        await this.createSourceDirs(projectDir);

        for (const fileConfig of config.files) {
            await this.generateFile(fileConfig, config, projectDir);
        }

        await this.generateMainFile(config, projectDir);
    }

    async createSourceDirs(projectDir) {
        throw new Error("Method 'createSourceDirs' must be implemented");
    }

    async generateFile(fileConfig, projectDir) {
        throw new Error("Method 'generateFile' must be implemented");
    }

    async generateMainFile(config, projectDir) {
        throw new Error("Method 'generateFile' must be implemented");
    }

    async writeFile(filePath, content) {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content);
    }
}

module.exports = BaseGenerator;
