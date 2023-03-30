import { useState } from "react";
import axios from "axios";
import { deserialize } from "jsonapi-fractal";

function useUpdateResource() {
    const [error, setError] = useState(null);
    const [updatedResource, setUpdatedResource] = useState(null);

    const updateResource = async (url, data) => {
        try {
            const response = await axios.put(url, data, {
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json",
                },
            });
            setUpdatedResource(deserialize(response.data));
        } catch (error) {
            setError(error);
        }
    };

    return [updateResource, updatedResource, error];
}

export default useUpdateResource;
