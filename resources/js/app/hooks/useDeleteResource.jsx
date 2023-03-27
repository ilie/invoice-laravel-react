import { useState } from "react";
import axios from "axios";
const useDeleteResource = () => {
    const [error, setError] = useState(null);

    const deleteResource = async (url) => {
        try {
            await axios.delete(url);
        } catch (error) {
            setError(error.message);
        }
    };

    return [deleteResource, error];
};

export default useDeleteResource;
