import React, { useState } from "react";
import Item from "./Item";
import { toast } from "react-toastify";
import ModalDelete from "../ui/ModalDelete";
import useDeleteResource from "../../hooks/useDeleteResource";

const ItemsTable = (props) => {
    const [items, setItems] = useState(props.data.data);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteResource, error] = useDeleteResource();

    const removeItemHandler = (id) => {
        setShowModal(true);
        const toDelete = items.find((item) => item.id === id);
        setItemToDelete(toDelete);
    };

    const confirmDeleteItemHandler = () => {
        if (itemToDelete) {
            deleteResource(`/items/${itemToDelete.id}`);
            if (error) {
                toast.error(`Error removing item: ${error}`);
                return;
            }
            const newItems = items.filter(
                (item) => item.id !== itemToDelete.id
            );
            setItems(newItems);
            toast.success("Client removed successfuly");
            setShowModal(false);
        }
    };

    const closeDeleteModalHandler = () => {
        setShowModal(false);
        setItemToDelete(null);
    };

    return (
        <>
            <ModalDelete
                isOpen={showModal}
                onClose={closeDeleteModalHandler}
                onConfirm={confirmDeleteItemHandler}
                resourceName={itemToDelete ? itemToDelete.attributes.name : ""}
            />
            <table className="table">
                <thead>
                    <tr>
                        <th className="clickable" onClick={props.sortByName}>
                            Name
                        </th>
                        <th
                            className="clickable"
                            onClick={props.sortByDescription}
                        >
                            Description
                        </th>
                        <th className="clickable" onClick={props.sortByPrice}>
                            Price
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
                    {items.map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={item.attributes.name}
                            description={item.attributes.description}
                            price={item.attributes.price}
                            createdAt={item.attributes.created_at}
                            removeItem={removeItemHandler}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ItemsTable;
