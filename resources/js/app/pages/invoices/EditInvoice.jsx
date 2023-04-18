import React from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/ui/Loader/Loader";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useUpdateResource from "../../hooks/useUpdateResource";
import useGetResourceByID from "../../hooks/useGetResourceByID";
import EditInvoiceForm from "../../components/Invoices/EditInvoiceForm";
import NewResourceHeader from "../../components/ui/NewResourceHeader/NewResourceHeader";

const EditInvoice = () => {
    useDocumentTitle("Edit Invoice | Billing");
    const { id } = useParams();
    const navigate = useNavigate();
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
        navigate("/invoices");
        toast.success("Invoice updated successfully");
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
