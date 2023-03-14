import React from "react";
import { useFormik } from "formik";
import { newClientSchema } from "../utils/schemas/yupValidations";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EditClientForm = (props) => {
    const {
        values,
        errors,
        touched,
        isValid,
        isSubmitting,
        handleBlur,
        handleChange,
    } = useFormik({
        initialValues: {
            name: props.client.name,
            cif: props.client.cif,
            address: props.client.address,
            phone: props.client.phone,
            email: props.client.email,
            contact_name: props.client.contact_name,
            contact_phone: props.client.contact_phone,
        },
        validationSchema: newClientSchema,
        onSubmit: onSubmitHandler,
    });

    function onSubmitHandler(event) {
        event.preventDefault();
        props.submitForm(values);
    }

    return (
        <div className="wrapper-500">
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
                        placeholder="Ex. Digital Solutions S.L."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className={
                            errors.name && touched.name ? "input-error" : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="cif">
                        {errors.cif && touched.cif ? (
                            <small className="error-msg">{errors.cif}</small>
                        ) : (
                            "CIF / NIF"
                        )}
                    </label>
                    <input
                        type="text"
                        name="cif"
                        id="cif"
                        value={values.cif}
                        placeholder="B12345678"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.cif && touched.cif ? "input-error" : ""
                        }
                    />
                </div>

                <div className="formgroup">
                    <label htmlFor="address">
                        {errors.address && touched.address ? (
                            <small className="error-msg">
                                {errors.address}
                            </small>
                        ) : (
                            "Address"
                        )}
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={values.address}
                        placeholder="Ex. Calle Recta nº12, 08227, Barcelona"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.address && touched.address
                                ? "input-error"
                                : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="phone">
                        {errors.phone && touched.phone ? (
                            <small className="error-msg">{errors.phone}</small>
                        ) : (
                            "Phone"
                        )}
                    </label>
                    <PhoneInput
                        type="tel"
                        id="phone"
                        name="phone"
                        country="es"
                        autoFormat
                        regions={["europe"]}
                        containerClass="phone-input"
                        countryCodeEditable={false}
                        value={values.phone}
                        placeholder="912 345 678"
                        inputProps={{ name: "phone", country: "country" }}
                        enableSearch
                        onChange={(phone, country, e) => handleChange(e)}
                        onBlur={handleBlur}
                        className={
                            errors.phone && touched.phone ? "input-error" : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="email">
                        {errors.email && touched.email ? (
                            <small className="error-msg">{errors.email}</small>
                        ) : (
                            "Email"
                        )}
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email@digitalsolutions.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={
                            errors.email && touched.email ? "input-error" : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="contact_name">
                        {errors.contact_name && touched.contact_name ? (
                            <small className="error-msg">
                                {errors.contact_name}
                            </small>
                        ) : (
                            "Contact name"
                        )}
                    </label>
                    <input
                        type="text"
                        name="contact_name"
                        id="contact_name"
                        placeholder="Lilian Wolff"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contact_name}
                        className={
                            errors.contact_name && touched.contact_name
                                ? "input-error"
                                : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="contact_phone">
                        {errors.contact_phone && touched.contact_phone ? (
                            <small className="error-msg">
                                {errors.contact_phone}
                            </small>
                        ) : (
                            "Contact phone"
                        )}
                    </label>
                    <PhoneInput
                        type="tel"
                        id="contact_phone"
                        name="contact_phone"
                        country="es"
                        autoFormat
                        regions={["europe"]}
                        containerClass="phone-input"
                        countryCodeEditable={false}
                        value={values.contact_phone}
                        placeholder="612 345 678"
                        inputProps={{ name: "contact_phone" }}
                        enableSearch
                        onChange={(contact_phone, country, e) =>
                            handleChange(e)
                        }
                        onBlur={handleBlur}
                        className={
                            errors.contact_phone && touched.contact_phone
                                ? "input-error"
                                : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <input
                        type="submit"
                        value="Update client"
                        disabled={!isValid || isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditClientForm;
