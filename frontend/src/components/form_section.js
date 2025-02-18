import { useEffect, useState } from "react";

const FormSection = ({ data, duplicate, name }) => {
    //save the original data in a state (shallowCopy)
    const [shallowCopy, setshallowCopy] = useState(data)
    const [fields, setFields] = useState(data);

    //react hook that will be invoked whenever fields value changes
    //when useEffect invoked it will call duplicate which is a function from the parent component
    useEffect(() => {
        duplicate(fields)
    }, [fields])


    const addFields = () => {
        setFields(prevSettings => [
            ...prevSettings,
            ...shallowCopy
        ]);

    }

    //when typing in the input, we saves the value inside the element based on its index
    const onChange = (data, index) => {
        setFields(prev =>
            prev.map((ele, index2) => index === index2 ? { ...ele, value: data?.target?.value } : ele)
        );
    }

    return (
        <div className="my-4 border-bottom-ch ">
            <h2 className="black  font-size-20" >{name}</h2>
            <form>
                <div className="form-group">
                    
                    {fields?.map((ele, index) => (
                        <div key={index} className="d-flex justify-content-start flex-column my-3" >
                            <label className="text-start pb-1 bold font-size-14" htmlFor={`input-${index}`}>{ele?.name}</label>

                            {ele?.type === 'text' ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`input-${index}`}
                                    onChange={(event) => onChange(event, index)}
                                />
                            ) : (
                                <textarea
                                    className="form-control"
                                    id={`textarea-${index}`}
                                    onChange={(event) => onChange(event, index)}

                                    rows="3"
                                ></textarea>
                            )}
                        </div>
                    ))}
                </div>

                <button type="button" onClick={addFields} className="btn btn-secondary w-100 border-raduis-20">
                    Add More Fields
                </button>
            </form>
        </div>
    );
};

export default FormSection;
