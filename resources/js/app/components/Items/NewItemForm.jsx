import React from "react";
import { useFormik } from "formik";
import CurrencyInput from "react-currency-input-field";
import { newItemSchema } from "../utils/schemas/yupValidations";

const NewItemForm = (props) => {
    const { values, errors, touched, isValid, handleBlur, handleChange } =
        useFormik({
            initialValues: {
                name: "",
                description: "",
                price: "",
            },
            validationSchema: newItemSchema,
            onSubmit: onSubmitHandler,
        });

    function onSubmitHandler(event) {
        event.preventDefault();
        props.submitForm(values);
    }

    return (
        <div className="wrapper-500 m-4-auto p-2">
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="formgroup">
                    <label htmlFor="name">
                        {errors.name && touched.name ? (
                            <small className="error-msg">{errors.name}</small>
                        ) : (
                            "Name"
                        )}
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="WM1YR"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.name && touched.name ? "input-error" : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="description">
                        {errors.description && touched.description ? (
                            <small className="error-msg">
                                {errors.description}
                            </small>
                        ) : (
                            "Description"
                        )}
                    </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Mantnimiento web 1 año"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.description && touched.description
                                ? "input-error"
                                : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="price">
                        {errors.price && touched.price ? (
                            <small className="error-msg">{errors.price}</small>
                        ) : (
                            "Price €"
                        )}
                    </label>
                    <CurrencyInput
                        id="price"
                        defaultValue={values.price}
                        decimalsLimit={2}
                        decimalSeparator="."
                        disableGroupSeparators={true}
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.price && touched.price ? "input-error" : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <input
                        type="submit"
                        value="Create item"
                        disabled={
                            !isValid ||
                            (Object.keys(touched).length === 0 &&
                                touched.constructor === Object)
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default NewItemForm;
