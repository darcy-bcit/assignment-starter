import { useEffect, useState } from "react";
import FormSection from "./form_section";
import yaml from "js-yaml";
import '../styles/generator.css'

//change to true to bypass all validation checks 
const devMode = false; 

const fieldsThatNeedNameCheck = ['projectName', 'name', 'type', 'access'];





const Generator = () => {

    const [author, setAuthor] = useState([
        { id: 1, name: 'author', type: 'text', value: '', error: '' }
    ]);
    const [studentNum, setStudentNum] = useState([
        { id: 1, name: 'studentNum', type: 'text', value: '', error: '' }
    ]);
    const [date, setDate] = useState([
        { id: 1, name: 'date', type: 'text', value: '', error: '' }
    ]);
    const [assignmentName, setAssignmentName] = useState([
        { id: 1, name: 'assignmentName', type: 'text', value: '', error: '' }
    ]);
    const [courseNum, setCourseNum] = useState([
        { id: 1, name: 'courseNum', type: 'text', value: '', error: '' }
    ]);
    const [projectName, setProjectName] = useState([
        { id: 1, name: 'projectName', type: 'text', value: '', error: ''}
    ]);
    const [language, setLanguage] = useState([
        { id: 1, name: 'language', type: 'text', value: '', error: '' }
    ]);
    const [githubPath, setGithubPath] = useState([
        { id: 1, name: 'githubPath', type: 'text', value: '', error: '' }
    ]);
    const [purpose, setPurpose] = useState([
        { id: 1, name: 'purpose', type: 'text', value: '', error: '' }
    ]);
    const [license, setLicense] = useState([
        { id: 1, name: 'license', type: 'text', value: '', error: '' }
    ]);


    const [files, setFiles] = useState([
        { id: 1, name: 'name', type: 'text', value: '', error: '' },
        {
            id: 2,
            name: 'types',
            type: 'multiple',
            children: [
                { id: 1, name: 'name', type: 'text', value: '', error: '' },
                { id: 2, name: 'dataType', type: 'text', value: '', error: '' },

                { id: 3, name: 'access', type: 'text', value: '', error: '' },
                { id: 4, name: 'description', type: 'text', value: '', error: '' },
                {
                    id: 2,
                    name: 'fields',
                    type: 'multiple',
                    children: [
                        { id: 1, name: 'name', type: 'text', value: '', error: '' },
                        { id: 2, name: 'type', type: 'text', value: '', error: '' },
                        { id: 3, name: 'access', type: 'text', value: '', error: '' }
                    ]
                },
            ],
        },
        {
            id: 3,
            name: 'functions',
            type: 'multiple',
            children: [
                { id: 1, name: 'name', type: 'text', value: '', error: '' },
                {
                    id: 2,
                    name: 'parameters',
                    type: 'multiple',
                    children: [
                        { id: 1, name: 'name', type: 'text', value: '', error: '' },
                        { id: 2, name: 'type', type: 'text', value: '', error: '' },
                    ]
                },
                { id: 3, name: 'returnType', type: 'text', value: '', error: '' },
                { id: 4, name: 'access', type: 'text', value: '', error: '' },
                { id: 5, name: 'description', type: 'textarea', value: '', error: '' },
                { id: 6, name: 'pseudocode', type: 'textarea', value: '', error: '' },
            ]
        }
    ]);

    const [states, setStates] = useState([
        { id: 1, name: 'name', type: 'text', value: '', error: '' },
        { id: 2, name: 'description', type: 'text', value: '', error: '' },
        {
            id: 3,
            name: 'transitions',
            type: 'multiple',
            children: [
                { id: 1, name: 'to', type: 'text', value: '', error: '' },
                { id: 2, name: 'function', type: 'text', value: '', error: '' },
            ]
        },
    ]);


    const [report, setReport] = useState([
        {
            id: 1,
            name: 'requirements',
            type: 'multiple',
            children: [
                { id: 1, name: 'req', type: 'text', value: '', error: '' },
                { id: 2, name: 'status', type: 'text', value: '', error: '' }
            ]
        },
        { id: 2, name: 'platforms', type: 'textarea', value: '', error: '' },
        { id: 3, name: 'language', type: 'text', value: '', error: '' },
        { id: 4, name: 'findings', type: 'textarea', value: '', error: '' },
    ]);

    const [userGuide, setUserGuide] = useState([
        {
            id: 1,
            name: 'installing',
            type: 'multiple',
            children: [
                { id: 1, name: 'obtaining', type: 'textarea', value: '', error: '' },
                { id: 2, name: 'building', type: 'textarea', value: '', error: '' },
                { id: 3, name: 'running', type: 'textarea', value: '', error: '' }
            ]
        },
        {
            id: 2,
            name: 'env',
            type: 'multiple',
            children: [
                { id: 1, name: 'variable', type: 'text', value: '', error: '' },
                { id: 2, name: 'purpose', type: 'textarea', value: '', error: '' }
            ]
        }
    ]);


    const [testing, setTesting] = useState([
        {
            id: 1,
            name: 'testcases',
            type: 'multiple',
            children: [
                { id: 1, name: 'name', type: 'text', value: '', error: '' },
                { id: 2, name: 'expected', type: 'text', value: '', error: '' }
            ]
        }
    ]);




   



  

  

    // const [dataTypes, setDataTypes] = useState([
    //     {
    //         id: 1,
    //         name: 'arguments',
    //         type: 'multiple',
    //         children: [
    //             { id: 1, name: 'Field', type: 'text', value: '', error: '' },
    //             { id: 2, name: 'Type', type: 'text', value: '', error: '' },
    //             { id: 3, name: 'Description', type: 'text', value: '', error: '' }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: 'settings',
    //         type: 'multiple',
    //         children: [
    //             { id: 1, name: 'Field', type: 'text', value: '', error: '' },
    //             { id: 2, name: 'Type', type: 'text', value: '', error: '' },
    //             { id: 3, name: 'Description', type: 'text', value: '', error: '' }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         name: 'context',
    //         type: 'multiple',
    //         children: [
    //             { id: 1, name: 'Field', type: 'text', value: '', error: '' },
    //             { id: 2, name: 'Type', type: 'text', value: '', error: '' },
    //             { id: 3, name: 'Description', type: 'text', value: '', error: '' }
    //         ]
    //     }
    // ]);




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
                            i++; 
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



    const restructureUserGuideBody = (data) => {
        if (!data || data.length === 0) return {};
      
        const installingEntry = data.find(ele => ele.name === 'installing');
        const installingChildren = installingEntry?.children || [];
      
        const obtaining = installingChildren.find(c => c.name === 'obtaining')?.value || "";
        const building = installingChildren.find(c => c.name === 'building')?.value || "";
        const running = installingChildren.find(c => c.name === 'running')?.value || "";
      
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
          installing: {
            obtaining,
            building,
            running
          },
          env: environmentvars,
        };
      };
      


    const restructureStates = (data) => {
        if (!data || data.length === 0) return [];

        const states = [];
        let i = 0;

        while (i < data.length) {
            const currentState = data.slice(i, i + 3); 
            const name = currentState.find(d => d.name === 'name')?.value || '';
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
   


  

    // use this functin to check if a field is empty. The yaml will not generate
    const validateNotEmpty = (value) => {
        return value?.trim().length > 0;
      };

    const isValidName = (name) => {
    const validPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    return validPattern.test(name);
    };



    const validateField = (field, name) => {
        const result = { ...field };
      
        if (!validateNotEmpty(field.value)) {
          result.error = `${name} cannot be empty`;
          console.warn(`Empty field: ${name}`);
          return { valid: false, updated: result };
        }
      
        if (fieldsThatNeedNameCheck.includes(field.name) && !isValidName(field.value)) {
          result.error = `${name} must start with a letter/_ and use only letters, numbers, _`;
          console.warn(`Invalid name format: ${name} (${field.value})`);
          return { valid: false, updated: result };
        }
      
        result.error = '';
        return { valid: true, updated: result };
      };
      
      


      const validateSection = (section, setSection, sectionName) => {
        let isValid = true;
      
        const deepValidate = (fields) =>
          fields.map((field) => {
            const copy = { ...field };
      
            if (field.type === "multiple" && Array.isArray(field.children)) {
              copy.children = deepValidate(field.children);
            } else {
              const { valid, updated } = validateField(field, `${sectionName}: ${field.name}`);
              if (!valid) {
                console.warn(`[${sectionName}] Field failed: ${field.name} = '${field.value}'`);
                isValid = false;
              }
              copy.error = updated.error;
            }
      
            return copy;
          });
      
        const updated = deepValidate(section);
        setSection(updated);
        return isValid;
      };
      
      

      const generateYaml = () => {
        if (devMode) {
          generateFinalYaml();
          return;
        }
      
        let allValid = true;
        const validationResults = {
          language: validateSection(language, setLanguage, "Language"),
          projectName: validateSection(projectName, setProjectName, "Project Name"),
          files: validateSection(files, setFiles, "Files"),
          states: validateSection(states, setStates, "States"),
        //   titlePage: validateSection(titlePage, setTitlePage, "Title Page"),
          purpose: validateSection(purpose, setPurpose, "Purpose"),
        //   dataTypes: validateSection(dataTypes, setDataTypes, "Data Types"),
          reportBody: validateSection(report, setReport, "Report Body"),
          userGuide: validateSection(userGuide, setUserGuide, "User Guide"),
//          testing: validateSection(testing, setTesting, "Testing")
        };
      
        allValid = Object.values(validationResults).every(result => result);
        
        if (!allValid) {
          // Show which sections failed validation
          const failedSections = Object.entries(validationResults)
            .filter(([_, valid]) => !valid)
            .map(([section]) => section);
          
          alert(`Validation failed in: ${failedSections.join(', ')}`);
          return;
        }
      
        generateFinalYaml();
      };

      const generateFinalYaml = () => {
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
          userGuide: restructureUserGuideBody(userGuide),
          testing: restructureTestingBody(testing),
        };
      
        const yamlData = yaml.dump(formattedData);
        setYamlContent(yamlData);
      
        console.log(yamlData + "\n");
        alert("YAML generated successfully. Check the console for the output.");
      };

        
    

      return (
        <div className="container py-5">
          <div className="card box-shadow border-0 p-1">
            <div className="card-body">
              <FormSection data={author} name="Author" duplicate={setAuthor} noLabel noMore />
              <FormSection data={studentNum} name="Student Number" duplicate={setStudentNum} noLabel noMore />
              <FormSection data={date} name="Date" duplicate={setDate} noLabel noMore />
              <FormSection data={assignmentName} name="Assignment Name" duplicate={setAssignmentName} noLabel noMore />
              <FormSection data={courseNum} name="Course Number" duplicate={setCourseNum} noLabel noMore />
              <FormSection data={projectName} name="Project Name" duplicate={setProjectName} noLabel noMore />
              <FormSection data={language} name="Language" duplicate={setLanguage} noLabel noMore />
              <FormSection data={githubPath} name="GitHub Path" duplicate={setGithubPath} noLabel noMore />
              <FormSection data={purpose} name="Purpose" duplicate={setPurpose} noLabel noMore />
              <FormSection data={license} name="License" duplicate={setLicense} noLabel noMore />
            </div>
          </div>
    
          <div className="card box-shadow border-0 p-1 my-3">
            <div className="card-body">
              <FormSection data={files} name="Files" duplicate={setFiles} />
              <FormSection data={states} name="States" duplicate={setStates} />
            </div>
          </div>
    
          <div className="card box-shadow border-0 p-1 my-3">
            <div className="card-body">
              <FormSection data={report} name="Report" duplicate={setReport} />
            </div>
          </div>
    
          <div className="card box-shadow border-0 p-1 my-3">
            <div className="card-body">
              <FormSection data={userGuide} name="User Guide" duplicate={setUserGuide} />
            </div>
          </div>
    
          <div className="card box-shadow border-0 p-1 my-3">
            <div className="card-body">
              <FormSection data={testing} name="Testing" duplicate={setTesting} />
            </div>
          </div>
          
    
          <div className="my-2">
            <button onClick={generateYaml} className="btn btn-primary w-100 bold button-gen">
              Generate
            </button>
          </div>
    
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
      );
};

export default Generator;
