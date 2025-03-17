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
    const RequirementsTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 6000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Task",
                                        bold: true,
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 2000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Status",
                                        bold: true,
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                ],
            }),
    
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 6000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Display the message count times",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 2000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Fully Implemented",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                ],
            }),
    
    
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 6000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "(bonus) (if there were a bonus, it would be listed here)",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 2000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Not Implemented",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                        })],
                    }),
                ],
            }),
        ],
    });
    
    // Document creation starts here
    const doc = new Document({
        title: "Report",
        styles: {
            paragraphStyles: [
                {
                    id: "Heading1",
                    name: "Heading 1",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        size: 40,
                        color: "000000",
                        font: "Arial"
                    }
                }
            ]
        },
    
        sections: [ 
            {
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "COMP 1234",
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({break: 1}),
                            new TextRun({
                                text: "Assignment 1\n",
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({break: 1}),
                            new TextRun({
                                text: "Report\n",
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            })
                        ]
                    }),
    
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                            new TextRun({
                                text: "FULL NAME",
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: "STUDENT NUMBER",
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: "DATE",
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new PageBreak()
                        ]
                    }),
    
                    new TableOfContents("ReportContents", {
                        hyperlink: true,
                        headingStyleRange: "1-5",
                        font: "Arial"
                    }),
    
                    new Paragraph({
                        text: "Purpose",
                        heading: HeadingLevel.HEADING_1,
                        pageBreakBefore: true,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "This program demonstrates how to write a program for the course.",
                                size: 24,
                                font: "Arial",
                                break: true
                            })
                        ]
                    }),
                    new Paragraph({
                        text: "Requirements",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    RequirementsTable,
    
                    new Paragraph({
                        text: "Platforms",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "dc_shell has been tested on",
                                font: "Arial",
                                size: 22
                            }),
                        ]
                    }),
    
                    new Paragraph({
                        bullet: {level: 0},
                        children: [
                            new TextRun({
                                text: "macOS 14.2",
                                font: "Arial",
                                size: 22
                            }),
                        ]
                    }),
                    new Paragraph({
                        bullet: {level: 0},
                        children: [
                            new TextRun({
                                text: "Manjaro",
                                font: "Arial",
                                size: 22
                            }),
                        ]
                    }),
                    new Paragraph({
                        bullet: {level: 0},
                        children: [
                            new TextRun({
                                text: "Ubuntu 2023.10",
                                font: "Arial",
                                size: 22
                            }),
                        ]
                    }),
                    new Paragraph({
                        bullet: {level: 0},
                        children: [
                            new TextRun({
                                text: "Fedora 39",
                                font: "Arial",
                                size: 22
                            }),
                        ]
                    }),
                    new Paragraph({
                        bullet: {level: 0},
                        children: [
                            new TextRun({
                                text: "FreeBSD 14.0",
                                font: "Arial",
                                size: 22
                            }),
                        ]
                    }),
    
                    new Paragraph({
                        text: "Language",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new Paragraph({
                        bullet: {level: 0},
                        children: [
                            new TextRun({
                                text: "ISO C17",
                                font: "Arial",
                                size: 22
                            }),
                        ]
                    }),
                    new Paragraph({
                        bullet: {level: 0},
                        children: [
                            new TextRun({
                                text: "Compiles with gcc and clang",
                                font: "Arial",
                                size: 22
                            }),
                        ]
                    }),
                    new Paragraph({
                        text: "Documents",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new Paragraph({
                        children: [
                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: "Design",
                                        font: "Arial",
                                        size: 22,
                                        style: "Hyperlink"
                                    }),
                                ],
    
                                link: "INSERT LINK"
                            }),
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: "Testing",
                                        font: "Arial",
                                        size: 22,
                                        style: "Hyperlink"
                                    }),
                                ],
    
                                link: "INSERT LINK"
                            }),
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: "User Guide",
                                        font: "Arial",
                                        size: 22,
                                        style: "Hyperlink"
                                    }),
                                ],
    
                                link: "INSERT LINK"
                            }),
                        ]
                    }),
                    new Paragraph({
                        text: "Findings",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "<whatever you need, data, graphs, etc…>",
                                font: "Arial",
                                size: 22
                            })
                        ]
                    })
                ],
            },
        ],
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