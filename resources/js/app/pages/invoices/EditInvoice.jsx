import React from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../../components/ui/Loader/Loader";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useUpdateResource from "../../hooks/useUpdateResource";
import useGetResourceByID from "../../hooks/useGetResourceByID";
import EditInvoiceForm from "../../components/Invoices/EditInvoiceForm";
import NewResourceHeader from "../../components/ui/NewResourceHeader/NewResourceHeader";

const EditInvoice = () => {
    useDocumentTitle("New Invoice | Billing");
    const { id } = useParams();
    const { resource, loading, error } = useGetResourceByID(
        "/invoices",
        id,
        false
    );
    const [updateResource, updatedResource, updatingError] =
        useUpdateResource();
    const onSubmitFormHandler = async (data) => {
        await updateResource(`/invoices/${id}`, data);
        if (updatingError) {
            toast.error(updatingError.message);
            return;
        }
        toast.success("Client updated successfully");
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="container">
                    <p className="main-error-message">{error}</p>
                </div>
            ) : (
                <>
                    <NewResourceHeader title="Edit invoice" />
                    <EditInvoiceForm
                        invoice={resource}
                        submitForm={onSubmitFormHandler}
                    />
                </>
            )}
        </>
    );
};

export default EditInvoice;
