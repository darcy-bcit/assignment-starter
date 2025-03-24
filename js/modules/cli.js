const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

function parseArgs() {
    return yargs(hideBin(process.argv))
        .option('i', {
            alias: 'input',
            describe: 'Path to a YAML config file',
            type: 'string'
        })
        .option('o', {
            alias: 'output',
            describe: 'Output path (default: current directory)',
            type: 'string'
        })
        .option('g', {
            alias: 'generate',
            describe: 'What to generate (code, docs, or all)',
            choices: ['code', 'docs', 'all'],
            default: 'all'
        })
        .option('h', {
            alias: 'help',
            describe: 'Print usage information',
            type: 'boolean'
        })
        .argv;
}

function printUsage() {
    console.log(`
Usage: assignment-starter [options]

Options:
  -i, --input     Path to a YAML config file
  -o, --output    Output path (default: current directory)
  -g, --generate  What to generate (code, docs, or all)
  -h, --help      Print this usage information
  `);
}

function validateArgs(args) {
    if (!args.input) {
        throw new Error('Input YAML file path is required. Use -i or --input option.');
    }
}

module.exports = {
    parseArgs,
    printUsage,
    validateArgs
};
