import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    calculateVat,
    calculateIrpf,
    calculateTotalAmount,
} from "../utils/calculations";
import { formatCurency, formatDateToString } from "../utils/formatters";
import Options from "../ui/Options/Options";

const InvoiceItem = (props) => {
    const navigate = useNavigate();
    const editInvoiceHandler = () => {
        navigate(`/invoices/${props.id}/edit`);
    };
    const removeInvoiceHandler = () => {
        console.log("Removing Invoice");
    };
    const invoiceOptions = [
        { text: "Edit", click: editInvoiceHandler },
        { text: "Remove", click: removeInvoiceHandler },
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
            <td className="item__status">{props.status}</td>
            <td className="item__vat">{formatCurency(props.amount)}</td>
            <td className="item__irpf">{formatCurency(irpfValue)}</td>
            <td className="item__base-amount">{formatCurency(vatValue)}</td>
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
