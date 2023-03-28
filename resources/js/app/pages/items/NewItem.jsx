import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NewItemForm from "../../components/Items/NewItemForm";
import NewResourceHeader from "../../components/ui/NewResourceHeader/NewResourceHeader";
import useCreateResource from "../../hooks/useCreateResource";

const NewItem = () => {
    const navigate = useNavigate();
    const { store, isLoading, success, error } = useCreateResource("/items");

    const createItemHandler = (data) => {
        store(data);
        if (error) {
            toast.error("Item cannot be deleted");
            return;
        }

        navigate("/items", {
            state: {
                ok: true,
                message: "Item created successfuly",
            },
        });
    };
    return (
        <>
            <NewResourceHeader title="Create new item" />
            <NewItemForm isLoading={isLoading} submitForm={createItemHandler} />
        </>
    );
};

export default NewItem;
