import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
    let classNames;

    switch (props.btnType) {
        case "primary":
            classNames = classes.primary;
            break;
        case "primary-sm":
            classNames = classes.primary_sm;
            break;
        case "secondary":
            classNames = classes.secondary;
            break;
        case "danger":
            classNames = classes.danger;
            break;
        case "info":
            classNames = classes.info;
            break;
        case "control":
            classNames = classes.control;
            break;
        default:
            classNames = null;
            break;
    }

    return (
        <button
            className={classNames}
            onClick={props.click}
            type="button"
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;
