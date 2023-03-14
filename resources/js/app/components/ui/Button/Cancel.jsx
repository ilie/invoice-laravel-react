import React from "react";
import classes from "./Cancel.module.css";
const Cancel = (props) => {
    return (
        <div className={classes.cancel}>
            <svg
                aria-hidden="true"
                onClick={props.click}
                height="12"
                width="12"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m8 6.585 4.593-4.592a1 1 0 0 1 1.415 1.416L9.417 8l4.591 4.591a1 1 0 0 1-1.415 1.416L8 9.415l-4.592 4.592a1 1 0 0 1-1.416-1.416L6.584 8l-4.59-4.591a1 1 0 1 1 1.415-1.416z"
                    fillRule="evenodd"
                ></path>
            </svg>
        </div>
    );
};

export default Cancel;
