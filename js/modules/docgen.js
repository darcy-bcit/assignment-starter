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


    const TestTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 5000,
                            type: WidthType.DXA
                        },
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
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType.DXA,
                        },
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
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType.DXA,
                        },
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
                                        text: "Screenshot",
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
                            size: 5000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "No arguments",
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
                            size: 1500,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "fail",
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
                            size: 1500,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "fail",
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
                                        text: "Test 1",
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
        ],
    });

    const doc = new Document({
        title: "Testing",
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
                                text: "Testing\n",
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
    
                    new TableOfContents("TestingContents", {
                        hyperlink: true,
                        headingStyleRange: "1-5",
                        font: "Arial"
                    }),
                    TestTable,

                    new Paragraph({
                        text: "Tests",
                        heading: HeadingLevel.HEADING_1,
                    }),

                    new Paragraph({
                        text: "Test 1",
                        heading: HeadingLevel.HEADING_2,
                    }),
                    
                ],
            },
        ],
    });

    const buffer = await docx.Packer.toBuffer(doc);
    fs.writeFileSync(docPath, buffer);
}

async function generateDesign(config, projectDir) {
    const docPath = path.join(projectDir, report, "design.docx");

    const ArgTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
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
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
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
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
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
                        ],
                    })
                ],
            }),
    
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "argc",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "integer",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The number of arguments",
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

    const SettingTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
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
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
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
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
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
                        ],
                    })
                ],
            }),
    
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "count",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "unsigned integer",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The number of times to display the message",
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

    const ConTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
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
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
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
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
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
                        ],
                    })
                ],
            }),
    
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "arguments",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Arguments",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The command line arguments",
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

    const FunTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Function",
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
                            size: 6000,
                            type: WidthType.DXA,
                        },
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
                        ],
                    }),
                ],
            }),
    
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "parse_arguments",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 6000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Parse the command line arguments",
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

    const StateTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "State",
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
                            size: 6000,
                            type: WidthType.DXA,
                        },
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
                        ],
                    }),
                ],
            }),
    
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "PARSE_ARGS",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 6000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Parse command line arguments",
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

    const StateTabTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "From State",
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
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "To State",
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
                            size: 3000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Function",
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
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "START",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "PARSE_ARGS",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "parse_arguments",
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

    const ParamTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 2000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: "Parameters",
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
                            type: WidthType.DXA
                        },
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
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 5000,
                            type: WidthType.DXA,
                        },
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
                        ],
                    }),
                ],
            }),
    
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 2000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "ctx",
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
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Context",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 5000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The program context",
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

    const ReturnTable = new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3000,
                            type: WidthType.DXA
                        },
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
                        ],
                    }),
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
                                        text: "Reason",
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
                            size: 3000,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "HANDLE_ARGS",
                                        font: "Arial",
                                        size: 22
                                    })
                                ]
                            })
                        ],
                    }),
                    new TableCell({
                        width: {
                            size: 6000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "The args passed are all known",
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
        title: "Design",
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
                                text: "Design\n",
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
                                text: "This program demonstrates how to write a program for the course.",
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

                    new Paragraph({
                        text: "Arguments",
                        heading: HeadingLevel.HEADING_2,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Purpose: To hold the unparsed command-line argument information",
                                size: 24,
                                font: "Arial",
                                break: true
                            })
                        ]
                    }),
                    ArgTable,

                    new Paragraph({
                        text: "Settings",
                        heading: HeadingLevel.HEADING_2,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Purpose: To hold the settings the program needs to run.",
                                size: 24,
                                font: "Arial",
                                break: true
                            })
                        ]
                    }),
                    SettingTable,

                    new Paragraph({
                        text: "Context",
                        heading: HeadingLevel.HEADING_2,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Purpose: To hold the arguments, settings, and exit information",
                                size: 24,
                                font: "Arial",
                                break: true
                            })
                        ]
                    }),
                    ConTable,

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
                        text: "Pseudocode",
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "(Pseudocode is a language/platform-independent way to communicate what functions are supposed to do).",
                                size: 24,
                                font: "Arial",
                                break: true
                            })
                        ]
                    }),
                    new Paragraph({
                        text: "parse_arguments",
                        heading: HeadingLevel.HEADING_2,
                    }),
                    new Paragraph({
                        text: "Parameters",
                        heading: HeadingLevel.HEADING_3,
                    }),
                    ParamTable,

                    new Paragraph({
                        text: "Return",
                        heading: HeadingLevel.HEADING_3,
                    }),
                    ReturnTable,
                ],
            },
        ],
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