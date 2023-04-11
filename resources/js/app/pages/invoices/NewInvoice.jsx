import React from "react";
import { useNavigate } from "react-router-dom";
import NewInvoiceForm from "../../components/Invoices/NewInvoiceForm";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useCreateResource from "../../hooks/useCreateResource";
import NewResourceHeader from "../../components/ui/NewResourceHeader/NewResourceHeader";

const NewInvoice = () => {
    useDocumentTitle("New Invoice | Billing");
    const navigate = useNavigate();
    const { store, isLoading, success, error } = useCreateResource("/invoices");
    const createClientHandler = async (data) => {
        store(data);

        if (error) {
            toast.error(error.message);
            return;
        }
        navigate("/invoices");
    };
    return (
        <>
            <NewResourceHeader title="Create new invoice" />
            <NewInvoiceForm
                isLoading={isLoading}
                submitForm={createClientHandler}
            />
        </>
    );
};

export default NewInvoice;
