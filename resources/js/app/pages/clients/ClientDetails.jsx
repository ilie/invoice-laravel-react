import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink, useParams } from "react-router-dom";
import useUpdateResource from "../../hooks/updateResource";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useGetResourceByID from "../../hooks/useGetResourceByID";

const ClientDetails = () => {
    const { id } = useParams();
    const { resource, loading, error } = useGetResourceByID("/clients", id);
    const [updateResource, updatedResource, updatingError] =
        useUpdateResource();

    const onClientSaveHandler = async (data) => {
        await updateResource(`/clients/${id}`, data);
        if (updatingError) {
            toast.error(updatingError.message);
            return;
        }
        navigate("/clients", {
            state: { type: "success", message: "Client updated successfully!" },
        });
    };

    return (
        <div className="container">
            <div className="two-columns">
                <aside className="aside">
                    <nav className="aside-nav">
                        <ul>
                            <li className="aside-nav__li">
                                <NavLink to="edit"> Edit</NavLink>
                            </li>
                            <li className="aside-nav__li">
                                <NavLink to="invoices">Invoices</NavLink>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ClientDetails;
