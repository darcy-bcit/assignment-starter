import { useEffect, useState } from "react";
import FormSection from "./form_section";
import yaml from "js-yaml";
import '../styles/generator.css'
const Generator = () => {
    // react hook that saves a state 
    // dataTypes is the name of the variable (state)
    // setDataTypes is a function that change the value of the state
    //
     
    const [dataTypes, setDatatypes] = useState([
        { name: 'Field', type: 'text', value: '' },
        { name: 'Type', type: 'text', value: '' },
        { name: 'Description', type: 'text', value: '' }
    ]);

    const [settings, setSettings] = useState([
        { name: 'Field', type: 'text', value: '' },
        { name: 'Type', type: 'text', value: '' },
        { name: 'Description', type: 'text', value: '' }
    ]);

    const [functions, setFunctions] = useState([
        { name: 'Function Name', type: 'text', value: '' },
        { name: 'Description', type: 'text', value: '' },
        { name: 'Parameters', type: 'text', value: '' },
        { name: 'Return Value', type: 'text', value: '' }
    ]);

    const [states, setStates] = useState([
        { name: 'State Name', type: 'text', value: '' },
        { name: 'Description', type: 'text', value: '' }
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
        return data.map(ele => ({
            [ele.name]: ele?.value
        }))
    }


    //save the states in an object then dump it for yaml
    const generateYaml = () => {
        const formattedData = {
            data_types: restructure(dataTypes),
            settings: restructure(settings),
            functions: restructure(functions),
            states: restructure(states),
            stateTable: restructure(stateTable),
            pseudocode: restructure(pseudocode) 
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

                        <FormSection data={dataTypes} name={"Data Type"} duplicate={(val) => setDatatypes(val)} />

                        <FormSection data={settings}  name={"Settings"} duplicate={(val) => setSettings(val)} />

                        <FormSection data={functions}  name={"functions"} duplicate={(val) => setFunctions(val)} />

                        <FormSection data={states}  name={"states"} duplicate={(val) => setStates(val)} />

                        <FormSection data={stateTable}  name={"stateTable"} duplicate={(val) => setStateTable(val)} />


                        <FormSection data={pseudocode}  name={"Pseudocode"} duplicate={(val) => setPseudocode(val)} />


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
