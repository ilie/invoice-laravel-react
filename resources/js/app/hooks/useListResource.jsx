import axios from "axios";
import { useState, useEffect, useMemo } from "react";

const useListResource = (resourceName) => {
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const memoizedResourceName = useMemo(() => resourceName, [resourceName]);
    useEffect(() => {
        const fetchResourceList = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/${resourceName}/list`);
                setList(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchResourceList(memoizedResourceName);
    }, []);

    return { list, error, isLoading };
};

export default useListResource;
