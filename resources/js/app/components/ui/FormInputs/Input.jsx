import CurrencyInput from "react-currency-input-field";
import { useField, FastField } from "formik";

const Input = (props) => {
    const [field, meta] = useField(props.name);

    return (
        <div className="formgroup">
            {props.label ? (
                <label htmlFor="irpf">
                    {meta.touched && meta.error ? (
                        <div className="error-msg">{meta.error}</div>
                    ) : (
                        props.label
                    )}
                </label>
            ) : null}

            <FastField
                {...field}
                {...props}
                className={
                    meta.error && meta.touched
                        ? `input-error ${props.className}`
                        : props.className
                }
            />
        </div>
    );
};

export default Input;
