import React from "react";
import { Link } from "react-router-dom";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";
import Loader from "../../components/ui/Loader/Loader";
import Button from "../../components/ui/Button/Button";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Pagination from "../../components/ui/Pagination/Pagination";
import InvoicesTable from "../../components/Invoices/InvoicesTable";
const Invoices = () => {
    useDocumentTitle("Invoices | Billing");
    const [sortFields, sortFieldHandler] = useSort(["id"]);
    const {
        data: invoices,
        links,
        currentPage,
        isLoading: loadingInvoices,
        error: errorLoadingInvoices,
        goToPage,
    } = usePagination(`/invoices`, sortFields);
    const prevPageHandler = () => currentPage > 1 && goToPage(currentPage - 1);
    const nextPageHandler = () =>
        currentPage < invoices.meta.last_page && goToPage(currentPage + 1);
    return (
        <div className="container">
            <div className="page_title">
                <h1>Invoices</h1>
                <Link to="new">
                    <Button btnType="primary">+ Add invoice</Button>
                </Link>
            </div>
            {!loadingInvoices && !errorLoadingInvoices && invoices ? (
                <>
                    <InvoicesTable
                        sortByNumber={() => sortFieldHandler("id")}
                        sortByDate={() => sortFieldHandler("created_at")}
                        sortByStatus={() => sortFieldHandler("status")}
                        invoices={invoices.data}
                    />
                    <Pagination
                        currentPage={currentPage}
                        prevLink={prevPageHandler}
                        nextLink={nextPageHandler}
                        from={invoices.meta.from}
                        lastPage={invoices.meta.last_page}
                        perPage={invoices.meta.per_page}
                        to={invoices.meta.to}
                        total={invoices.meta.total}
                        links={links}
                    />
                </>
            ) : loadingInvoices ? (
                <Loader />
            ) : (
                <div>{errorLoadingInvoices.message}</div>
            )}
        </div>
    );
};

export default Invoices;
