import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const ItemDetails = () => {
    return (
        <div className="container">
            <div className="two-columns">
                <aside>
                    <nav className="aside-nav">
                        <ul>
                            <li className="aside-nav__li">
                                <NavLink to="edit">Edit</NavLink>
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

export default ItemDetails;
