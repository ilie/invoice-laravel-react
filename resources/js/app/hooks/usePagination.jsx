import { useState, useEffect } from "react";
import axios from "axios";

function usePagination(url, sortFields) {
    const [data, setData] = useState([]);
    const [links, setLinks] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const perPage = 20;

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            try {
                const response = await axios.get(url, {
                    params: {
                        sort: sortFields,
                        "page[size]": perPage,
                        "page[number]": currentPage,
                    },
                });
                setData(response.data);
                setLinks(response.data.links);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [currentPage, JSON.stringify(sortFields)]);

    function goToPage(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return { data, links, currentPage, isLoading, error, goToPage };
}

export default usePagination;
