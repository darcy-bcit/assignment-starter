const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

async function prepareProjectDirectory(projectDir) {
    try {
        try { // check for existing dir
            const stats = await fs.stat(projectDir);

            if (stats.isDirectory()) {
                const files = await fs.readdir(projectDir); // check if empty
                
                if (files.length > 0) {
                    const shouldClear = await promptUserForClearance(projectDir);

                    if (shouldClear) {
                        await clearDirectory(projectDir);
                    } else {
                        throw new Error('Operation cancelled by user');
                    }
                }
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                // dir doesn't exist, mkdir
                await fs.mkdir(projectDir, { recursive: true });
            } else {
                throw err;
            }
        }

        await createDirectoryStructure(projectDir);

        return projectDir;
    } catch (error) {
        throw error;
    }
}

async function createDirectoryStructure(projectDir) {
    await fs.mkdir(path.join(projectDir, 'source', { recursive: true }));
    /*
    await fs.mkdir(path.join(projectDir, 'source', 'src'), { recursive: true });
    await fs.mkdir(path.join(projectDir, 'source', 'include'), { recursive: true });
    await fs.mkdir(path.join(projectDir, 'source', 'modules'), { recursive: true });
    await fs.mkdir(path.join(projectDir, 'source', 'internal'), { recursive: true });
    */
    await fs.mkdir(path.join(projectDir, 'report'), { recursive: true });
}

async function clearDirectory(dir) {
    const files = await fs.readdir(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);

        if (stats.isDirectory()) {
            await clearDirectory(filePath);
            await fs.rmdir(filePath);
        } else {
            await fs.unlink(filePath);
        }
    }
}

function promptUserForClearance(dir) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((res) => {
        rl.question(`Directory "${dir}" already exists and is not empty. Clear it? (y/N): `, (answer) => {
            rl.close();
            res(answer.toLowerCase() === 'y'); // default no
        });
    });
}

module.exports = {
    prepareProjectDirectory
};
