import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
    const classNames =
        props.btnType === "primary" ? classes.primary : classes.secondary;
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
