import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import useUpdateResource from "../../hooks/updateResource";

const ClientDetails = () => {
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
