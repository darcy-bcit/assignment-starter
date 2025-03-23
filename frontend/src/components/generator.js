import { useEffect, useState } from "react";
import FormSection from "./form_section";
import yaml from "js-yaml";
import '../styles/generator.css'

//change to true to bypass all validation checks 
const devMode = true;


const Generator = () => {
    // react hook that saves a state 
    // dataTypes is the name of the variable (state)
    // setDataTypes is a function that change the value of the state
    //

    // datatypes: #Data Types section of design doc.
    // - arguments: 
    //     - field: argc
    //       type: integer
    //       description: "The number of arguments"
    //   settings:
    //     - field: count
    //       type: unsigned integer
    //       description: "The number of times to display the message"
    //   context:
    //     - field: arguments
    //       type: arguments
    //       description: "The command line arguments"

    const [settings, setSettings] = useState([
        { name: 'Field', type: 'text', value: '' },
        { name: 'Type', type: 'text', value: '' },
        { name: 'Description', type: 'text', value: '' }
    ]);

    const [language, setLanguage] = useState([
        { name: 'Language', type: 'text', value: '' }
    ]);

    const [projectName, setProjectName] = useState([
        { name: 'Project Name', type: 'text', value: '' }
    ]);

    const [types, setTypes] = useState([
        { name: 'name', type: 'text', value: '' },  // Simple key-value pairs
        { name: 'type', type: 'text', value: '' }, 
        { name: 'access', type: 'text', value: '' },
        {
            name: 'fields', type: 'multiple', children: [
                { name: 'name', type: 'text', value: '', isSingle: false },
                { name: 'type', type: 'text', value: '', isSingle: false }  // Keep 'type' for fields
            ]
        }
    ]);


    const [files, setFiles] = useState([
        { name: 'name', type: 'text', value: '' }, // single file name field
        {
            name: 'functions',
            type: 'multiple', // Multiple functions per file
            children: [
                { name: 'name', type: 'text', value: '' },
                { name: 'parameters', type: 'multiple', children: [ // multiple parameters
                    { name: 'name', type: 'text', value: '' },
                    { name: 'type', type: 'text', value: '' },
                ]},
                { name: 'returnType', type: 'text', value: '' },
                { name: 'access', type: 'text', value: '' },
                { name: 'comment', type: 'textarea', value: '' },
                { name: 'pseudocode', type: 'textarea', value: '' },
            ]
        }
    ]);

    const restructureFiles = (files) => {
        const fileNameEntry = files.find(f => f.name === 'name');
        const functionsEntry = files.find(f => f.name === 'functions');
    
        return [{
            name: fileNameEntry?.value || "",
            functions: functionsEntry?.children ? [{
                name: functionsEntry.children.find(child => child.name === 'name')?.value || "",
                parameters: (() => {
                    const paramEntry = functionsEntry.children.find(child => child.name === 'parameters');
                    if (!paramEntry || !paramEntry.children) return [];
                    let params = [];
                    for (let i = 0; i < paramEntry.children.length; i += 2) {
                        params.push({
                            name: paramEntry.children[i]?.value || "",
                            type: paramEntry.children[i + 1]?.value || "",
                        });
                    }
                    return params;
                })(),
                returnType: functionsEntry.children.find(child => child.name === 'returnType')?.value || "",
                access: functionsEntry.children.find(child => child.name === 'access')?.value || "",
                comment: functionsEntry.children.find(child => child.name === 'comment')?.value || "",
                pseudocode: functionsEntry.children.find(child => child.name === 'pseudocode')?.value || "",
            }] : []
        }];
    };

    const [states, setStates] = useState([
        { name: 'From State', type: 'text', value: '' },
        { name: 'description', type: 'text', value: '' },
        { name: 'transitions', type: 'multiple', children:[
            { name: 'to', type: 'text', value: '' },
            { name: 'function', type: 'text', value: '' },
        ] },

    ]);

    const [titlePage, setTitlePage] = useState([
        { name: 'name', type: 'text', value: '' },
        { name: 'stdnum', type: 'text', value: '' },
        { name: 'date', type: 'text', value: '' },
        { name: 'assignment', type: 'text', value: '' },
        { name: 'coursenum', type: 'text', value: '' }

    ]);

    const [purpose, setPurpose] = useState([
        { name: 'purpose', type: 'textarea', value: '' }

    ]);

    const [dataTypes, setDataTypes] = useState([
        { name: 'arguments', type: 'multiple', children: [
            { name: 'Field', type: 'text', value: '' },
            { name: 'Type', type: 'text', value: '' },
            { name: 'Description', type: 'text', value: '' }
        ] },
        { name: 'settings', type: 'multiple', children: [
            { name: 'Field', type: 'text', value: '' },
            { name: 'Type', type: 'text', value: '' },
            { name: 'Description', type: 'text', value: '' }
        ] },
        { name: 'context', type: 'multiple', children: [
            { name: 'Field', type: 'text', value: '' },
            { name: 'Type', type: 'text', value: '' },
            { name: 'Description', type: 'text', value: '' }
        ] },
        

    ]);

    const [stateTable, setStateTable] = useState([
        { name: 'From State', type: 'text', value: '' },
        { name: 'To State', type: 'text', value: '' },
        { name: 'Function', type: 'text', value: '' }
    ]);

    const [pseudocode, setPseudocode] = useState([
        { name: 'functionname', type: 'text', value: '' },
        { name: 'parameters', type: 'multiple', children: [
            { name: 'parameter', type: 'text', value: '' },
            { name: 'type', type: 'text', value: '' },
            { name: 'description', type: 'text', value: '' }
        ]},
        { name: 'return', type: 'multiple', children: [
            { name: 'value', type: 'text', value: '' },
            { name: 'reason', type: 'text', value: '' }
        ]},
        { name: 'pseudocode', type: 'textarea', value: '' },
    ]);
    
    //change the structure of the data from [{ name: '', type: '', value: '' }] to [{the_element_name: the element_value}]
    const restructure = (data) => {
        if (!data || data.length === 0) return "";
    
        if (data.length === 1 && data[0].type !== 'multiple') {
            return data[0].value || "";
        }
    
        return data.reduce((acc, ele) => {
            if (ele?.type === 'multiple') {
                if (ele.name === 'functions') {
                    acc[ele.name] = (ele.children || []).map(func => {
                        if (!func.children || func.children.length === 0) return null;
    
                        const parametersField = func.children.find(child => child.name === 'parameters');
                        const parametersList = parametersField?.children || [];
    
                        const formattedParameters = [];
                        for (let i = 0; i < parametersList.length; i += 2) {
                            formattedParameters.push({
                                name: parametersList[i]?.value || "",
                                type: parametersList[i + 1]?.value || ""
                            });
                        }
    
                        return {
                            name: func.children?.find(child => child.name === 'name')?.value || "",
                            parameters: formattedParameters,
                            returnType: func.children?.find(child => child.name === 'returnType')?.value || "",
                            access: func.children?.find(child => child.name === 'access')?.value || ""
                        };
                    }).filter(func => func !== null);
                }
    
                // CORRECTED THIS PART SPECIFICALLY:
                else if (['arguments', 'settings', 'context'].includes(ele.name)) {
                    acc[ele.name] = [];
    
                    for (let i = 0; i < ele.children.length; i += 3) {
                        acc[ele.name].push({
                            field: ele.children[i]?.value || "",
                            type: ele.children[i + 1]?.value || "",
                            description: ele.children[i + 2]?.value || "",
                        });
                    }
                }

                    //new handle "fields" (used in types)
                    else if (ele.name === 'fields') {
                        acc[ele.name] = [];
                    
                        for (let i = 0; i < ele.children.length; i++) {
                            const curr = ele.children[i];
                            const next = ele.children[i + 1];
                    
                            if (curr?.name === 'name' && next?.name === 'type') {
                                acc[ele.name].push({
                                    name: curr?.value || "",
                                    type: next?.value || ""
                                });
                                i++; // skip the 'type' since we already used it
                            }
                        }
                    }
                    
    
                else if (ele.name === 'parameters') {
                    acc[ele.name] = [];
                    for (let i = 0; i < (ele.children || []).length; i += 2) {
                        acc[ele.name].push({
                            name: ele.children[i]?.value || "",
                            type: ele.children[i + 1]?.value || ""
                        });
                    }
                }
    
                else if (ele.name === 'transitions') {
                    acc[ele.name] = [];
                    for (let i = 0; i < (ele.children || []).length; i += 2) {
                        acc[ele.name].push({
                            to: ele.children[i]?.value || "",
                            function: ele.children[i + 1]?.value || ""
                        });
                    }
                }
    
                else {
                    acc[ele.name] = (ele.children || []).map(child => ({
                        name: child.value || "",
                        type: child.value || ""
                    }));
                }
            } else {
                acc[ele.name] = ele?.value || "";
            }
            return acc;
        }, {});
    };
        
    const restructurePseudocode = (data) => {
        if (!data || data.length === 0) return [];
    
        const functionNameEntry = data.find(ele => ele.name === 'functionname');
        const pseudocodeEntry = data.find(ele => ele.name === 'pseudocode');
        
        const parametersEntry = data.find(ele => ele.name === 'parameters');
        const parametersList = parametersEntry?.children || [];
        
        const returnEntry = data.find(ele => ele.name === 'return');
        const returnList = returnEntry?.children || [];
    
        const parameters = [];
        for (let i = 0; i < parametersEntry?.children.length; i += 3) {  // ✅ increment by 3
            parameters.push({
                parameter: parametersEntry.children[i]?.value || "",
                type: parametersEntry.children[i + 1]?.value || "",
                description: parametersEntry.children[i + 2]?.value || ""
            });
        }
    
        const returns = [];
        for (let i = 0; i < (data.find(ele => ele.name === 'return')?.children?.length || 0); i += 2) {
            returns.push({
                value: data.find(ele => ele.name === 'return').children[i]?.value || "",
                reason: data.find(ele => ele.name === 'return').children[i + 1]?.value || ""
            });
        }
    
        return {
            functionname: functionNameEntry?.value || "",
            parameters: parameters,
            return: returns,
            pseudocode: pseudocodeEntry?.value || ""
        };
    };

    const restructureUserGuideBody = (data) => {
        if (!data || data.length === 0) return {};
    
        const purpose = data.find(ele => ele.name === 'purpose')?.value || "";
    
        const installingEntry = data.find(ele => ele.name === 'installing');
        const obtaining = installingEntry?.children.find(child => child.name === 'obtaining')?.value || "";
        const building = installingEntry?.children.find(child => child.name === 'building')?.value || "";
        const running = installingEntry?.children.find(child => child.name === 'running')?.value || "";
    
        const environmentvarsEntry = data.find(ele => ele.name === 'environmentvars');
        const environmentvarsList = environmentvarsEntry?.children || [];
        const environmentvars = [];
        for (let i = 0; i < environmentvarsList.length; i += 2) {
            environmentvars.push({
                variable: environmentvarsList[i]?.value || "",
                purpose: environmentvarsList[i + 1]?.value || ""
            });
        }
    
        const configuration = [
            {
                variable: "",
                purpose: ""
            }
        ];
    
        return {
            installing: [
                {
                    obtaining: "",
                    building: "",
                    running: ""
                }
            ],
            environmentvars,
            configuration
        };
    };


    const restructureStates = (data) => {
        if (!data || data.length === 0) return [];
    
        const name = data.find(d => d.name === 'From State')?.value || '';
        const description = data.find(d => d.name === 'description')?.value || '';
    
        const transitionsField = data.find(d => d.name === 'transitions');
        const transitions = [];
    
        if (transitionsField && Array.isArray(transitionsField.children)) {
            for (let i = 0; i < transitionsField.children.length; i += 2) {
                transitions.push({
                    to: transitionsField.children[i]?.value || '',
                    function: transitionsField.children[i + 1]?.value || ''
                });
            }
        }
    
        //return a flat array with a single object
        return [{
            name,
            description,
            transitions
        }];
    };

    const restructureTypes = (data) => {
        if (!data || data.length === 0) return [];
    
        const result = [];
    
        for (let i = 0; i < data.length; i += 4) {
            const nameEntry = data[i];
            const typeEntry = data[i + 1];
            const accessEntry = data[i + 2];
            const fieldsEntry = data[i + 3];
    
            const fields = [];
            if (fieldsEntry?.children) {
                for (let j = 0; j < fieldsEntry.children.length; j++) {
                    const name = fieldsEntry.children[j];
                    const type = fieldsEntry.children[j + 1];
                    if (name?.name === 'name' && type?.name === 'type') {
                        fields.push({
                            name: name.value || '',
                            type: type.value || ''
                        });
                        j++; // skip the next one (already used)
                    }
                }
            }
    
            result.push({
                name: nameEntry?.value || '',
                type: typeEntry?.value || '',
                access: accessEntry?.value || '',
                fields
            });
        }
    
        return result;
    };
    
    
    
  
    const restructureReportBody = (data) => {
        if (!data || data.length === 0) return {};
    
        const purpose = data.find(ele => ele.name === 'purpose')?.value || "";
    
        const requirementsEntry = data.find(ele => ele.name === 'requirements');
        const requirementsList = requirementsEntry?.children || [];
        const requirements = [];
        for (let i = 0; i < requirementsList.length; i += 2) {
            requirements.push({
                req: requirementsList[i]?.value || "",
                status: requirementsList[i + 1]?.value || ""
            });
        }
    
        const platformsEntry = data.find(ele => ele.name === 'platforms');
        const platforms = (platformsEntry?.children || []).map(child => child.value || "");
    
        const languageEntry = data.find(ele => ele.name === 'language');
        const languageList = (languageEntry?.children || []).map(lang => lang.value || "");
    
        const findings = data.find(ele => ele.name === 'findings')?.value || "";
    
        return {
            requirements,
            platforms,
            language: languageList,
            findings
        };
    };

    const restructureTestingBody = (data) => {
        if (!data || data.length === 0) return {};
    
        const testcasesEntry = data.find(ele => ele.name === 'testcases');
        const testcasesList = testcasesEntry?.children || [];
    
        const testcases = [];
        for (let i = 0; i < testcasesList.length; i += 2) {
            testcases.push({
                testname: testcasesList[i]?.value || "",
                expectedres: testcasesList[i + 1]?.value || ""
            });
        }
    
        return {
            testcases
        };
    };

    const [reportBody, setReportBody] = useState([
        { name: 'purpose', type: 'textarea', value: '' },
        {
            name: 'requirements',
            type: 'multiple',
            children: [
                { name: 'req', type: 'text', value: '' },
                { name: 'status', type: 'text', value: '' }
            ]
        },
        {
            name: 'platforms',
            type: 'multiple',
            children: [
                { name: 'platform', type: 'textarea', value: '' }
            ]
        },
        {
            name: 'language',
            type: 'multiple',
            children: [
                { name: 'language', type: 'textarea', value: '' }
            ]
        },
        { name: 'findings', type: 'textarea', value: '' }
    ]);
    
    const [userGuideBody, setUserGuideBody] = useState([
        { name: 'purpose', type: 'textarea', value: '' },
        {
            name: 'installing', type: 'multiple', children: [
                { name: 'obtaining', type: 'textarea', value: '' },
                { name: 'building', type: 'textarea', value: '' },
                { name: 'running', type: 'textarea', value: '' }
            ]
        },
        {
            name: 'environmentvars', type: 'multiple', children: [
                { name: 'variable', type: 'text', value: '' },
                { name: 'purpose', type: 'textarea', value: '' }
            ]
        },
        {
            name: 'configuration', type: 'multiple', children: [
                { name: 'variable', type: 'text', value: '' },
                { name: 'purpose', type: 'textarea', value: '' }
            ]
        }
    ]);
    
    const [testingBody, setTestingBody] = useState([
        {
            name: 'testcases', 
            type: 'multiple', 
            children: [
                { name: 'testname', type: 'text', value: '' },
                { name: 'expectedres', type: 'text', value: '' },
            ]
        }
    ]);

  // use this functin to check if a field is empty. The yaml will not generate
  const validateNotEmpty = (data, fieldName) => {
      if (!data || data.trim().length === 0) {
      alert(`${fieldName} cannot be empty.`);
      return false;
      }
      return true;
  };

     const isValidName = (name, fieldName) => {
      if (!name) return false; // Already checked in previous step

      const validPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/; // Must start with a letter or underscore, no special chars

      if (!validPattern.test(name)) {
        alert(`${fieldName} contains invalid characters. Use only letters, numbers, and underscores (cannot start with a number).`);
        return false;
      }

      return true;
    };
      
    //save the states in an object then dump it for yaml
    const generateYaml = () => {

        if(!devMode) {

            //Language paramter must be filled
            if (!validateNotEmpty(language[0].value, "Language")) return;

            //Project Name parameter must be filled and have valid syntax
            if (!validateNotEmpty(projectName[0].value, "Project Name")) return;
            if (!isValidName(projectName[0].value, "Project Name")) return;

            //Validation for the types section (need to refactor this to be more dynamic and also less confusing of the user)
            types.forEach(child => {
            //Deal with the nested object differently here
            if (child.name === "fields" && Array.isArray(child.children)) {
                child.children.forEach(child => {
                    if (!validateNotEmpty(child.value, `Types section ${child.name}`)) return;
                    if (!isValidName(child.value, `Types section ${child.name}`)) return;
                });
            } else {
                if (!validateNotEmpty(child.value, `Types section ${child.name}`)) return;
                if (!isValidName(child.value, `Types section ${child.name}`)) return;
            }
            });
        
            //No validation needed for the settings section

            //Validation for the files section
            files.forEach(child => {
            //Deal with nested object differently here
            if (child.name === "functions" && Array.isArray(child.children)) {
                child.children.forEach(child => {
                if (child.name === "parameters" && Array.isArray(child.children)) {
                    //There needs to be another loop here to deal with the nested parameters object
                    console.log("skippped files parameters");
                } else {
                    if (!validateNotEmpty(child.value, `Files section ${child.name}`)) return;
                    if (!isValidName(child.value, `Files section ${child.name}`)) return;
                }
                });
            } else {
                if (!validateNotEmpty(child.value, `Files section ${child.name}`)) return;
                if (!isValidName(child.value, `Files section ${child.name}`)) return;
            }
            })

            //Validation for the states section
            states.forEach(child => {
            //Deal with the nested object differently here
            if (child.name === "transitions" && Array.isArray(child.children)) {
                child.children.forEach(child => {
                    //Deal with the nested object differently here
                    console.log("skippped states section transitions");
                });
            } else {
                if (child.name === "From State") {
                if (!validateNotEmpty(child.value, `States section ${child.name}`)) return;
                if (!isValidName(child.value, `States section ${child.name}`)) return;
                }
                if (!validateNotEmpty(child.value, `States section ${child.name}`)) return;
            }
            });

            //Validation for the title page section
            titlePage.forEach(child => {
            if (!validateNotEmpty(child.value, `Title Page section ${child.name}`)) return;
            });

            //Validation for project purpose section
            purpose.forEach(child => {
            if (!validateNotEmpty(child.value, `Purpose section ${child.name}`)) return;
            });
        
            console.log(dataTypes);
            //Validation for the data types section
            dataTypes.forEach(child => {
            //Deal with the nested object differently here
            child.children.forEach(child => {
                if (child.name === "Description") {
                if (!validateNotEmpty(child.value, `Data Types section ${child.name}`)) return;
                } else {
                if (!validateNotEmpty(child.value, `Data Types section ${child.name}`)) return;
                if (!isValidName(child.value, `Data Types section ${child.name}`)) return;
                }
            });
            });

            //Validation for stateTable section may or may not be needed???

            //Validation for the pseudocode section
            pseudocode.forEach(child => {
            if (child.children && Array.isArray(child.children)) {
                child.children.forEach(child => {
                if (child.name === "description" || child.name === "reason") {
                    if (!validateNotEmpty(child.value, `Pseudocode section ${child.name}`)) return;
                } else {
                    if (!validateNotEmpty(child.value, `Pseudocode section ${child.name}`)) return;
                    if (!isValidName(child.value, `Pseudocode section ${child.name}`)) return;
                }
                })
            } else {
                if (child.name === "functionname") {
                if (!validateNotEmpty(child.value, `Pseudocode section ${child.name}`)) return;
                if (!isValidName(child.value, `Pseudocode section ${child.name}`)) return;
                } else {
                if (!validateNotEmpty(child.value, `Pseudocode section ${child.name}`)) return;
                }
            }
            });

            //Validation for the report body section
            reportBody.forEach(child => {
            if (child.children && Array.isArray(child.children)) {
                child.children.forEach(child => {
                if (!validateNotEmpty(child.value, `Report Body section ${child.name}`)) return;
                })
            } else {
                if (!validateNotEmpty(child.value, `Report Body section ${child.name}`)) return;
            }
            });

            //Validation for the user guide body section
            userGuideBody.forEach(child => {
            if (child.children && Array.isArray(child.children)) {
                child.children.forEach(child => {
                if (!validateNotEmpty(child.value, `User guide section ${child.name}`)) return;
                })
            } else {
                if (!validateNotEmpty(child.value, `User guide section ${child.name}`)) return;
            }
            });

            //Validation for the testing body section
            testingBody.forEach(child => {
            if (child.children && Array.isArray(child.children)) {
                child.children.forEach(child => {
                if (!validateNotEmpty(child.value, `Testing section ${child.name}`)) return;
                })
            } else {
                if (!validateNotEmpty(child.value, `Testing section ${child.name}`)) return;
            }
            });
        }

        const formattedData = {
            language: restructure(language),
            projectName: restructure(projectName),
            types: restructureTypes(types),
            files: restructureFiles(files),
            states: restructureStates(states),
            titlePage: restructure(titlePage),
            body : [
                {
                purpose: restructure(purpose),
                dataTypes: [restructure(dataTypes)],
                // pseudocode: [restructurePseudocode(pseudocode)]
                }
            
            ]

        };

        const formattedData2 = {
            
            body : restructureReportBody(reportBody)
            
        };

        const formattedData3 = {
            
            body : restructureUserGuideBody(userGuideBody)
            
        };

        const formattedData4 = {
            
            body : [restructureTestingBody(testingBody)]
            
        };

        const yamlData = yaml.dump(formattedData);
        const yamlData2 = yaml.dump(formattedData2);
        const yamlData3 = yaml.dump(formattedData3);
        const yamlData4 = yaml.dump(formattedData4);

        console.log(yamlData + "\n" + yamlData2 + "\n" + yamlData3 + "\n" + yamlData4);
        alert("YAML generated successfully. Check the console for the output.");
    };

    return (
        <>
            <div className="container py-5">

                {/* <div class="card box-shadow border-0 p-3">
                    <div class="card-body"> */}
                {/* component that generate the inputs based on the state */}

                <FormSection data={language} name={"Language"} duplicate={(val) => setLanguage(val)} />

                <FormSection data={projectName} name={"Project Name"} duplicate={(val) => setProjectName(val)} />

                <FormSection data={types} name={"Types"} duplicate={(val) => setTypes(val)} />

                <FormSection data={settings} name={"Settings"} duplicate={(val) => setSettings(val)} />

                {/* <FormSection data={functions} name={"functions"} duplicate={(val) => setFunctions(val)} /> */}

                <FormSection data={files} name={"files"} duplicate={(val) => setFiles(val)} />

                <FormSection data={states} name={"states"} duplicate={(val) => setStates(val)} />

                <FormSection data={titlePage} name={"titlePage"} duplicate={(val) => setTitlePage(val)} />

                <FormSection data={purpose} name={"purpose"} duplicate={(val) => setPurpose(val)} />

                <FormSection data={dataTypes} name={"dataTypes"} duplicate={(val) => setDataTypes(val)} />

                <FormSection data={stateTable} name={"stateTable"} duplicate={(val) => setStateTable(val)} />

                {/* <FormSection data={pseudocode} name={"Pseudocode"} duplicate={(val) => setPseudocode(val)} /> */}

                <FormSection data={reportBody} name={"reportBody"} duplicate={(val) => setReportBody(val)} />

                <FormSection data={userGuideBody} name={"userGuideBody"} duplicate={(val) => setUserGuideBody(val)} />

                <FormSection data={testingBody} name={"testingBody"} duplicate={(val) => setTestingBody(val)} />

                <div className="my-2">
                    <button onClick={generateYaml} className="btn btn-primary w-100 bold button-gen"> Generate</button>
                </div>
                {/* </div>
                </div> */}
            </div>
        </>
    );
};

export default Generator;
