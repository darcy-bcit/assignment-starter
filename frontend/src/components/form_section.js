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


 

    //when typing in the input, we saves the value inside the element based on its index
    const onChange = (data, index) => {
        setFields(prev =>
            prev.map((ele, index2) => index === index2 ? { ...ele, value: data?.target?.value } : ele)
        );
    }

    const onChangeChild = (data, index, index2) => {
        setFields(prev =>
            prev.map((ele, i) =>
                i === index
                    ? {
                        ...ele,
                        children: ele.children.map((child, j) =>
                            j === index2 ? { ...child, value: data?.target?.value } : child
                        ),
                    }
                    : ele
            )
        );
    };



        const deepCopyField = (field) => {
            const copy = { ...field };
            if (field.type === 'multiple' && Array.isArray(field.children)) {
                copy.children = field.children.map(child => ({ ...child }));
            }
            return copy;
        };
        
        const fieldTemplate = data.map(deepCopyField);
        
        const addFields = () => {
            const duplicated = fieldTemplate.map(deepCopyField);
            setFields(prev => [...prev, ...duplicated]);
        };
        
        const onAddMoreFields = (index) => {
            const original = fieldTemplate[index]; // this is safe
            if (!original?.children || original.children.length === 0) return;
        
            const newChildren = original.children.map(child => ({ ...child }));
        
            setFields(prev =>
                prev.map((ele, i) =>
                    i === index && ele.type === 'multiple'
                        ? { ...ele, children: [...ele.children, ...newChildren] }
                        : ele
                )
            );
        };
        

    
      

    return (
        <div className="my-4 border-bottom-ch ">
            <h2 className="black  font-size-20" >{name}</h2>
            <form>
                <div className="form-group">

                    {fields?.map((ele, index) => (
                        ele?.type === 'multiple' ?
                            <div className="d-flex flex-row align-items-center w-100">
                                <div className="col d-flex flex-row flex-wrap align-items-center w-100">

                                    {ele?.children.map((ele, index2) => (
                                        <div key={index2} className="col-3 d-flex justify-content-start flex-column mx-1 my-3">
                                            <label className="text-start pb-1 bold font-size-14" htmlFor={`input-${index2}`}>
                                                {ele?.name}
                                            </label>

                                            {ele?.type === "text" ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id={`input-${index2}`}
                                                    onChange={(event) => onChangeChild(event, index, index2)}
                                                />
                                            ) : (
                                                <textarea
                                                    className="form-control"
                                                    id={`textarea-${index2}`}
                                                    onChange={(event) => onChangeChild(event, index, index2)}
                                                    rows="3"
                                                ></textarea>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="col-2">

                                    <button onClick={() => onAddMoreFields(index)} className="mt-4 btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-1" type="button" >
                                        <i class="bi bi-plus" ></i>
                                    </button>
                                </div>
                            </div>
                            :
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
