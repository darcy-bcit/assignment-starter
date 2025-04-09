const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function generateStateDiagram(config, projectDir) {
    try {
        if (!config.states || !Array.isArray(config.states) || config.states.length === 0) {
            console.log('No states found in configuration, skipping state diagram generation.');
            return;
        }
        const reportDir = path.join(projectDir, 'report');
        const dotFilePath = path.join(reportDir, 'state.gv');
        const pngFilePath = path.join(reportDir, 'state.png');

        let dotContent = 'digraph finite_state_machine {\n';
        dotContent += '  fontname="Helvetica,Arial,sans-serif"\n';
        dotContent += '  node [fontname="Helvetica,Arial,sans-serif"]\n';
        dotContent += '  edge [fontname="Helvetica,Arial,sans-serif"]\n';
        dotContent += '  rankdir=TB;\n';
        dotContent += '  size="7.5,7.5";\n';
        dotContent += '  ratio="fill";\n';
        dotContent += '  node [shape = box];\n';
        dotContent += '  node [shape = doublecircle]; START, EXIT;\n';
        dotContent += '  node [shape = box];\n';

        for (const state of config.states) {
            const description = state.description ? state.description.replace(/"/g, '\\"') : '';
            dotContent += `  "${state.name}" [label="${state.name}\\n${description}"];\n`;
        }

        for (const state of config.states) {
            if (state.transitions && state.transitions.length > 0) {
                for (const transition of state.transitions) {
                    dotContent += `  "${state.name}" -> "${transition.to}" [label="${transition.function}"];\n`;
                }
            }
        }
        dotContent += '}\n';

        await fs.writeFile(dotFilePath, dotContent, 'utf8');
        console.log(`State diagram DOT file generated at: ${dotFilePath}`);

        // attempt to generate png w/ graphviz
        try {
            await execPromise(`dot -Tpng "${dotFilePath}" -o "${pngFilePath}"`);
            console.log(`State diagram image generated at: ${pngFilePath}`);
        } catch (error) {
            console.warn('Warning: Could not generate state diagram image. Is Graphviz installed?');
            console.warn('You can install it from: https://graphviz.org/download/');
            console.warn('The DOT file has been generated, but not the image.');
        }
    } catch (error) {
        console.error(`Error generating state diagram: ${error.message}`);
    }
}

module.exports = { generateStateDiagram };