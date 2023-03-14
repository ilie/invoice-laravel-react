import React from "react";
import classes from "./Pagination.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
const Pagination = (props) => {
    return (
        <div className={classes.pagination}>
            <div className={classes.pagination__info}>
                <div className={classes.pagination__info_page}>
                    Page {props.currentPage} / {props.lastPage}
                </div>
                <div className={classes.pagination__info_entries}>
                    Viewing {props.from} to {props.to} of {props.total} results
                </div>
            </div>
            <div className={classes.pagination__links}>
                <Button
                    btnType="secondary"
                    click={props.prevLink}
                    disabled={!props.links.prev && "disabled"}
                >
                    &laquo; Previous
                </Button>
                <Button
                    btnType="secondary"
                    click={props.nextLink}
                    disabled={!props.links.next && "disabled"}
                >
                    Next &raquo;
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
