const fs = require('fs');
const docx = require('docx');
const path = require("path");

async function generateUserGuide(projectDir) {
    const docPath = path.join(projectDir, report, "user-guide.docx");
    const doc = new Document({
        // write doc contents here
    });

    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(docPath, buffer);
}

async function generateTesting(config, projectDir) {
    const docPath = path.join(projectDir, report, "testing.docx");
    const doc = new Document({
        // write doc contents here
    });

    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(docPath, buffer);
}

async function generateDesign(config, projectDir) {
    const docPath = path.join(projectDir, report, "design.docx");
    const doc = new Document({
        // write doc contents here
    });

    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(docPath, buffer);
}

async function generateReport(projectDir) {
    const docPath = path.join(projectDir, report, "report.docx");
    const doc = new Document({
        // write doc contents here
    });

    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(docPath, buffer);
}

async function generateDocs(config, projectDir) {
    await generateReport();
    await generateTesting();
    await generateDesign();
    await generateUserGuide();
}

module.exports = generateDocs;