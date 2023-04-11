import * as yup from "yup";
import axios from "axios";

const uniqueCif = function (value) {
    return new Promise((resolve) => {
        axios
            .get("/clients", { params: { "filter[cif]": value } })
            .then((res) => {
                res.data.meta.total === 0 ? resolve(true) : resolve(false);
            });
    });
};

export const newClientSchema = yup.object().shape({
    name: yup.string().required("Company name is required"),
    cif: yup.string().required("CIF is required"),
    // .test("Unique CIF", "This number already exists", uniqueCif),
    address: yup.string().required("Address is required"),
    phone: yup
        .string()
        .required("Phome is required")
        .min(15, "Phone number is too short"),
    email: yup
        .string()
        .required("Email is required")
        .email("Please, provide a valid email address"),
    contact_name: yup.string().required("Contact name is required"),
    contact_phone: yup
        .string()
        .required("Contact phone is required")
        .min(15, "Contact phone number is too short"),
});

export const newItemSchema = yup.object().shape({
    name: yup.string().required("Item name is required"),
    description: yup
        .string()
        .required("Please enter a description")
        .min(10, "Description is too short"),
    price: yup.string().required("Price is required"),
});

export const newInvoiceSchema = yup.object().shape({
    client_id: yup
        .string()
        .required("Please pick a client from the dropdown list"),
    status: yup
        .string()
        .oneOf(
            ["draft", "pending_payment", "payd"],
            "Selected value is incorrect"
        )
        .required("Please pick a status form the options below"),
    items: yup.array().of(
        yup.object().shape({
            item_id: yup
                .string()
                .required("Please select an item from the list"),
            date: yup.date().required("Date is required"),
            quantity: yup
                .number()
                .positive("Quntity must be a positive number")
                .required("Please provide a quantity"),
        })
    ),
});
