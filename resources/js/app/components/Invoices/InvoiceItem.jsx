import React from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./InvoiceItem.module.css";
import { humanDateFormat } from "../utils/formatters";
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
    return (
        <tr className={classes.item}>
            <td className={classes.item__number}>
                <Link to={`${props.id}/edit`}>{props.number}</Link>
            </td>
            <td className={classes.item__date}>{props.createdAt}</td>
            <td className={classes.item__client}>{props.client}</td>
            <td className={classes.item__status}>{props.status}</td>
            <td className={classes.item__irpf}>{props.irpf}</td>
            <td className={classes.item__vat}>(props.vat)</td>
            <td className={classes.item__options}>
                <Options options={invoiceOptions} />
            </td>
        </tr>
    );
};

export default InvoiceItem;
