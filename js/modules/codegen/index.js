const CGenerator = require('./c-generator');
const JavaGenerator = require('./java-generator');
const supported = ['C', 'Java'];
//const supported = ['C', 'Java', 'Go', 'JavaScript', 'Python', 'C++'];

function createGenerator(language) {
    switch (language.toLowerCase()) {
        case 'c':
            return new CGenerator();
        case 'java':
            return new JavaGenerator();
/*        case 'go':
            return new GoGenerator();
        case 'javascript':
            return new JavaScriptGenerator();
        case 'python':
            return new PythonGenerator();
        case 'c++':
            return new CPlusPlusGenerator(); */
        default:
            throw new Error(`Unsupported language: ${language}. Currently supporting: ${supported.toString()}`);
    }
}

module.exports = {
    createGenerator
};
