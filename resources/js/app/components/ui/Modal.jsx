import classes from "./Modal.module.css";
function Modal(props) {
    return (
        <>
            <div className={classes.backdrop} onClick={props.onClose} />
            <div className={classes.modal}>
                <button onClick={props.onClose}>Close</button>
                <div className={classes.content}>{props.children}</div>
            </div>
        </>
    );
}

export default Modal;
