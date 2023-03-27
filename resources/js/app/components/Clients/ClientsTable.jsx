import React, { useState } from "react";
import ClientItem from "./ClientItem";
import useDeleteResource from "../../hooks/useDeleteResource";
import { toast } from "react-toastify";
import ModalDelete from "../ui/ModalDelete";

const ClientsTable = (props) => {
    const [clients, setClients] = useState(props.data.data);
    const [clientToDelete, setClientToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteResource, error] = useDeleteResource();

    const removeClientHandler = (id) => {
        setShowModal(true);
        const toDelete = clients.find((client) => client.id === id);
        setClientToDelete(toDelete);
        console.log(toDelete);
    };

    const confirmDeleteClientHandler = () => {
        if (clientToDelete) {
            deleteResource(`/clients/${clientToDelete.id}`);
            if (error) {
                toast.error(`Error removing client: ${error}`);
                return;
            }
            const newClients = clients.filter(
                (client) => client.id !== clientToDelete.id
            );
            setClients(newClients);
            toast.success("Client removed successfuly");
            setShowModal(false);
        }
    };

    const closeDeleteModalHandler = () => {
        setShowModal(false);
        setClientToDelete(null);
    };

    return (
        <>
            <ModalDelete
                isOpen={showModal}
                onClose={closeDeleteModalHandler}
                onConfirm={confirmDeleteClientHandler}
                resourceName={
                    clientToDelete ? clientToDelete.attributes.name : ""
                }
            />
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
                        <th
                            className="clickable"
                            onClick={props.sortByContactName}
                        >
                            Contact name
                        </th>
                        <th
                            className="clickable"
                            onClick={props.sortByContactPhone}
                        >
                            Contact phone
                        </th>
                        <th
                            className="clickable"
                            onClick={props.sortByCreatedAt}
                        >
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
                            removeClient={removeClientHandler}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ClientsTable;
