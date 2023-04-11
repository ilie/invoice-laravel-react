import useSort from "../../hooks/useSort";
import { Link } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import Loader from "../../components/ui/Loader/Loader";
import Button from "../../components/ui/Button/Button";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import ClientsTable from "../../components/Clients/ClientsTable";
import Pagination from "../../components/ui/Pagination/Pagination";

const Clients = () => {
    useDocumentTitle("Clients | Billing");
    const defaultSortFields = ["name", "-created_at"];
    const [sortFields, sortFieldHandler] = useSort(defaultSortFields);
    const { data, links, currentPage, isLoading, error, goToPage } =
        usePagination("/clients", sortFields);
    const prevPageHandler = () => currentPage > 1 && goToPage(currentPage - 1);
    const nextPageHandler = () =>
        currentPage < data.meta.last_page && goToPage(currentPage + 1);

    return (
        <div className="container">
            <div className="page_title">
                <h1>Clients</h1>
                <Link to="new">
                    <Button btnType="primary">+ Add client</Button>
                </Link>
            </div>
            {!isLoading && !error && data ? (
                <>
                    <ClientsTable
                        sortByName={() => sortFieldHandler("name")}
                        sortByCif={() => sortFieldHandler("cif")}
                        sortByEmail={() => sortFieldHandler("email")}
                        sortByContactName={() =>
                            sortFieldHandler("contact_name")
                        }
                        sortByContactPhone={() =>
                            sortFieldHandler("contact_phone")
                        }
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

export default Clients;
