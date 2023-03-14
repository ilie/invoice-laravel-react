import React, { useState } from "react";
import InvoiceItem from "./InvoiceItem";

const InvoicesTable = (props) => {
    const [invoices, setInvoices] = useState(props.data.data);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="clickable" onClick={props.sortByNumber}>
                        Number
                    </th>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Irpf</th>
                    <th>Vat</th>
                    <th>Amount</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice) => (

                    <InvoiceItem
                        key={invoice.id}
                        number={invoice.id}
                        date={invoice.attributes.createdAt}
                        clientName={invoice.relationships.client.data.attributes.name}
                        clientId={invoice.relationships.client.data.id}
                        status={invoice.attributes.status}
                        irpf={invoice.attributes.irpf}
                        vat={invoice.attributes.created_at}
                        baseAmount={invoice.attributes.amount}
                        totalAmount={}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default InvoicesTable;
