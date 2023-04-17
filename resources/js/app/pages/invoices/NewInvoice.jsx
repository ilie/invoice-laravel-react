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
    const submitFormHandler = async (data) => {
        store(data);
        navigate("/invoices");
    };

    return (
        <>
            <NewResourceHeader title="Create new invoice" />
            <NewInvoiceForm
                onSubmitForm={submitFormHandler}
                success={success}
                error={error}
            />
        </>
    );
};

export default NewInvoice;
