import { useEffect, useState } from "react";
import FormSection from "./form_section";
import yaml from "js-yaml";
import '../styles/generator.css'
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
        { name: 'type', type: 'text', value: '' },  // ✅ Rename 'type' to 'type_name'
        { name: 'access', type: 'text', value: '' },
        {
            name: 'fields', type: 'multiple', children: [
                { name: 'name', type: 'text', value: '', isSingle: false },
                { name: 'type', type: 'text', value: '', isSingle: false }  // Keep 'type' for fields
            ]
        }
    ]);

    //FILES thing????


    const [functions, setFunctions] = useState([
        { name: 'name', type: 'text', value: '' },  // Simple key-value pairs
        { name: 'parameters', type: 'multiple', children:[
            { name: 'name', type: 'text', value: '', isSingle: false },
            { name: 'type', type: 'text', value: '', isSingle: false }
        ] },  
        { name: 'returnType', type: 'text', value: '' },
        { name: 'access', type: 'text', value: '' },
        { name: 'comment', type: 'textarea', value: '' },
        { name: 'pseudocode', type: 'textarea', value: '' },
        
    ]);

    const [states, setStates] = useState([
        { name: 'name', type: 'text', value: '' },
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
        { name: 'Function', type: 'text', value: '' },
        { name: 'Pseudocode', type: 'textarea', value: '' },
    ]);



    //change the structure of the data from [{ name: '', type: '', value: '' }] to [{the_element_name: the element_value}]
    const restructure = (data) => {
        if (data.length === 1 && data[0].type !== 'multiple') {
            return data[0].value || "";  // ✅ Ensure single-value fields remain simple strings
        }
    
        return data.reduce((acc, ele) => {
            if (ele?.type === 'multiple') {
                if (ele.name === 'transitions') {
                    // ✅ Handle transitions properly
                    acc[ele.name] = [];
                    for (let i = 0; i < ele.children.length; i += 2) {
                        acc[ele.name].push({
                            to: ele.children[i]?.value || "",
                            function: ele.children[i + 1]?.value || ""
                        });
                    }
                } else if (ele.name === 'parameters') {
                    // ✅ Fix parameters: Extract `name` and `type` correctly
                    acc[ele.name] = [];
                    for (let i = 0; i < ele.children.length; i += 2) {
                        acc[ele.name].push({
                            name: ele.children[i]?.value || "",
                            type: ele.children[i + 1]?.value || ""
                        });
                    }
                } else if (['arguments', 'settings', 'context'].includes(ele.name)) {
                    // ✅ Ensure child has `children` before accessing indexes
                    acc[ele.name] = ele.children.map(child => ({
                        field: child.children?.[0]?.value || "",
                        type: child.children?.[1]?.value || "",
                        description: child.children?.[2]?.value || ""
                    }));
                } else {
                    acc[ele.name] = ele.children.map(child => ({
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
    
    
    
    
    
    
     
    
    
    


    //save the states in an object then dump it for yaml
    const generateYaml = () => {
        const formattedData = {
            language: restructure(language),
            projectName: restructure(projectName),
            types: [restructure(types)],
            functions: [restructure(functions)],
            states: [restructure(states)],
            titlePage: restructure(titlePage),
            body : [
                {
                purpose: restructure(purpose),
                dataTypes: [restructure(dataTypes)]
                
            }
        ]
        };

        const yamlData = yaml.dump(formattedData);

        console.log(yamlData);
        alert(yamlData);
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

                <FormSection data={functions} name={"functions"} duplicate={(val) => setFunctions(val)} />

                <FormSection data={states} name={"states"} duplicate={(val) => setStates(val)} />

                <FormSection data={titlePage} name={"titlePage"} duplicate={(val) => setTitlePage(val)} />

                <FormSection data={purpose} name={"purpose"} duplicate={(val) => setPurpose(val)} />

                <FormSection data={dataTypes} name={"dataTypes"} duplicate={(val) => setDataTypes(val)} />


                <FormSection data={stateTable} name={"stateTable"} duplicate={(val) => setStateTable(val)} />


                <FormSection data={pseudocode} name={"Pseudocode"} duplicate={(val) => setPseudocode(val)} />


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
