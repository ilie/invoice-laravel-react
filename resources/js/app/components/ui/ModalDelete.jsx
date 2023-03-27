import React from "react";
import ReactDom from "react-dom";
import "./Modal.css";
import Button from "./Button/Button";
import Cancel from "./Button/Cancel";

const ModalDelete = (props) => {
    return ReactDom.createPortal(
        props.isOpen && (
            <>
                <div className="backdrop" onClick={props.onClose}></div>

                <div className="modal">
                    <header className="modal-head">
                        <p className="modal-title">
                            Delete {props.resourceName}?
                        </p>
                        <Cancel click={props.onClose} />
                    </header>
                    <section className="modal-body">
                        <p>
                            Are you sure you want to delete {props.resourceName}
                            ? This action cannot be undone!
                        </p>
                    </section>
                    <footer className="modal-footer sm">
                        <Button click={props.onClose} btnType="secondary">
                            Cancel
                        </Button>
                        <Button click={props.onConfirm} btnType="danger">
                            Delete
                        </Button>
                    </footer>
                </div>
            </>
        ),
        document.getElementById("portal")
    );
};

export default ModalDelete;
