import React from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../../components/ui/Loader/Loader";
import useUpdateResource from "../../hooks/updateResource";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useGetResourceByID from "../../hooks/useGetResourceByID";
import EditItemForm from "../../components/Items/EditItemForm";

const EditItem = () => {
    const { id } = useParams();
    const {
        resource: item,
        loading: loadingItem,
        error: itemError,
    } = useGetResourceByID("/items", id);
    const [updateItem, updatedItem, updatingError] = useUpdateResource();
    const pageTitle = loadingItem ? "Billing" : `${item.name} | Edit`;
    useDocumentTitle(pageTitle);

    const onItemSaveHandler = async (data) => {
        await updateItem(`/items/${id}`, data);
        if (updatingError) {
            toast.error(updatingError.message);
            return;
        }
        toast.success("Item updated successfully");
    };

    if (loadingItem) {
        return (
            <>
                <h2>Edit Client</h2>
                <Loader />
            </>
        );
    }
    if (itemError) {
        return <p>{error}</p>;
    }

    return (
        <>
            <h2>Edit item</h2>
            <div className="m-4-auto">
                <EditItemForm item={item} onSubmitForm={onItemSaveHandler} />
            </div>
        </>
    );
};

export default EditItem;
