import { useEffect, useState } from "react";
import FormSection from "./form_section";
import yaml from "js-yaml";
import '../styles/generator.css'

//change to true to bypass all validation checks 
const devMode = true;


const Generator = () => {

    const [author, setAuthor] = useState([
        { id: 1, name: 'author', type: 'text', value: '' }
    ]);
    const [studentNum, setStudentNum] = useState([
        { id: 1, name: 'studentNum', type: 'text', value: '' }
    ]);
    const [date, setDate] = useState([
        { id: 1, name: 'date', type: 'text', value: '' }
    ]);
    const [assignmentName, setAssignmentName] = useState([
        { id: 1, name: 'courseNum', type: 'text', value: '' }
    ]);
    const [courseNum, setCourseNum] = useState([
        { id: 1, name: 'courseNum', type: 'text', value: '' }
    ]);
    const [projectName, setProjectName] = useState([
        { id: 1, name: 'projectName', type: 'text', value: '' }
    ]);
    const [language, setLanguage] = useState([
        { id: 1, name: 'language', type: 'text', value: '' }
    ]);
    const [githubPath, setGithubPath] = useState([
        { id: 1, name: 'githubPath', type: 'text', value: '' }
    ]);
    const [purpose, setPurpose] = useState([
        { id: 1, name: 'purpose', type: 'text', value: '' }
    ]);
    const [license, setLicense] = useState([
        { id: 1, name: 'license', type: 'text', value: '' }
    ]);


    const [files, setFiles] = useState([
        { id: 1, name: 'name', type: 'text', value: '' },
        {
            id: 2,
            name: 'types',
            type: 'multiple',
            children: [
                { id: 1, name: 'name', type: 'text', value: '' },
                { id: 2, name: 'dataType', type: 'text', value: '' },

                { id: 3, name: 'access', type: 'text', value: '' },
                { id: 4, name: 'description', type: 'text', value: '' },
                {
                    id: 2,
                    name: 'fields',
                    type: 'multiple',
                    children: [
                        { id: 1, name: 'name', type: 'text', value: '' },
                        { id: 2, name: 'type', type: 'text', value: '' },
                        { id: 3, name: 'access', type: 'text', value: '' }
                    ]
                },
            ],
        },
        {
            id: 3,
            name: 'functions',
            type: 'multiple',
            children: [
                { id: 1, name: 'name', type: 'text', value: '' },
                {
                    id: 2,
                    name: 'parameters',
                    type: 'multiple',
                    children: [
                        { id: 1, name: 'name', type: 'text', value: '' },
                        { id: 2, name: 'type', type: 'text', value: '' }
                    ]
                },
                { id: 3, name: 'returnType', type: 'text', value: '' },
                { id: 4, name: 'access', type: 'text', value: '' },
                { id: 5, name: 'description', type: 'textarea', value: '' },
                { id: 6, name: 'pseudocode', type: 'textarea', value: '' }
            ]
        }
    ]);

    const [states, setStates] = useState([
        { id: 1, name: 'name', type: 'text', value: '' },
        { id: 2, name: 'description', type: 'text', value: '' },
        {
            id: 3,
            name: 'transitions',
            type: 'multiple',
            children: [
                { id: 1, name: 'to', type: 'text', value: '' },
                { id: 2, name: 'function', type: 'text', value: '' },
            ]
        },
    ]);


    const [report, setReport] = useState([
        {
            id: 1,
            name: 'requirements',
            type: 'multiple',
            children: [
                { id: 1, name: 'req', type: 'text', value: '' },
                { id: 2, name: 'status', type: 'text', value: '' }
            ]
        },
        { id: 2, name: 'platforms', type: 'textarea', value: '' },
        { id: 3, name: 'language', type: 'text', value: '' },
        { id: 4, name: 'findings', type: 'textarea', value: '' }
    ]);

    const [userGuide, setUserGuide] = useState([
        {
            id: 1,
            name: 'installing',
            type: 'multiple',
            children: [
                { id: 1, name: 'obtaining', type: 'textarea', value: '' },
                { id: 2, name: 'building', type: 'textarea', value: '' },
                { id: 3, name: 'running', type: 'textarea', value: '' }
            ]
        },
        {
            id: 2,
            name: 'env',
            type: 'multiple',
            children: [
                { id: 1, name: 'variable', type: 'text', value: '' },
                { id: 2, name: 'purpose', type: 'textarea', value: '' }
            ]
        }
    ]);


    const [testing, setTesting] = useState([
        {
            id: 1,
            name: 'testcases',
            type: 'multiple',
            children: [
                { id: 1, name: 'name', type: 'text', value: '' },
                { id: 2, name: 'expected', type: 'text', value: '' }
            ]
        }
    ]);


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

    const [yamlContent, setYamlContent] = useState("");
    const [yamlFileName, setYamlFileName] = useState("");

    // Function to trigger YAML file download
    const downloadYAML = () => {
        if (!yamlContent) return;

        const blob = new Blob([yamlContent], { type: "text/yaml" });
        const url = URL.createObjectURL(blob);
        const safeFileName = yamlFileName.trim() || "generated"; // Default to 'generated' if empty

        const a = document.createElement("a");
        a.href = url;
        a.download = `${safeFileName}.yaml`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    const [settings, setSettings] = useState([
        { id: 1, name: 'Field', type: 'text', value: '' },
        { id: 2, name: 'Type', type: 'text', value: '' },
        { id: 3, name: 'Description', type: 'text', value: '' }
    ]);

    // const [language, setLanguage] = useState([
    //     { id: 1, name: 'Language', type: 'text', value: '' }
    // ]);

    // const [projectName, setProjectName] = useState([
    //     { id: 1, name: 'Project Name', type: 'text', value: '' }
    // ]);
    const [types, setTypes] = useState([
        { id: 1, name: 'name', type: 'text', value: '' },  // Simple key-value pairs
        { id: 2, name: 'type', type: 'text', value: '' },
        { id: 3, name: 'access', type: 'text', value: '' },
        {
            id: 4, name: 'fields', type: 'multiple', children: [
                { name: 'name', type: 'text', value: '', isSingle: false },
                { name: 'type', type: 'text', value: '', isSingle: false }  // Keep 'type' for fields
            ]
        }
    ]);




    const [titlePage, setTitlePage] = useState([
        { id: 1, name: 'name', type: 'text', value: '' },
        { id: 2, name: 'stdnum', type: 'text', value: '' },
        { id: 3, name: 'date', type: 'text', value: '' },
        { id: 4, name: 'assignment', type: 'text', value: '' },
        { id: 5, name: 'coursenum', type: 'text', value: '' }
    ]);

    // const [purpose, setPurpose] = useState([
    //     { id: 1, name: 'purpose', type: 'textarea', value: '' }
    // ]);

    const [dataTypes, setDataTypes] = useState([
        {
            id: 1,
            name: 'arguments',
            type: 'multiple',
            children: [
                { id: 1, name: 'Field', type: 'text', value: '' },
                { id: 2, name: 'Type', type: 'text', value: '' },
                { id: 3, name: 'Description', type: 'text', value: '' }
            ]
        },
        {
            id: 2,
            name: 'settings',
            type: 'multiple',
            children: [
                { id: 1, name: 'Field', type: 'text', value: '' },
                { id: 2, name: 'Type', type: 'text', value: '' },
                { id: 3, name: 'Description', type: 'text', value: '' }
            ]
        },
        {
            id: 3,
            name: 'context',
            type: 'multiple',
            children: [
                { id: 1, name: 'Field', type: 'text', value: '' },
                { id: 2, name: 'Type', type: 'text', value: '' },
                { id: 3, name: 'Description', type: 'text', value: '' }
            ]
        }
    ]);

    const [stateTable, setStateTable] = useState([
        { id: 1, name: 'From State', type: 'text', value: '' },
        { id: 2, name: 'To State', type: 'text', value: '' },
        { id: 3, name: 'Function', type: 'text', value: '' }
    ]);

    const [pseudocode, setPseudocode] = useState([
        { id: 1, name: 'functionname', type: 'text', value: '' },
        {
            id: 2,
            name: 'parameters',
            type: 'multiple',
            children: [
                { id: 1, name: 'parameter', type: 'text', value: '' },
                { id: 2, name: 'type', type: 'text', value: '' },
                { id: 3, name: 'description', type: 'text', value: '' }
            ]
        },
        {
            id: 3,
            name: 'return',
            type: 'multiple',
            children: [
                { id: 1, name: 'value', type: 'text', value: '' },
                { id: 2, name: 'reason', type: 'text', value: '' }
            ]
        },
        { id: 4, name: 'pseudocode', type: 'textarea', value: '' }
    ]);






    const restructureFiles = (files) => {
        if (!files || files.length === 0) return [];
    
        const fileGroups = [];
        let i = 0;
    
        while (i < files.length) {
            const file = files[i];
            const typesEntry = files[i + 1];
            const functionsEntry = files[i + 2];
    
            if (file.name === 'name' && typesEntry?.name === 'types' && functionsEntry?.name === 'functions') {
                const fileName = file.value || '';
    
                // --- TYPES ---
                const types = [];
                const typeChildren = typesEntry.children || [];
                for (let j = 0; j < typeChildren.length; j += 5) {
                    const name = typeChildren[j]?.value || '';
                    const dataType = typeChildren[j + 1]?.value || '';
                    const access = typeChildren[j + 2]?.value || '';
                    const description = typeChildren[j + 3]?.value || '';
                    const fieldsEntry = typeChildren[j + 4];
    
                    const fields = [];
                    const fieldChildren = fieldsEntry?.children || [];
                    for (let k = 0; k < fieldChildren.length; k += 3) {
                        fields.push({
                            name: fieldChildren[k]?.value || '',
                            type: fieldChildren[k + 1]?.value || '',
                            access: fieldChildren[k + 2]?.value || '',
                        });
                    }
    
                    types.push({ name, dataType, access, description, fields });
                }
    
                // --- FUNCTIONS ---
                const functions = [];
                const funcChildren = functionsEntry.children || [];
                for (let j = 0; j < funcChildren.length; j += 6) {
                    const name = funcChildren[j]?.value || '';
                    const parametersEntry = funcChildren[j + 1];
                    const returnType = funcChildren[j + 2]?.value || '';
                    const access = funcChildren[j + 3]?.value || '';
                    const description = funcChildren[j + 4]?.value || '';
                    const pseudocode = funcChildren[j + 5]?.value || '';
    
                    const parameters = [];
                    const paramChildren = parametersEntry?.children || [];
                    for (let k = 0; k < paramChildren.length; k += 2) {
                        parameters.push({
                            name: paramChildren[k]?.value || '',
                            type: paramChildren[k + 1]?.value || '',
                        });
                    }
    
                    functions.push({ name, parameters, returnType, access, description, pseudocode });
                }
    
                fileGroups.push({
                    name: fileName,
                    types,
                    functions
                });
    
                i += 3; // move to next file block
            } else {
                i++;
            }
        }
    
        return fileGroups;
    };
    

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
                console.log(acc, ele)
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

        const environmentvarsEntry = data.find(ele => ele.name === 'env');
        const environmentvarsList = environmentvarsEntry?.children || [];
        const environmentvars = [];
        for (let i = 0; i < environmentvarsList.length; i += 2) {
            environmentvars.push({
                variable: environmentvarsList[i]?.value || "",
                purpose: environmentvarsList[i + 1]?.value || ""
            });
        }



        return {
            installing: 
                {
                    obtaining: "",
                    building: "",
                    running: ""
                }
            ,
            env: environmentvars,
        };
    };


    const restructureStates = (data) => {
        if (!data || data.length === 0) return [];

        const states = [];
        let i = 0;

        while (i < data.length) {
            const currentState = data.slice(i, i + 3); // Expecting From State, description, transitions

            const name = currentState.find(d => d.name === 'From State')?.value || '';
            const description = currentState.find(d => d.name === 'description')?.value || '';
            const transitionsEntry = currentState.find(d => d.name === 'transitions');
            const transitions = [];

            if (transitionsEntry && Array.isArray(transitionsEntry.children)) {
                for (let j = 0; j < transitionsEntry.children.length; j += 2) {
                    transitions.push({
                        to: transitionsEntry.children[j]?.value || '',
                        function: transitionsEntry.children[j + 1]?.value || ''
                    });
                }
            }

            states.push({
                name,
                description,
                transitions
            });

            i += 3;
        }

        return states;
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

        const platforms = data.find(ele => ele.name === 'platforms')?.value || "";
        const languageList = data.find(ele => ele.name === 'language')?.value || "";

        // const languageEntry = data.find(ele => ele.name === 'language');
        // const languageList = (languageEntry?.children || []).map(lang => lang.value || "");

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
      
        const testcases = [];
      
        data.forEach((ele) => {
          if (ele.name === 'testcases' && ele.type === 'multiple') {
            const children = ele.children || [];
            for (let i = 0; i < children.length; i += 2) {
              testcases.push({
                name: children[i]?.value || "",
                expected: children[i + 1]?.value || ""
              });
            }
          }
        });
      
        return { testcases };
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
            name: 'env', type: 'multiple', children: [
                { name: 'variable', type: 'text', value: '' },
                { name: 'purpose', type: 'textarea', value: '' }
            ]
        },
       
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

        if (!devMode) {

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
        console.log(author)

        const formattedData = {
            author: restructure(author),
            studentNum: restructure(studentNum),
            date: restructure(date),
            assignmentName: restructure(assignmentName),
            courseNum: restructure(courseNum),
            projectName: restructure(projectName),
            language: restructure(language),
            githubPath: restructure(githubPath),
            purpose: restructure(purpose),
            license: restructure(license),
            files: restructureFiles(files),
            states: restructureStates(states),
            report: restructureReportBody(report),
            userGuide: restructureUserGuideBody(userGuideBody),
            testing: restructureTestingBody(testingBody),

                
                 
                

            

        };



        const yamlData = yaml.dump(formattedData);


        setYamlContent(yamlData); // ✅ Store YAML for download

        console.log(yamlData + "\n");
        alert("YAML generated successfully. Check the console for the output.");
    };

    return (
        <>
            <div className="container py-5">

                {/* <div className="card box-shadow border-0 p-3">
                    <div className="card-body"> */}
                {/* component that generate the inputs based on the state */}



                <div className="card box-shadow  border-0 p-1">
                    <div className="card-body">
                        <div className="border-bottom-ch">
                            <FormSection data={author} name={"Author"} duplicate={(val) => setAuthor(val)} noLabel noMore/>
                        </div>

                        <div className="border-bottom-ch">
                            <FormSection data={studentNum} name={"Student Number"} duplicate={(val) => setStudentNum(val)} noLabel noMore />
                        </div>

                        <div className="border-bottom-ch">
                            <FormSection data={date} name={"Date"} duplicate={(val) => setDate(val)} noLabel noMore />
                        </div>


                        <div className="border-bottom-ch">
                            <FormSection data={assignmentName} name={"Assignment Name"} duplicate={(val) => setAssignmentName(val)} noLabel noMore />
                        </div>

                        <div className="border-bottom-ch">
                            <FormSection data={courseNum} name={"course Number"} duplicate={(val) => setCourseNum(val)} noLabel noMore />
                        </div>

                        <div className="border-bottom-ch">
                            <FormSection data={projectName} name={"Project Name"} duplicate={(val) => setProjectName(val)} noLabel noMore />
                        </div>
                        <div className="border-bottom-ch">
                            <FormSection data={language} name={"Language"} duplicate={(val) => setLanguage(val)} noLabel  noMore/>
                        </div>
                        <div className="border-bottom-ch">
                            <FormSection data={githubPath} name={"Github Path"} duplicate={(val) => setGithubPath(val)} noLabel noMore/>
                        </div>
                        <div className="border-bottom-ch">
                            <FormSection data={purpose} name={"Purpose"} duplicate={(val) => setPurpose(val)} noLabel noMore/>
                        </div>
                        <div className="">
                            <FormSection data={license} name={"License"} duplicate={(val) => setLicense(val)} noLabel  noMore/>
                        </div>
                    </div>
                </div>

                <div className="card box-shadow  border-0 p-1 my-3">
                    <div className="card-body">
                        <div className="border-bottom-ch">
                            <FormSection data={files} name={"Files"} duplicate={(val) => setFiles(val)} />
                        </div>

                        <div className="">
                            <FormSection data={states} name={"States"} duplicate={(val) => setStates(val)} />
                        </div>
                    </div>
                </div>

                <div className="card box-shadow  border-0 p-1 my-3">
                    <div className="card-body">
                        <div className="">
                            <FormSection data={report} name={"Report"} duplicate={(val) => setReport(val)} />
                        </div>
                    </div>
                </div>


                <div className="card box-shadow  border-0 p-1 my-3">
                    <div className="card-body">
                        <div className="">
                            <FormSection data={userGuide} name={"User Guide"} duplicate={(val) => setUserGuide(val)} />
                        </div>
                    </div>
                </div>

                <div className="card box-shadow  border-0 p-1 my-3">
                    <div className="card-body">
                        <div className="">
                            <FormSection data={testing} name={"Testing"} duplicate={(val) => setTesting(val)} />
                        </div>
                    </div>
                </div>

                {/* <FormSection data={projectName} name={"Project Name"} duplicate={(val) => setProjectName(val)} allowAddMore={false} />

                <FormSection data={types} name={"Types"} duplicate={(val) => setTypes(val)} />

                <FormSection data={settings} name={"Settings"} duplicate={(val) => setSettings(val)} />


                <FormSection data={files} name={"files"} duplicate={(val) => setFiles(val)} />

                <FormSection data={states} name={"states"} duplicate={(val) => setStates(val)} />

                <FormSection data={titlePage} name={"titlePage"} duplicate={(val) => setTitlePage(val)} />

                <FormSection data={purpose} name={"purpose"} duplicate={(val) => setPurpose(val)} />

                <FormSection data={dataTypes} name={"dataTypes"} duplicate={(val) => setDataTypes(val)} />

                <FormSection data={stateTable} name={"stateTable"} duplicate={(val) => setStateTable(val)} />


                <FormSection data={reportBody} name={"reportBody"} duplicate={(val) => setReportBody(val)} />

                <FormSection data={userGuideBody} name={"userGuideBody"} duplicate={(val) => setUserGuideBody(val)} />

                <FormSection data={testingBody} name={"testingBody"} duplicate={(val) => setTestingBody(val)} /> */}

                <div className="my-2">
                    <button onClick={generateYaml} className="btn btn-primary w-100 bold button-gen"> Generate</button>
                </div>
                {/* </div>
                </div> */}

                {/* ✅ Show Download button only if YAML is generated */}
                {yamlContent && (
                    <div className="my-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Enter file name (without .yaml)"
                            value={yamlFileName}
                            onChange={(e) => setYamlFileName(e.target.value)}
                        />
                        <button onClick={downloadYAML} className="btn btn-success w-100 bold">
                            Download YAML
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Generator;
