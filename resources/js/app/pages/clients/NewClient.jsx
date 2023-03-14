import NewResourceHeader from "../../components/ui/NewResourceHeader/NewResourceHeader";
import NewClientForm from "../../components/Clients/NewClientForm";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const NewClient = () => {
    const navigate = useNavigate();
    const createClientHandler = async (data) => {
        try {
            await axios.post("/clients", data, {
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json",
                },
            });
            navigate("/clients", {
                state: {
                    ok: true,
                    message: "Client successfuly creates",
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <NewResourceHeader title="Create new client" />
            <NewClientForm isLoading submitForm={createClientHandler} />
        </>
    );
};

export default NewClient;
