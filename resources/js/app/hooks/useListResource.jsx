import axios from "axios";
import { useState, useEffect } from "react";

const useListResource = (resourceName) => {
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResourceList = async () => {
            try {
                const response = await axios.get(`/${resourceName}/list`);
                setList(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchResourceList();
    }, [resourceName]);

    return { list, error, isLoading };
};

export default useListResource;
