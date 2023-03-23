import React from "react";
import { useParams } from "react-router-dom";
import useSort from "../../hooks/useSort";
import usePagination from "../../hooks/usePagination";
import Loader from "../../components/ui/Loader/Loader";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useGetResourceByID from "../../hooks/useGetResourceByID";
import Pagination from "../../components/ui/Pagination/Pagination";
import InvoicesTable from "../../components/Invoices/InvoicesTable";

const ClientInvoices = () => {
    const { id: clientId } = useParams();

    // Get Client
    const {
        resource: client,
        loading: loadingClient,
        error: errorFetchingClient,
    } = useGetResourceByID("/clients", clientId);
    const pageTitle = loadingClient
        ? "Loading..."
        : `${client.name} | Invoices`;
    useDocumentTitle(pageTitle);
    const [sortFields, sortFieldHandler] = useSort(["id"]);
    // Get client Invoices
    const {
        data: invoices,
        links,
        currentPage,
        isLoading: loadingInvoices,
        error: errorLoadingInvoices,
        goToPage,
    } = usePagination(`/invoices?filter[client.id]=${clientId}`, sortFields);

    const prevPageHandler = () => currentPage > 1 && goToPage(currentPage - 1);
    const nextPageHandler = () =>
        currentPage < invoices.meta.last_page && goToPage(currentPage + 1);

    return (
        <>
            <h2>{loadingClient ? "Loading..." : `Invoices ${client.name}`}</h2>
            {!loadingInvoices && !errorLoadingInvoices && invoices ? (
                <>
                    <InvoicesTable
                        sortByNumber={() => sortFieldHandler("id")}
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
        </>
    );
};

export default ClientInvoices;
