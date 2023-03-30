import "./bootstrap";
import "./index.css";
import React from "react";
import axios from "axios";
import App from "./app/App";
import Home from "./app/pages/Home";
import ReactDOM from "react-dom/client";
import Items from "./app/pages/items/Items";
import NewItem from "./app/pages/items/NewItem";
import EditItem from "./app/pages/items/EditItem";
import Clients from "./app/pages/clients/Clients";
import Invoices from "./app/pages/invoices/Invoices";
import NewClient from "./app/pages/clients/NewClient";
import EditClient from "./app/pages/clients/EditClient";
import ItemDetails from "./app/pages/items/ItemDetails";
import InvoicePDF from "./app/pages/invoices/InvoicePDF";
import ClientDetails from "./app/pages/clients/ClientDetails";
import ClientInvoices from "./app/pages/clients/ClientInvoices";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

axios.defaults.baseURL = "https://billing.local.flo-dev.com/api";
axios.defaults.headers.common["Accept"] = "application/vnd.api+json";
axios.defaults.headers.common["Content-Type"] = "application/vnd.api+json";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/clients", element: <Clients /> },
            {
                path: "/clients/:id",
                element: <ClientDetails />,
                children: [
                    { path: "edit", element: <EditClient /> },
                    { path: "invoices", element: <ClientInvoices /> },
                ],
            },
            { path: "/invoices", element: <Invoices /> },
            { path: "/items", element: <Items /> },
            {
                path: "/items/:id",
                element: <ItemDetails />,
                children: [{ path: "edit", element: <EditItem /> }],
            },
        ],
    },
    { path: "/clients/new", element: <NewClient /> },
    { path: "/items/new", element: <NewItem /> },
    { path: "/invoices/:id/pdf", element: <InvoicePDF /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // {/* </React.StrictMode> */}
);
