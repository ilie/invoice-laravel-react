import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta, helpers] = useField(props);
    const handleDateChange = (date) => {
        setStartDate(date);
        helpers.setValue(date); // update form field value
    };

    return (
        <DatePicker
            {...field}
            {...props}
            className="date item_date"
            dateFormat="dd/MM/yyyy"
            selected={(field.value && new Date(field.value)) || null}
            onChange={(date) => setFieldValue(field.name, date)}
        />
    );
};

export default DatePickerField;
