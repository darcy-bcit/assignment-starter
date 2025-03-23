import { useEffect, useState, useRef } from "react";

const FormSection = ({ data, duplicate, name, allowAddMore = true }) => {
  //save the original data in a state (shallowCopy)
  const [shallowCopy, setshallowCopy] = useState(data)
  const [fields, setFields] = useState(data);

  // Store the original data in a ref so that it doesn't change on re-renders.
  const initialData = useRef(data);

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
  
  const addFields = () => {
    //We duplicate the original data so the number of added fields is consistent. (for the large parent)
      const duplicated = initialData.current.map(deepCopyField);
      setFields(prev => [...prev, ...duplicated]);
  };
  
  const onAddMoreFields = (index) => {
      setFields(prevFields =>
          prevFields.map((ele, i) => {
              if (i !== index || !ele.children) return ele;

              let newChildSet;

              // Specific handling for configuration (and similar sections)
              if (ele.name === 'configuration' || ele.name === 'environmentvars') {
                newChildSet = ele.children.slice(0, 2).map(child => ({
                  ...child,
                  value: ''
                }));
              } else {
                // Original logic for other sections (types, etc.)
                newChildSet = ele.children.map(child => ({
                  ...child,
                  value: ''
                }));
              }

              return {
                ...ele,
                children: [...ele.children, ...newChildSet]
              };
          })
      );
  };

  const onChangeGrandChild = (data, index, childIndex, grandChildIndex) => {
      setFields(prev =>
        prev.map((ele, i) =>
          i === index
            ? {
                ...ele,
                children: ele.children.map((child, j) =>
                  j === childIndex
                    ? {
                        ...child,
                        children: child.children.map((gc, k) =>
                          k === grandChildIndex ? { ...gc, value: data.target.value } : gc
                        ),
                      }
                    : child
                ),
              }
            : ele
        )
      );
  };    

  return (
    <div className="my-4 border-bottom-ch ">
      <h2 className="black font-size-20">{name}</h2>
      <form>
        <div className="form-group">
          {fields.map((ele, index) =>
            ele.type === 'multiple' ? (
              <div key={index} className="d-flex flex-row align-items-start w-100">
                <div className="col d-flex flex-row flex-wrap align-items-start w-100">
                  {ele.children.map((child, childIndex) =>
                    child.type === 'multiple' ? (
                      <div key={childIndex} className="d-flex flex-row w-100 align-items-start">
                        <div className="col d-flex flex-row flex-wrap">
                          {child.children.map((gc, gcIndex) => (
                            <div
                              key={`${childIndex}-${gcIndex}`}
                              className="col-3 d-flex flex-column mx-1 my-2"
                            >
                              <label className="text-start pb-1 bold font-size-14">{gc.name}</label>
                              <input
                                type="text"
                                className="form-control"
                                value={gc.value}
                                onChange={(e) =>
                                  onChangeGrandChild(e, index, childIndex, gcIndex)
                                }
                              />
                            </div>
                          ))}
                        </div>
  
                        {/* 👉 Plus button BESIDE nested grandchild section (e.g. parameters) */}
                        {child.name === 'parameters' && (
                          <div className="col-auto d-flex align-items-start mt-4 ms-2">
                            <button
                              type="button"
                              className="btn btn-primary rounded-circle p-1"
                              onClick={() => {
                                setFields(prev =>
                                  prev.map((el, i) =>
                                    i === index
                                      ? {
                                          ...el,
                                          children: el.children.map((c, j) =>
                                            j === childIndex
                                              ? {
                                                  ...c,
                                                  children: [
                                                    ...c.children,
                                                    { name: 'name', type: 'text', value: '' },
                                                    { name: 'type', type: 'text', value: '' }
                                                  ]
                                                }
                                              : c
                                          )
                                        }
                                      : el
                                  )
                                );
                              }}
                            >
                              <i className="bi bi-plus" />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      // 🧱 Regular child field
                      <div
                        key={childIndex}
                        className="col-3 d-flex justify-content-start flex-column mx-1 my-3"
                      >
                        <label className="text-start pb-1 bold font-size-14">{child.name}</label>
                        {child.type === 'text' ? (
                          <input
                            type="text"
                            className="form-control"
                            value={child.value}
                            onChange={(e) => onChangeChild(e, index, childIndex)}
                          />
                        ) : (
                          <textarea
                            className="form-control"
                            value={child.value}
                            onChange={(e) => onChangeChild(e, index, childIndex)}
                            rows="3"
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
  
                {/* 🔁 Original "Add More Fields" button */}
                <div className="col-2">
                  <button
                    onClick={() => onAddMoreFields(index)}
                    className="mt-4 btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-1"
                    type="button"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div key={index} className="d-flex justify-content-start flex-column my-3">
                <label className="text-start pb-1 bold font-size-14">{ele.name}</label>
                {ele.type === 'text' ? (
                  <input
                    type="text"
                    className="form-control"
                    value={ele.value}
                    onChange={(e) => onChange(e, index)}
                  />
                ) : (
                  <textarea
                    className="form-control"
                    value={ele.value}
                    onChange={(e) => onChange(e, index)}
                    rows="3"
                  />
                )}
              </div>
            )
          )}
        </div>
        {/* Check if a section is supposed to be able to add a new field. eg. language vs project name.*/}
        {allowAddMore && (
          <button
            type="button"
            onClick={addFields}
            className="btn btn-secondary w-100 border-raduis-20"
          >
            Add More Fields
          </button>
        )}
        </form>
      </div>
    );
  
};

export default FormSection;
