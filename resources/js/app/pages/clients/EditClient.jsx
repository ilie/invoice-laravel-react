import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../../components/ui/Loader/Loader";
import useUpdateResource from "../../hooks/updateResource";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useGetResourceByID from "../../hooks/useGetResourceByID";
import EditClientForm from "../../components/Clients/EditClientForm";

const EditClient = () => {
    const { id } = useParams();
    const { resource, loading, error } = useGetResourceByID("/clients", id);

    const [updateResource, updatedResource, updatingError] =
        useUpdateResource();
    const pageTitle = loading ? "Billing" : `${resource.name} | Edit`;
    useDocumentTitle(pageTitle);

    const onClientSaveHandler = async (data) => {
        await updateResource(`/clients/${id}`, data);
        if (updatingError) {
            toast.error(updatingError.message);
            return;
        }
        toast.success("Client updated successfully");
    };

    if (loading) {
        return (
            <>
                <h2>Edit Client</h2>
                <Loader />
            </>
        );
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <h2>Edit Client</h2>
            <div className="m-4-auto">
                <EditClientForm
                    client={resource}
                    submitForm={onClientSaveHandler}
                />
            </div>
        </>
    );
};

export default EditClient;
