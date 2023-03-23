import { useState } from "react";

function useSort(defaultSortFields) {
    const [sortFields, setSortFields] = useState(defaultSortFields);
    const sortFieldHandler = (newSortFields) => {
        const isSameSortFields =
            JSON.stringify(newSortFields) === JSON.stringify(sortFields);
        setSortFields(isSameSortFields ? `-${newSortFields}` : newSortFields);
    };
    return [sortFields, sortFieldHandler];
}

export default useSort;
