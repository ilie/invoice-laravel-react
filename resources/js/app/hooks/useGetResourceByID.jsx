import { useState, useEffect } from "react";
import { deserialize } from "jsonapi-fractal";
import axios from "axios";

const useGetResourceByID = (url, id, deserialized = true) => {
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const response = await axios.get(`${url}/${id}`);
                setResource(
                    deserialized ? deserialize(response.data) : response.data
                );
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchResource();
    }, [url, id]);

    return { resource, loading, error };
};

export default useGetResourceByID;
