import React from "react";
import classes from "./Chart.module.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const Chart = (props) => {
    const payments = props.data.invoices.paymentsByYear;

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: "Payments",
            },
        },
        scales: {
            y: {
                type: "linear",
                display: true,
                position: "left",
                grid: {
                    drawOnChartArea: false,
                },
            },

            y1: {
                type: "linear",
                display: true,
                position: "left",
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Current Year",
                data: payments.currentYear,
                borderColor: "rgb(173, 133, 255)",
                backgroundColor: "rgb(173, 133, 255)",
                yAxisID: "y",
            },
            {
                label: "Previous Year",
                data: payments.previousYear,
                borderColor: "#d0d0d0",
                backgroundColor: "#d0d0d0",
                yAxisID: "y1",
            },
        ],
    };

    return <Line className={classes.line} options={options} data={data} />;
};

export default Chart;
