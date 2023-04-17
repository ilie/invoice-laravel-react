import React from "react";
import Select from "react-select";
import { useField } from "formik";
import { selectStyles } from "../../utils/ui";

const SelectInput = (props) => {
    const [field, meta, helpers] = useField(props);
    return (
        <div className="formgroup">
            {props.label && (
                <label htmlFor={props.name}>
                    {meta.touched && meta.error ? (
                        <div className="error-msg">{meta.error}</div>
                    ) : (
                        `${props.label}`
                    )}
                </label>
            )}
            <Select
                {...field}
                {...props}
                className="select"
                styles={selectStyles}
                isClearable={true}
                onChange={(option) => {
                    field.onChange({
                        target: { name: field.name, value: option },
                    });
                }}
                onBlur={() => {
                    helpers.setTouched(true);
                }}
            />
        </div>
    );
};

export default SelectInput;
