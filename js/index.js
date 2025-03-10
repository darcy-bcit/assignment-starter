#!/usr/bin/env node

const cli = require('./modules/cli');
const configParser = require('./modules/config-parser');
const dirUtils = require('./modules/directory-utils');
const codegen = require('./modules/codegen');
//const docgen = require('./modules/docgen')

async function main() {
    try {
        const args = cli.parseArgs();

        if (args.help) {
            cli.printUsage();
            process.exit(0);
        }

        cli.validateArgs(args);

        // parse yaml
        const config = await configParser.parse(args.input);

        // prepare dirs
        const outputDir = args.output || process.cwd();
        const projectDir = `${outputDir}/${config.projectName}`;

        await dirUtils.prepareProjectDirectory(projectDir);

        // gen code
        if (args.generate === 'code' || args.generate === 'all') {
            const codeGenerator = codegen.createGenerator(config.language);
            await codeGenerator.generate(config, projectDir);
            console.log(`Code generation completed for language: ${config.language}`);
        }

        // gen docs
        if (args.generate === 'docs' || args.generate === 'all') {
            // TODO evin-gg: docx stuff here
            console.log(`Documentation generation completed`);
        }

        console.log(`Project generated successfully at: ${projectDir}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

main();
