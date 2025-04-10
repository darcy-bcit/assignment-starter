const fs = require('fs');
const docx = require('docx');
const path = require("path");
const { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Table, TableOfContents, TableRow, TableCell, WidthType, ExternalHyperlink, ImageRun } = require("docx");

async function generateUserGuide(config, projectDir) {
    const docPath = path.join(projectDir, "report", "user-guide.docx");

    const envTable = new Table({
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
                                        text: "variable",
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
                                        text: config.userGuide.env.variable,
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
                                        text: config.userGuide.env.purpose,
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

    const configTable = new Table({
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
                                        text: "variable",
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
                                        text: config.userGuide.configuration.variable,
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
                                        text: config.userGuide.configuration.purpose,
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

    const cliTable = new Table({
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

    const userguide = new Document({
        title: "User-Guide",
        styles: {
            paragraphStyles: [

                {
                    id: "Normal",
                    name: "Normal",
                    basedOn: "Normal",
                    quickFormat: true,
                    paragraph: {
                        spacing: {
                            // line: 
                            before: 100, 
                            after: 100
                        },
                    },
                },

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
                    },

                    paragraph: {
                        spacing: {
                            // line: 
                            before: 300, 
                            // after: 
                        },
                    },
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
                    },
                    paragraph: {
                        spacing: {
                            // line: 276,  // 1.5 line spacing (240 per single line)
                            before: 300, // Space before paragraph
                            // after: 200,  // Space after paragraph
                        },
                    },
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
                                text: config.courseNum,
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({break: 1}),
                            new TextRun({
                                text: config.assignmentName,
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({break: 1}),
                            new TextRun({
                                text: "User-Guide",
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
                                text: config.author,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: config.studentNum,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: config.date,
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
                                        text: config.purpose,
                                        size: 24,
                                        font: "Arial",
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
                            // new Paragraph({
                            //     children: [
                            //         new TextRun({
                            //             text: "git clone ",
                            //             font: "Courier New",
                            //             size: 22
                            //         }),
                            //         new ExternalHyperlink({
                            //             children: [
                            //                 new TextRun({
                            //                     text: "link",
                            //                     font: "Courier New",
                            //                     size: 22,
                            //                     style: "Hyperlink",
                            //                 }),
                            //             ],
                                        
                            //             link: "https://github.com/"
                            //         }),
                            //     ]
                            // }),

                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: config.userGuide.installing.obtaining,
                                        font: "Courier New",
                                        size: 22
                                    }),
                                ]
                            }),

                            new Paragraph({
                                text: "Building",
                                heading: HeadingLevel.HEADING_2,
                            }),
                            // new Paragraph({
                            //     children: [
                            //         new TextRun({
                            //             text: "cd",
                            //             font: "Courier New",
                            //             size: 22
                            //         }),
                            //     ]
                            // }),
                            // new Paragraph({
                            //     children: [
                            //         new TextRun({
                            //             text: "./generate-cmakelists.sh",
                            //             font: "Courier New",
                            //             size: 22
                            //         }),
                            //     ]
                            // }),
                            // new Paragraph({
                            //     children: [
                            //         new TextRun({
                            //             text: "./change-compiler.sh -c <compiler>",
                            //             font: "Courier New",
                            //             size: 22
                            //         }),
                            //     ]
                            // }),
                            // new Paragraph({
                            //     children: [
                            //         new TextRun({
                            //             text: "./build.sh",
                            //             font: "Courier New",
                            //             size: 22
                            //         }),
                            //     ]
                            // }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: config.userGuide.installing.building,
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
                                        text: config.userGuide.installing.running,
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
    
                            envTable,
                            
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
    
                            configTable,
                            
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
    
                            cliTable,
                            
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

    const buffer = await docx.Packer.toBuffer(userguide);
    fs.writeFileSync(docPath, buffer);
}

async function generateTesting(config, projectDir) {
    const docPath = path.join(projectDir, "report", "testing.docx");

    const headerRow = new TableRow({
        children: [
            new TableCell({
                width: { size: 5000, type: WidthType.DXA },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "Test",
                                bold: true,
                                font: "Arial",
                                size: 22
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                width: { size: 1500, type: WidthType.DXA },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "Expected",
                                bold: true,
                                font: "Arial",
                                size: 22
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                width: { size: 1500, type: WidthType.DXA },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "Actual",
                                bold: true,
                                font: "Arial",
                                size: 22
                            })
                        ]
                    })
                ]
            }),
            new TableCell({
                width: { size: 2000, type: WidthType.DXA },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "Screenshot",
                                bold: true,
                                font: "Arial",
                                size: 22
                            })
                        ]
                    })
                ]
            }),
        ]
    });

    const testRows = [headerRow];
    if (config.testing && Array.isArray(config.testing.testcases)) {
        config.testing.testcases.forEach(test => {
            testRows.push(new TableRow({
                children: [
                    new TableCell({
                        width: { size: 5000, type: WidthType.DXA },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: test.name,
                                        bold: true,
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: { size: 1500, type: WidthType.DXA },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: test.expected,
                                        bold: true,
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: { size: 1500, type: WidthType.DXA },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: test.actual || "N/A",
                                        bold: true,
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: { size: 2000, type: WidthType.DXA },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: test.screenshot || "N/A",
                                        bold: true,
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ]
                    }),
                ]
            }));
        });
    }

    // Create the testing table.
    const testTable = new Table({
        rows: testRows,
    });

    // Build the testing document.
    const testingDoc = new Document({
        title: "Testing",
        styles: {
            paragraphStyles: [
                {
                    id: "Normal",
                    name: "Normal",
                    basedOn: "Normal",
                    quickFormat: true,
                    paragraph: {
                        spacing: {
                            before: 100,
                            after: 100
                        }
                    },
                    run: {
                        font: "Arial",
                        size: 22
                    }
                },
                {
                    id: "Heading1",
                    name: "Heading 1",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    paragraph: {
                        spacing: {
                            before: 300
                        }
                    },
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
                    // Title section.
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: config.courseNum,
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({ break: 1 }),
                            new TextRun({
                                text: config.assignmentName,
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({ break: 1 }),
                            new TextRun({
                                text: "Testing",
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            })
                        ]
                    }),
                    // Author info
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                            new TextRun({
                                text: config.author,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: config.studentNum,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: config.date,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new PageBreak()
                        ]
                    }),
                    // Table of Contents.
                    new TableOfContents("TestingContents", {
                        hyperlink: true,
                        headingStyleRange: "1-5",
                        font: "Arial"
                    }),
                    new Paragraph({
                        children: [ new PageBreak() ]
                    }),
                    testTable,
                    new Paragraph({
                        text: "Tests",
                        heading: HeadingLevel.HEADING_1,
                    }),
                ]
            }
        ]
    });

    const buffer = await docx.Packer.toBuffer(testingDoc);
    fs.writeFileSync(docPath, buffer);
}

