import React from "react";
import jsPDFInvoiceTemplate from "jspdf-invoice-template";

const PDFGenerator = ({ invoice }) => {
    // console.log(invoice.data);
    const outputTypes = jsPDFInvoiceTemplate.OutputType;
    return outputTypes;
};

export default PDFGenerator;
