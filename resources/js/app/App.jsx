import "./app.css";
import "./Table.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";
import MainNav from "./components/ui/MainNav";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <>
            <Header />
            <MainNav />
            <main>
                <ToastContainer />
                <Outlet />
            </main>
        </>
    );
};

export default App;
