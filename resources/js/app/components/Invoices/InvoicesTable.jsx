import React from "react";
import InvoiceItem from "./InvoiceItem";

const InvoicesTable = (props) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="clickable" onClick={props.sortByNumber}>
                        Number
                    </th>
                    <th>Date</th>
                    <th>Client</th>
                    <th className="th_status">Status</th>
                    <th className="th__base-amount">Base Amount</th>
                    <th>Irpf</th>
                    <th>Vat</th>
                    <th>Total Amount</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {props.invoices.map((invoice) => (
                    <InvoiceItem
                        key={invoice.id}
                        number={invoice.id}
                        createdAt={invoice.attributes.created_at}
                        clientName={
                            invoice.relationships.client.data.attributes.name
                        }
                        clientId={invoice.relationships.client.data.id}
                        status={invoice.attributes.status}
                        irpf={invoice.attributes.irpf}
                        vat={invoice.attributes.vat}
                        amount={invoice.attributes.amount}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default InvoicesTable;
