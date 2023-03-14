import React from "react";
import classes from "./StatsCard.module.css";

const StatsCard = (props) => {
    return (
        <div className={classes.card}>
            <span className={classes.card__title}>{props.title}</span>
            <span className={classes.card__content}>{props.content}</span>
        </div>
    );
};

export default StatsCard;
