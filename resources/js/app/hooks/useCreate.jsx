import axios from "axios";
import { useState } from "react";
const useCreate = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const create = async (clientData) => {
        setIsLoading(true);
        try {
            await axios.post(url, clientData, {
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json",
                },
            });
            setSuccess(true);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return { create, isLoading, success, error };
};

export default useCreate;
