import { useNavigate } from "react-router-dom";
import useCreateResource from "../../hooks/useCreateResource";
import NewClientForm from "../../components/Clients/NewClientForm";
import NewResourceHeader from "../../components/ui/NewResourceHeader/NewResourceHeader";
import { toast } from "react-toastify";
const NewClient = () => {
    const navigate = useNavigate();
    const { store, isLoading, success, error } = useCreateResource("/clients");
    const createClientHandler = async (data) => {
        store(data);

        if (error) {
            toast.error(error.message);
            return;
        }

        navigate("/clients", {
            state: {
                ok: true,
                message: "Client created successfuly",
            },
        });
    };
    return (
        <>
            <NewResourceHeader title="Create new client" />
            <NewClientForm
                isLoading={isLoading}
                submitForm={createClientHandler}
            />
        </>
    );
};

export default NewClient;
