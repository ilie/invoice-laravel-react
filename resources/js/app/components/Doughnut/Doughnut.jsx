import React from "react";
import classes from "./Doughnut.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Doughnut as DoughnutJS } from "react-chartjs-2";

const Doughnut = (props) => {
    const data = {
        labels: [
            "Draft: " + props.data.invoices.draft,
            "Pendig payment: " + props.data.invoices.unpaid,
            "Paid: " + props.data.invoices.paid,
        ],
        datasets: [
            {
                label: "# of Invoices",
                data: [
                    props.data.invoices.unpaid,
                    props.data.invoices.draft,
                    props.data.invoices.paid,
                ],
                backgroundColor: ["#AD85FF", "#ED6804", "#0055BC"],
                borderColor: ["#AD85FF", "#ED6804", "#0055BC"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={classes.doughnut}>
            <h6 className={classes.doughnut__title}>
                Total Invoices: {props.data.invoices.total}
            </h6>

            <DoughnutJS data={data} />
        </div>
    );
};

export default Doughnut;