async function generateDesign(config, projectDir) {
    const docPath = path.join(projectDir, "report", "design.docx");

    const funHeader = new TableRow({
        children: [
            new TableCell({
                width: { size: 3000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Function", bold: true, font: "Arial", size: 22 })] })]
            }),
            new TableCell({
                width: { size: 6000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Description", bold: true, font: "Arial", size: 22 })] })]
            }),
        ]
    });
    const funRows = [funHeader];
    if (config.files && Array.isArray(config.files)) {
        config.files.forEach(file => {
            if (file.functions && Array.isArray(file.functions)) {
                file.functions.forEach(func => {
                    funRows.push(new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                children: [new Paragraph({ children: [new TextRun({ text: func.name, font: "Arial", size: 22 })] })]
                            }),
                            new TableCell({
                                width: { size: 6000, type: WidthType.DXA },
                                children: [new Paragraph({ children: [new TextRun({ text: func.description || "", font: "Arial", size: 22 })] })]
                            }),
                        ]
                    }));
                });
            }
        });
    }
    const FunTable = new Table({ rows: funRows });

    const stateHeader = new TableRow({
        children: [
            new TableCell({
                width: { size: 3000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "State", bold: true, font: "Arial", size: 22 })] })]
            }),
            new TableCell({
                width: { size: 6000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Description", bold: true, font: "Arial", size: 22 })] })]
            }),
        ]
    });
    const stateRows = [stateHeader];
    if (config.states && Array.isArray(config.states)) {
        config.states.forEach(state => {
            stateRows.push(new TableRow({
                children: [
                    new TableCell({
                        width: { size: 3000, type: WidthType.DXA },
                        children: [new Paragraph({ children: [new TextRun({ text: state.name, font: "Arial", size: 22 })] })]
                    }),
                    new TableCell({
                        width: { size: 6000, type: WidthType.DXA },
                        children: [new Paragraph({ children: [new TextRun({ text: state.description || "", font: "Arial", size: 22 })] })]
                    }),
                ]
            }));
        });
    }
    const StateTable = new Table({ rows: stateRows });

    const stateTabHeader = new TableRow({
        children: [
            new TableCell({
                width: { size: 3000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "From State", bold: true, font: "Arial", size: 22 })] })]
            }),
            new TableCell({
                width: { size: 3000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "To State", bold: true, font: "Arial", size: 22 })] })]
            }),
            new TableCell({
                width: { size: 3000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Function", bold: true, font: "Arial", size: 22 })] })]
            }),
        ]
    });
    const stateTabRows = [stateTabHeader];
    if (config.states && Array.isArray(config.states)) {
        config.states.forEach(state => {
            if (state.transitions && Array.isArray(state.transitions)) {
                state.transitions.forEach(transition => {
                    stateTabRows.push(new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                children: [new Paragraph({ children: [new TextRun({ text: state.name, font: "Arial", size: 22 })] })]
                            }),
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                children: [new Paragraph({ children: [new TextRun({ text: transition.to, font: "Arial", size: 22 })] })]
                            }),
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                children: [new Paragraph({ children: [new TextRun({ text: transition.function, font: "Arial", size: 22 })] })]
                            }),
                        ]
                    }));
                });
            }
        });
    }
    const StateTabTable = new Table({ rows: stateTabRows });

    let datatypeSections = [];

    if (config.files && Array.isArray(config.files)) {
        config.files.forEach(file => {
            if (file.types && Array.isArray(file.types)) {
                file.types.forEach(type => {
                    // Type name as Heading 2
                    datatypeSections.push(new Paragraph({
                        text: type.name,
                        heading: HeadingLevel.HEADING_2
                    }));

                    // Type description
                    datatypeSections.push(new Paragraph({
                        children: [
                            new TextRun({
                                text: type.description || "(No description provided)",
                                size: 24,
                                font: "Arial",
                                break: true
                            })
                        ]
                    }));

                    // Table header
                    let fieldRows = [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 2000, type: WidthType.DXA },
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: "Field",
                                                    bold: true,
                                                    font: "Arial",
                                                    size: 22
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: { size: 2000, type: WidthType.DXA },
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: "Type",
                                                    bold: true,
                                                    font: "Arial",
                                                    size: 22
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: { size: 5000, type: WidthType.DXA },
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: "Description",
                                                    bold: true,
                                                    font: "Arial",
                                                    size: 22
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ];

                    // Field rows
                    if (type.fields && Array.isArray(type.fields)) {
                        type.fields.forEach(field => {
                            fieldRows.push(new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: field.name,
                                                        font: "Arial",
                                                        size: 22
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: field.type,
                                                        font: "Arial",
                                                        size: 22
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "", // leave description blank
                                                        font: "Arial",
                                                        size: 22
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }));
                        });
                    }

                    let fieldTable = new Table({ rows: fieldRows });
                    datatypeSections.push(fieldTable);
                });
            }
        });
    }


  

     //Array to hold all pseudocode sections (one per function)
    let pseudocodeSections = [];

    if (config.files && Array.isArray(config.files)) {
        config.files.forEach(file => {
            if (file.functions && Array.isArray(file.functions)) {
                file.functions.forEach(func => {
                    // Function name heading
                    pseudocodeSections.push(new Paragraph({
                        text: func.name,
                        heading: HeadingLevel.HEADING_2
                    }));

                    

                    // Parameters section
                    pseudocodeSections.push(new Paragraph({
                        text: "Parameters",
                        heading: HeadingLevel.HEADING_3
                    }));

                    let paramRows = [];
                    // Header row
                    paramRows.push(new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 2000, type: WidthType.DXA },
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: "Parameter",
                                                bold: true,
                                                font: "Arial",
                                                size: 22
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                width: { size: 2000, type: WidthType.DXA },
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: "Type",
                                                bold: true,
                                                font: "Arial",
                                                size: 22
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                width: { size: 5000, type: WidthType.DXA },
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: "Description",
                                                bold: true,
                                                font: "Arial",
                                                size: 22
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }));

                    if (func.parameters && Array.isArray(func.parameters)) {
                        func.parameters.forEach(param => {
                            paramRows.push(new TableRow({
                                children: [
                                    new TableCell({
                                        width: { size: 2000, type: WidthType.DXA },
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: param.name,
                                                        font: "Arial",
                                                        size: 22
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: { size: 2000, type: WidthType.DXA },
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: param.type,
                                                        font: "Arial",
                                                        size: 22
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: { size: 5000, type: WidthType.DXA },
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: param.description || "",
                                                        font: "Arial",
                                                        size: 22
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }));
                        });
                    }
                    let dynamicParamTable = new Table({ rows: paramRows });
                    pseudocodeSections.push(dynamicParamTable);

                    // Return section
                    pseudocodeSections.push(new Paragraph({
                        text: "Return",
                        heading: HeadingLevel.HEADING_3
                    }));

                    let returnRows = [];
                    // Header row for return table
                    returnRows.push(new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: "Value",
                                                bold: true,
                                                font: "Arial",
                                                size: 22
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                width: { size: 6000, type: WidthType.DXA },
                                children: [
                                    new Paragraph({
                                        alignment: AlignmentType.CENTER,
                                        children: [
                                            new TextRun({
                                                text: "Reason",
                                                bold: true,
                                                font: "Arial",
                                                size: 22
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }));
                    returnRows.push(new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 3000, type: WidthType.DXA },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: func.returnType || "",
                                                font: "Arial",
                                                size: 22
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                width: { size: 6000, type: WidthType.DXA },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: func.returnDescription || "",
                                                font: "Arial",
                                                size: 22
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }));
                    let dynamicReturnTable = new Table({ rows: returnRows });
                    pseudocodeSections.push(dynamicReturnTable);

                    // Pseudocode heading
                    pseudocodeSections.push(new Paragraph({
                        text: "Pseudocode",
                        heading: HeadingLevel.HEADING_3
                    }));

                    // Pseudocode text (if available)
                    pseudocodeSections.push(new Paragraph({
                        children: [
                            new TextRun({
                                text: func.pseudocode || "(No pseudocode provided)",
                                size: 24,
                                font: "Arial",
                                break: true
                            })
                        ]
                    }));
                });
            }
        });
    }


    const graphImage = new ImageRun({
        type: 'png',
        data: fs.readFileSync(path.join(projectDir, "report", "state.png")),
        transformation: {
            width: 600,
            height: 600
        }
    });

    if(graphImage === null) {
        graphImage = new Paragraph({
            text: "Insert FSM image here"
        })
    }

    console.log(path.join(projectDir, "report", "state.png"));

    const design = new Document({
        title: "Design",
        styles: {
            paragraphStyles: [
                {
                    id: "Normal",
                    name: "Normal",
                    quickFormat: true,
                    paragraph: {
                        spacing: {
                            before: 100,
                            after: 100
                        }
                    },
                    run: {
                        font: "Arial",
                        size: 22
                    }
                },
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
                    },
                    paragraph: {
                        spacing: {
                            before: 300
                        }
                    }
                },
                {
                    id: "Heading2",
                    name: "Heading 2",
                    basedOn: "Normal",
                    quickFormat: true,
                    run: {
                        size: 32,
                        color: "000000",
                        font: "Arial"
                    },
                    paragraph: {
                        spacing: {
                            before: 300
                        }
                    }
                },
                {
                    id: "Heading3",
                    name: "Heading 3",
                    basedOn: "Normal",
                    quickFormat: true,
                    run: {
                        size: 28,
                        color: "000000",
                        font: "Arial"
                    },
                    paragraph: {
                        spacing: {
                            before: 200
                        }
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
                                text: config.courseNum,
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({ break: 1 }),
                            new TextRun({
                                text: config.assignmentName,
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({ break: 1 }),
                            new TextRun({
                                text: "Design",
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
                                text: config.author,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: config.studentNum,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: config.date,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new PageBreak()
                        ]
                    }),

                    new TableOfContents("DesignContents", {
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
                                text: config.purpose,
                                size: 24,
                                font: "Arial",
                                break: true
                            })
                        ]
                    }),
                    new Paragraph({
                        text: "Data Types",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    ...datatypeSections,

                    new Paragraph({
                        text: "Functions",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    FunTable,

                    new Paragraph({
                        text: "States",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    StateTable,

                    new Paragraph({
                        text: "State Table",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    StateTabTable,

                    new Paragraph({
                        text: "State Transition Diagram",
                        heading: HeadingLevel.HEADING_1,
                    }),

                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [graphImage]
                    }),

                    new Paragraph({
                        text: "Pseudocode",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    ...pseudocodeSections
                ]
            }
        ]
    });

    const buffer = await docx.Packer.toBuffer(design);
    fs.writeFileSync(docPath, buffer);
}

async function generateReport(config, projectDir) {
    const docPath = path.join(projectDir, "report", "report.docx");

    // const platforms = () => {
    //     for (let i = 0; i < config.report.platforms.length; i++) {
    //         return new Paragraph({
    //             bullet: {level: 0},
    //             children: [
    //                 new TextRun({
    //                     text: config.report.platforms[i],
    //                     font: "Arial",
    //                     size: 22
    //                 }),
    //             ]
    //         })
    //     }
    // };

    const platforms = () => {
        const paragraphs = [];
    
        for (let i = 0; i < config.report.platforms.length; i++) {
            paragraphs.push(
                new Paragraph({
                    bullet: { level: 0 },
                    children: [
                        new TextRun({
                            text: config.report.platforms[i],
                            font: "Arial",
                            size: 22
                        }),
                    ]
                })
            );
        }
    
        return paragraphs;
    };

    const tasks = () => {
        const table = [];

        table.push(
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
        )
    
        for (let i = 0; i < config.report.platforms.length; i++) {

            table.push(
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
                                            text: config.report.requirements[i].req,
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
                                            text: config.report.requirements[i].status,
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
            );
        }
    
        return table;
    };
    

    const RequirementsTable = new Table({
        rows: [
            // new TableRow({
            //     children: [
            //         new TableCell({
            //             width: {
            //                 size: 6000,
            //                 type: WidthType.DXA
            //             },
            //             children: [
            //                 new Paragraph({
            //                     alignment: AlignmentType.CENTER,
            //                     children: [
            //                         new TextRun({
            //                             text: "Task",
            //                             bold: true,
            //                             font: "Arial",
            //                             size: 22
            //                         })
            //                     ]
            //                 })
            //             ],
            //         }),
            //         new TableCell({
            //             width: {
            //                 size: 2000,
            //                 type: WidthType.DXA,
            //             },
            //             children: [
            //                 new Paragraph({
            //                     alignment: AlignmentType.CENTER,
            //                     children: [
            //                         new TextRun({
            //                             text: "Status",
            //                             bold: true,
            //                             font: "Arial",
            //                             size: 22
            //                         })
            //                     ]
            //                 })
            //             ],
            //         }),
            //     ],
            // }),
            ...tasks()
        ],
    });
    
    // Document creation starts here
    const report = new Document({
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
                    },

                    paragraph: {
                        spacing: {
                            // line: 
                            before: 300, 
                            // after: 
                        },
                    },
                },

                {
                    id: "Normal",
                    name: "Normal",
                    basedOn: "Normal",
                    quickFormat: true,
                    paragraph: {
                        spacing: {
                            // line: 
                            before: 100, 
                            after: 100
                        },
                    },
                },
                
            ]
        },
    
        sections: [ 
            {
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: config.courseNum,
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({break: 1}),
                            new TextRun({
                                text: config.assignmentName,
                                size: "52",
                                color: "000000",
                                font: "Arial"
                            }),
                            new TextRun({break: 1}),
                            new TextRun({
                                text: "Report",
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
                                text: config.author,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: config.studentNum,
                                font: "Arial",
                                size: "22",
                                break: true
                            }),
                            new TextRun({
                                text: config.date,
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
                                text: config.purpose,
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
    
                    // new Paragraph({
                    //     bullet: {level: 0},
                    //     children: [
                    //         new TextRun({
                    //             text: "macOS 14.2",
                    //             font: "Arial",
                    //             size: 22
                    //         }),
                    //     ]
                    // }),
                    // new Paragraph({
                    //     bullet: {level: 0},
                    //     children: [
                    //         new TextRun({
                    //             text: "Manjaro",
                    //             font: "Arial",
                    //             size: 22
                    //         }),
                    //     ]
                    // }),
                    // new Paragraph({
                    //     bullet: {level: 0},
                    //     children: [
                    //         new TextRun({
                    //             text: "Ubuntu 2023.10",
                    //             font: "Arial",
                    //             size: 22
                    //         }),
                    //     ]
                    // }),
                    // new Paragraph({
                    //     bullet: {level: 0},
                    //     children: [
                    //         new TextRun({
                    //             text: "Fedora 39",
                    //             font: "Arial",
                    //             size: 22
                    //         }),
                    //     ]
                    // }),
                    // new Paragraph({
                    //     bullet: {level: 0},
                    //     children: [
                    //         new TextRun({
                    //             text: "FreeBSD 14.0",
                    //             font: "Arial",
                    //             size: 22
                    //         }),
                    //     ]
                    // }),

                    // new Paragraph({
                    //     bullet: {level: 0},
                    //     children: [
                    //         new TextRun({
                    //             text: config.report.platforms[0],
                    //             font: "Arial",
                    //             size: 22
                    //         }),
                    //     ]
                    // }),
                    // new Paragraph({
                    //     bullet: {level: 0},
                    //     children: [
                    //         new TextRun({
                    //             text: config.report.platforms[1],
                    //             font: "Arial",
                    //             size: 22
                    //         }),
                    //     ]
                    // }),
                    // new Paragraph({
                    //     bullet: {level: 0},
                    //     children: [
                    //         new TextRun({
                    //             text: config.report.platforms[2],
                    //             font: "Arial",
                    //             size: 22
                    //         }),
                    //     ]
                    // }),

                    ...platforms(),


    
                    new Paragraph({
                        text: "Language",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new Paragraph({
                        bullet: {level: 0},
                        children: [
                            new TextRun({
                                text: config.report.language,
                                font: "Arial",
                                size: 22
                            }),
                        ]
                    }),
                    // new Paragraph({
                    //     bullet: {level: 0},
                    //     children: [
                    //         new TextRun({
                    //             text: "Compiles with gcc and clang",
                    //             font: "Arial",
                    //             size: 22
                    //         }),
                    //     ]
                    // }),
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
                                text: config.report.findings,
                                font: "Arial",
                                size: 22
                            })
                        ]
                    })
                ],
            },
        ],
    });

    const buffer = await docx.Packer.toBuffer(report);
    fs.writeFileSync(docPath, buffer);
}

async function generateDocs(config, projectDir) {
    await generateReport(config, projectDir);
    await generateTesting(config, projectDir);
    await generateDesign(config, projectDir);
    await generateUserGuide(config, projectDir);
}

module.exports = {generateDocs};