import "./Modal.css";

function Modal(props) {
    return (
        <>
            <div className="backdrop" onClick={props.onClose} />
            <div className="modal">
                <button onClick={props.onClose}>Close</button>
                <div className={classes.content}>{props.children}</div>
            </div>
        </>
    );
}

export default Modal;
