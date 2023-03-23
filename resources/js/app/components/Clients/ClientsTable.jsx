import React, { useState } from "react";
import ClientItem from "./ClientItem";
const ClientsTable = (props) => {
    const [clients, setClients] = useState(props.data.data);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="clickable" onClick={props.sortByName}>
                        Name
                    </th>
                    <th className="clickable" onClick={props.sortByCif}>
                        Cif
                    </th>
                    <th className="clickable" onClick={props.sortByEmail}>
                        Email
                    </th>
                    <th className="clickable" onClick={props.sortByContactName}>
                        Contact name
                    </th>
                    <th
                        className="clickable"
                        onClick={props.sortByContactPhone}
                    >
                        Contact phone
                    </th>
                    <th className="clickable" onClick={props.sortByCreatedAt}>
                        Created at
                    </th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client) => (
                    <ClientItem
                        key={client.id}
                        id={client.id}
                        name={client.attributes.name}
                        cif={client.attributes.cif}
                        email={client.attributes.email}
                        contactName={client.attributes.contact_name}
                        contactPhone={client.attributes.contact_phone}
                        createdAt={client.attributes.created_at}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ClientsTable;
