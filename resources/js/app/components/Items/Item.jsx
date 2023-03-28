import React from "react";
import Options from "../ui/Options/Options";
import { useNavigate, Link } from "react-router-dom";
import { formatDateToString, formatCurency } from "../utils/formatters";

const Item = (props) => {
    const navigate = useNavigate();
    const editItemHandler = () => {
        navigate(`/items/${props.id}/edit`);
    };
    const removeItemHandler = () => {
        props.removeItem(props.id);
    };

    const itemOptions = [
        { text: "Edit item", click: editItemHandler },
        { text: "Delete item", click: removeItemHandler, danger: true },
    ];

    return (
        <tr className="item">
            <td className="item__name">
                <Link to={`/items/${props.id}/edit`}>{props.name}</Link>
            </td>
            <td className="itme__description">{props.description}</td>
            <td className="item__price">{formatCurency(props.price)}</td>
            <td className="item__created">
                {formatDateToString(props.createdAt)}
            </td>
            <td className="item__options">
                <Options options={itemOptions} />
            </td>
        </tr>
    );
};

export default Item;
