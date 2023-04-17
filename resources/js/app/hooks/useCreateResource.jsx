import axios from "axios";
import { useState } from "react";
const useCreateResource = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const store = async (data) => {
        setIsLoading(true);
        try {
            await axios.post(url, data, {
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json",
                },
            });
            setSuccess(true);
            setIsLoading(false);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                const validationErrors = err.response.data.errors.map(
                    (error) => error.detail
                );
                setError(validationErrors.join(", "));
            } else {
                setError(err.message);
            }
            setIsLoading(false);
        }
    };

    return { store, isLoading, success, error };
};

export default useCreateResource;
