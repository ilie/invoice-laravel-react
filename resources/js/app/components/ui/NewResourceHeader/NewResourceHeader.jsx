import React from "react";
import classes from "./NewResourceHeader.module.css";
import { useNavigate } from "react-router-dom";
import Cancel from "../Button/Cancel";

const NewResourceHeader = (props) => {
    const navigate = useNavigate();
    const goBackHandler = () => navigate(-1, { state: null });

    return (
        <div className={classes.header + " container"}>
            <Cancel click={goBackHandler} className={classes.header__button} />
            <div className={classes.header__title}>{props.title}</div>
        </div>
    );
};

export default NewResourceHeader;
