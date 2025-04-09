import { useEffect, useState, useRef } from "react";

const FormSection = ({ data, duplicate, name, noMore, noLabel }) => {
  const [fields, setFields] = useState(data);
  const initialData = useRef(data);

  useEffect(() => {
    duplicate(fields);
  }, [fields]);

  const onChange = (data, index) => {
    setFields(prev =>
      prev.map((ele, index2) =>
        index === index2 ? { ...ele, value: data?.target?.value } : ele
      )
    );
  };

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
                        k === grandChildIndex
                          ? { ...gc, value: data.target.value }
                          : gc
                      ),
                    }
                  : child
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
    const duplicated = initialData.current.map(deepCopyField);
    setFields(prev => [...prev, ...duplicated]);
  };

  const onAddMoreFields = (index) => {
    setFields(prevFields =>
      prevFields.map((ele, i) => {
        if (ele?.id !== index || !ele.children) return ele;
        let newChildSet = initialData.current.find(item => item.id === index)?.children || [];

        return {
          ...ele,
          children: [...ele.children, ...newChildSet.map(child => ({ ...child, value: '' }))]
        };
      })
    );
  };

  const onAddMoreNestedFields = (parentIndex, childIndex) => {
    setFields(prev =>
      prev.map((ele, i) =>
        i === parentIndex
          ? {
              ...ele,
              children: ele.children.map((child, j) =>
                j === childIndex && child.name === 'fields'
                  ? {
                      ...child,
                      children: [
                        ...child.children,
                        { name: 'name', type: 'text', value: '' },
                        { name: 'type', type: 'text', value: '' },
                        { name: 'access', type: 'text', value: '' }
                      ]
                    }
                  : child
              )
            }
          : ele
      )
    );
  };

  return (
    <div className="my-4">
      <h2 className="black font-size-20">{name}</h2>
      <form>
        <div className="form-group">
          {fields.map((ele, index) =>
            ele.type === 'multiple' ? (
              <div
                key={index}
                className="d-flex flex-row align-items-end justify-content-between w-100 flex-nowrap my-3 rounded p-2"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
              >
                <div className="col-10-div d-flex justify-content-start flex-wrap gap-1">
                  {ele.children.map((child, childIndex) =>
                    child.type === 'multiple' ? (
                      <div key={childIndex} className="d-flex flex-row w-100 align-items-end">
                        <div className="col-12 d-flex flex-row align-items-end flex-wrap gap-1">
                          {child.children.map((gc, gcIndex) => (
                            <div
                              key={`${childIndex}-${gcIndex}`}
                              className="col-6 my-1 d-flex flex-column"
                              style={{ width: '49.5%' }}
                            >
                              <label className="text-start pb-1 bold font-size-14">{gc.name}</label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                value={gc.value}
                                onChange={(e) => onChangeGrandChild(e, index, childIndex, gcIndex)}
                              />
                              {gc.error && (
                                <small className="text-danger mt-1">{gc.error}</small>
                              )}
                            </div>
                          ))}
                          {child.name === 'fields' && (
                            <div className="col d-flex align-items-start">
                              <button
                                type="button"
                                className="btn my-2 btn-primary rounded-circle d-flex align-items-center justify-content-center p-0"
                                style={{ width: '30px', height: '30px' }}
                                onClick={() => onAddMoreNestedFields(index, childIndex)}
                              >
                                <i className="bi bi-plus" />
                              </button>
                            </div>
                          )}
                        </div>
                        {child.name === 'parameters' && (
                          <div className="col d-flex align-items-start">
                            <button
                              type="button"
                              className="btn my-2 btn-primary rounded-circle d-flex align-items-center justify-content-center p-0"
                              style={{ width: '30px', height: '30px' }}
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
                      <div
                        key={childIndex}
                        style={{ width: '49.5%' }}
                        className="col-6 my-1 d-flex justify-content-start flex-column"
                      >
                        <label className="text-start pb-1 bold font-size-14">{child.name}</label>
                        {child.type === 'text' ? (
                          <>
                            <input
                              type="text"
                              className="form-control"
                              value={child.value}
                              required
                              onChange={(e) => onChangeChild(e, index, childIndex)}
                            />
                            {child.error && (
                              <small className="text-danger mt-1">{child.error}</small>
                            )}
                          </>
                        ) : (
                          <>
                            <textarea
                              className="form-control"
                              value={child.value}
                              required
                              onChange={(e) => onChangeChild(e, index, childIndex)}
                              rows="3"
                            />
                            {child.error && (
                              <small className="text-danger mt-1">{child.error}</small>
                            )}
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
                <div className="col-2-div mt-2 ms-4" style={{ marginBottom: '-.5rem' }}>
                  <button
                    onClick={() => onAddMoreFields(ele?.id)}
                    className="btn btn-info rounded-circle d-flex align-items-center justify-content-center p-0"
                    style={{ width: '40px', height: '40px' }}
                    type="button"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="d-flex justify-content-start flex-column my-3 col-10-div me-6"
              >
                <label className="text-start pb-1 bold font-size-14">
                  {!noLabel ? ele.name : ''}
                </label>
                {ele.type === 'text' ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      value={ele.value}
                      required
                      onChange={(e) => onChange(e, index)}
                    />
                    {ele.error && (
                      <small className="text-danger mt-1">{ele.error}</small>
                    )}
                  </>
                ) : (
                  <>
                    <textarea
                      className="form-control"
                      value={ele.value}
                      required
                      onChange={(e) => onChange(e, index)}
                      rows="3"
                    />
                    {ele.error && (
                      <small className="text-danger mt-1">{ele.error}</small>
                    )}
                  </>
                )}
                {name === 'Files' && index === 0 && ele.name === 'name' && (
                  <h5 className="fw-semibold text-muted mt-3">Types</h5>
                )}
              </div>
            )
          )}
        </div>
        {!noMore && (
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
