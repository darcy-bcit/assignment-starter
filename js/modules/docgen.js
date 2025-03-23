const fs = require('fs');
const docx = require('docx');
const path = require("path");
const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Table, TableOfContents, TableRow, TableCell, WidthType, ExternalHyperlink } = require("docx");

async function generateUserGuide(projectDir) {
    const docPath = path.join(projectDir, "report", "user-guide.docx");

    const Table1 = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Variable",
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
                            size: 7000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Purpose",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 7000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                ],
            }),
        ],
    });
    
    const Table2 = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Variable",
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
                            size: 7000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Purpose",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "-c",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 7000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The number of times to print the message",
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
                            size: 1000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "<message>",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 7000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The message to print",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                ],
            }),
        ],
    });
    
    const doc = new Document({
        title: "User-Guide",
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
                },
    
                {
                    id: "Heading2",
                    name: "Heading 2",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        size: 32,
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
                            new PageBreak(),
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
                                text: "Installing",
                                heading: HeadingLevel.HEADING_1,
                            }),
                            new Paragraph({
                                text: "Obtaining",
                                heading: HeadingLevel.HEADING_2,
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "git clone ",
                                        font: "Courier New",
                                        size: 22
                                    }),
                                    new ExternalHyperlink({
                                        children: [
                                            new TextRun({
                                                text: "https://github.com/",
                                                font: "Courier New",
                                                size: 22,
                                                style: "Hyperlink",
                                            }),
                                        ],
                                        
                                        link: "https://github.com/"
                                    }),
                                ]
                            }),
                            new Paragraph({
                                text: "Building",
                                heading: HeadingLevel.HEADING_2,
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "cd",
                                        font: "Courier New",
                                        size: 22
                                    }),
                                ]
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "./generate-cmakelists.sh",
                                        font: "Courier New",
                                        size: 22
                                    }),
                                ]
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "./change-compiler.sh -c <compiler>",
                                        font: "Courier New",
                                        size: 22
                                    }),
                                ]
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "./build.sh",
                                        font: "Courier New",
                                        size: 22
                                    }),
                                ]
                            }),
                            new Paragraph({
                                text: "Running",
                                heading: HeadingLevel.HEADING_2,
                            }),
                            
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "./build/main",
                                        font: "Courier New",
                                        size: 22
                                    }),
                                ]
                            }),
                            
                            new Paragraph({
                                text: "Environment Variables",
                                heading: HeadingLevel.HEADING_2,
                            }),
    
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The following environment variables alter the behaviour of main:",
                                        font: "Arial",
                                        size: 22
                                    }),
                                ]
                            }),
    
                            Table1,
                            
                            new Paragraph({
                                text: "Configuration",
                                heading: HeadingLevel.HEADING_2,
                            }),
    
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The following configuration values can be set in <file>:",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            }),
    
                            Table1,
                            
                            new Paragraph({
                                text: "Command Lines Arguments",
                                heading: HeadingLevel.HEADING_2,
                            }),
    
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The following configuration values can be set in <file>:",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            }),
    
                            Table2,
                            
                            new Paragraph({
                                text: "Examples",
                                heading: HeadingLevel.HEADING_1,
                            }),
                        ]
                    }),
                ]
            }
        ],
    })

    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(docPath, buffer);
}

async function generateTesting(config, projectDir) {
    const docPath = path.join(projectDir, "report", "testing.docx");
    const doc = new Document({
        // write doc contents here
    });

    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(docPath, buffer);
}

async function generateDesign(config, projectDir) {
    const docPath = path.join(projectDir, "report", "design.docx");
    const doc = new Document({
        // write doc contents here
    });

    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(docPath, buffer);
}

async function generateReport(projectDir) {
    const docPath = path.join(projectDir, "report", "report.docx");
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
    await generateReport(projectDir);
    // await generateTesting(config, projectDir);
    // await generateDesign(config, projectDir);
    await generateUserGuide(projectDir);
}

module.exports = {generateDocs};