import React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
const Invoices = () => {
    useDocumentTitle("Invoices | Billing");
    return (
        <div className="container">
            <h1>Invoices</h1>
        </div>
    );
};

export default Invoices;
