import { useState } from "react";

function useSort(sortFields) {
    const [currentSortField, setCurrentSortField] = useState(null);
    const [sortDirections, setSortDirections] = useState(
        sortFields.map(() => null)
    );

    function toggleSortDirection(index) {
        const newSortDirections = [...sortDirections];
        newSortDirections[index] =
            newSortDirections[index] === "asc" ? "desc" : "asc";
        setSortDirections(newSortDirections);
    }

    function sortFieldHandler(sortField) {
        const index = sortFields.findIndex((field) => field === sortField);
        if (sortField === currentSortField) {
            toggleSortDirection(index);
        } else {
            setCurrentSortField(sortField);
            const newSortDirections = [...sortDirections];
            newSortDirections[index] = "asc";
            setSortDirections(newSortDirections);
        }
    }

    const sortedFields = sortFields.map((field, index) => {
        if (field === currentSortField) {
            return `${sortDirections[index] === "asc" ? "-" : ""}${field}`;
        } else {
            return sortDirections[index] ? `-${field}` : field;
        }
    });

    return { sortFieldHandler, sortedFields };
}

export default useSort;
