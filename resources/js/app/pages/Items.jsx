import React from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Items = () => {
    useDocumentTitle("Items | Billing");
    return (
        <div className="container">
            <h1>Items</h1>
        </div>
    );
};

export default Items;
