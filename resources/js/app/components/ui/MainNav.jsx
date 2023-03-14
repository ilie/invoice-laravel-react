import React from "react";
import "./MainNav.css";
import { NavLink } from "react-router-dom";

const MainNav = () => {
    return (
        <nav className="container main-nav">
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/clients">Clients</NavLink>
                </li>
                <li>
                    <NavLink to="/invoices">Invoices</NavLink>
                </li>
                <li>
                    <NavLink to="/items">Items</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MainNav;
