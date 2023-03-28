import React, { useEffect } from "react";
import { toast } from "react-toastify";
import useSort from "../../hooks/useSort";
import { Link, useLocation } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import Loader from "../../components/ui/Loader/Loader";
import Button from "../../components/ui/Button/Button";
import ItemsTable from "../../components/Items/ItemsTable";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Pagination from "../../components/ui/Pagination/Pagination";

const Items = () => {
    useDocumentTitle("Items | Billing");

    const defaultSortFields = ["name"];
    const [sortFields, sortFieldHandler] = useSort(defaultSortFields);
    const { data, links, currentPage, isLoading, error, goToPage } =
        usePagination("/items", sortFields);
    const prevPageHandler = () => currentPage > 1 && goToPage(currentPage - 1);
    const nextPageHandler = () =>
        currentPage < data.meta.last_page && goToPage(currentPage + 1);

    const { state } = useLocation();
    useEffect(() => {
        if (!!state && state.message !== "") {
            toast.success(state.message);
        }
    }, [location]);

    return (
        <div className="container">
            <div className="page_title">
                <h1>Items</h1>
                <Link to="new">
                    <Button btnType="primary">+ Add item</Button>
                </Link>
            </div>
            {!isLoading && !error && data ? (
                <>
                    <ItemsTable
                        sortByName={() => sortFieldHandler("name")}
                        sortByDescription={() =>
                            sortFieldHandler("description")
                        }
                        sortByPrice={() => sortFieldHandler("price")}
                        sortByCreatedAt={() => sortFieldHandler("created_at")}
                        data={data}
                    />
                    <Pagination
                        currentPage={currentPage}
                        prevLink={prevPageHandler}
                        nextLink={nextPageHandler}
                        from={data.meta.from}
                        lastPage={data.meta.last_page}
                        perPage={data.meta.per_page}
                        to={data.meta.to}
                        total={data.meta.total}
                        links={links}
                    />
                </>
            ) : isLoading ? (
                <Loader />
            ) : (
                <div>{error.message}</div>
            )}
        </div>
    );
};

export default Items;
