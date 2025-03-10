const CGenerator = require('./c-generator');
//const JavaGenerator = require('./java-generator');
const supported = ['C', 'Java'];

function createGenerator(language) {
    switch (language.toLowerCase()) {
        case 'c':
            return new CGenerator();
        case 'java':
            return new JavaGenerator();
        default:
            throw new Error(`Unsupported language: ${language}. Currently supporting: ${supported.toString()}`);
    }
}

module.exports = {
    createGenerator
};
