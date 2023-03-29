import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    calculateVat,
    calculateIrpf,
    calculateTotalAmount,
} from "../utils/calculations";
import {
    formatCurency,
    formatDateToString,
    snakeToSentence,
} from "../utils/formatters";
import Options from "../ui/Options/Options";

const InvoiceItem = (props) => {
    const [invoiceStatus, setInvoiceStatus] = useState(props.status);
    const navigate = useNavigate();
    const editInvoiceHandler = () => {
        navigate(`/invoices/${props.id}/edit`);
    };

    const invoiceOptions = [
        { text: "Edit", click: editInvoiceHandler },
        { text: "Generate PDF", click: editInvoiceHandler },
        { text: "Mark as draft", click: editInvoiceHandler },
        { text: "Mark as pending payment", click: editInvoiceHandler },
        { text: "Mark as paid", click: editInvoiceHandler },
    ];

    const vatValue = calculateVat(props.amount, props.vat);
    const irpfValue = calculateIrpf(props.amount, props.irpf);
    const totalAfterTaxes = calculateTotalAmount(
        props.amount,
        irpfValue,
        vatValue
    );

    return (
        <tr className="item">
            <td className="item__number">
                <Link to={`${props.number}/edit`}>{props.number}</Link>
            </td>
            <td className="item__date">
                {formatDateToString(props.createdAt)}
            </td>
            <td className="item__client">{props.clientName}</td>
            <td className="item__status">
                <span className={`status ${invoiceStatus}`}>
                    {snakeToSentence(invoiceStatus)}
                </span>
            </td>
            <td className="item__base-amount">{formatCurency(props.amount)}</td>
            <td className="item__irpf">{formatCurency(irpfValue)}</td>
            <td className="item__vat">{formatCurency(vatValue)}</td>
            <td className="item__amount_afer_taxes">
                {formatCurency(totalAfterTaxes)}
            </td>
            <td className="item__options">
                <Options options={invoiceOptions} />
            </td>
        </tr>
    );
};

export default InvoiceItem;
