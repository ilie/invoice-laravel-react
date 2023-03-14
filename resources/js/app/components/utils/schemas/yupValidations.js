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
