import React from "react";
import { useParams } from "react-router-dom";
import useGetResourceByID from "../../hooks/useGetResourceByID";
import Loader from "../../components/ui/Loader/Loader";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import PDFGenerator from "../../components/Invoices/PDFGenerator";

const InvoicePDF = () => {
    const { id } = useParams();
    const {
        resource: invoice,
        loading: loadingInvoice,
        error: errorInvoice,
    } = useGetResourceByID("/invoices", id, false);

    useDocumentTitle(`PDF ${id}`);

    if (loadingInvoice) {
        return <Loader />;
    }

    if (errorInvoice) {
        return (
            <div className="container">
                <p className="main-error-message">{errorInvoice}</p>
            </div>
        );
    }

    return <PDFGenerator invoice={invoice} />;
};

export default InvoicePDF;
