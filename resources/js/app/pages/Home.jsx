import axios from "axios";
import { deserialize } from "jsonapi-fractal";
import Chart from "../components/Chart/Chart";
import React, { useState, useEffect } from "react";
import Separator from "../components/ui/Separator";
import Loader from "../components/ui/Loader/Loader";
import Doughnut from "../components/Doughnut/Doughnut";
import useDocumentTitle from "../hooks/useDocumentTitle";
import StatsCard from "../components/StatsCard/StatsCard";
import { formatNumberToSuffix as formatNumber } from "../components/utils/formatters";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [statsData, setStatsData] = useState();

    useDocumentTitle("Home | Billing");

    useEffect(() => {
        getStats();
    }, []);

    async function getStats() {
        setIsLoading(true);
        const response = await axios.get("/stats");
        setStatsData(deserialize(response.data));
        setIsLoading(false);
    }

    return (
        <div className="container">
            <h1>Overview</h1>
            <Separator />
            {!isLoading && statsData ? (
                <>
                    <div className="row">
                        <Chart data={statsData} />
                        <Doughnut data={statsData} />
                    </div>
                    <div className="row margin-top-3">
                        <StatsCard
                            title="Customers"
                            content={formatNumber(statsData.customers.total)}
                        />
                        <StatsCard
                            title="Invoices"
                            content={formatNumber(statsData.invoices.total)}
                        />
                        <StatsCard
                            title="Items"
                            content={formatNumber(statsData.items.total)}
                        />
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Home;
