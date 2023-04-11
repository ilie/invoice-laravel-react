import Select from "react-select";
import { useFormik } from "formik";
import Loader from "../ui/Loader/Loader";
import { selectStyles } from "../utils/ui";
import React, { useState, useEffect } from "react";
import { invoiceStatusOptions } from "../utils/data";
import useListResource from "../../hooks/useListResource";
import { newInvoiceSchema } from "../utils/schemas/yupValidations";
import CurrencyInput from "react-currency-input-field";
const NewInvoiceForm = (props) => {
    const [clientOptions, setClientOptions] = useState([""]);
    const [newItems, setNewItems] = useState([]);
    const {
        list: itemsList,
        error: itemsError,
        isLoading: itemsLoading,
    } = useListResource("items");
    const {
        list: clientsList,
        error: clientsError,
        isLoading: clientsLoading,
    } = useListResource("clients");
    const {
        values,
        errors,
        touched,
        isValid,
        handleBlur,
        handleChange,
        setFieldValue,
    } = useFormik({
        initialValues: {
            client_id: "",
            status: "",
            irpf: "",
            vat: "",
            items: [],
        },
        validationSchema: newInvoiceSchema,
        onSubmit: onSubmitHandler,
    });

    useEffect(() => {
        const options = [];
        clientsList.map((client) => {
            return options.push({
                value: client.id,
                label: client.name,
            });
        });
        setClientOptions(options);
    }, [clientsList]);

    function onSubmitHandler(event) {
        event.preventDefault();
        console.log(values);
    }

    return (
        <div className="wrapper-500 m-4-auto p-2">
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="formgroup">
                    <label htmlFor="client_id">
                        {errors.client_id && touched.client_id ? (
                            <small className="error-msg">
                                {errors.client_id}
                            </small>
                        ) : (
                            "Client"
                        )}
                    </label>
                    <Select
                        styles={selectStyles}
                        className="select"
                        onChange={({ value }) =>
                            setFieldValue("client_id", value)
                        }
                        isSearchable={true}
                        onBlur={handleBlur}
                        placeholder="Please select a client"
                        options={clientOptions}
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="status">
                        {errors.status && touched.status ? (
                            <small className="error-msg">{errors.status}</small>
                        ) : (
                            "Status"
                        )}
                    </label>
                    <Select
                        styles={selectStyles}
                        placeholder="Please select a state"
                        onChange={({ value }) => setFieldValue("status", value)}
                        isSearchable={true}
                        onBlur={handleBlur}
                        options={invoiceStatusOptions}
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="irpf">
                        {errors.irpf && touched.irpf ? (
                            <small className="error-msg">{errors.irpf}</small>
                        ) : (
                            "IRPF"
                        )}
                    </label>
                    <CurrencyInput
                        id="irpf"
                        defaultValue={values.irpf}
                        decimalsLimit={2}
                        decimalSeparator="."
                        disableGroupSeparators={true}
                        disableAbbreviations={true}
                        allowNegativeValue={false}
                        maxLength={4}
                        step={0.5}
                        name="irpf"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.irpf && touched.irpf ? "input-error" : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <label htmlFor="irpf">
                        {errors.status && touched.status ? (
                            <small className="error-msg">{errors.status}</small>
                        ) : (
                            "VAT"
                        )}
                    </label>
                    <CurrencyInput
                        id="vat"
                        defaultValue={values.vat}
                        decimalsLimit={2}
                        decimalSeparator="."
                        disableGroupSeparators={true}
                        disableAbbreviations={true}
                        allowNegativeValue={false}
                        maxLength={4}
                        step={0.5}
                        name="vat"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                            errors.vat && touched.vat ? "input-error" : ""
                        }
                    />
                </div>
                <div className="formgroup">
                    <input
                        type="submit"
                        value="Create invoice"
                        // disabled={
                        //     !isValid ||
                        //     (Object.keys(touched).length === 0 &&
                        //         touched.constructor === Object)
                        // }
                    />
                </div>
            </form>
        </div>
    );
};

export default NewInvoiceForm;
