import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { humanDateFormat } from "../utils/formatters";
import Options from "../ui/Options/Options";

const ClientItem = (props) => {
    const navigate = useNavigate();
    const editClientHandler = () => {
        navigate(`/clients/${props.id}/edit`);
    };
    const removeClientHandler = () => {
        console.log("Removing client");
    };
    const clientOptions = [
        { text: "Edit", click: editClientHandler },
        { text: "Remove", click: removeClientHandler },
    ];
    return (
        <tr className="item">
            <td className="item__name">
                <Link to={`${props.id}/edit`}>{props.name}</Link>
            </td>
            <td className="itme__cif">{props.cif}</td>
            <td className="item__email">{props.email}</td>
            <td className="item__contact_name">{props.contactName}</td>
            <td className="item__contact_phone">{props.contactPhone}</td>
            <td className="item__created">
                {humanDateFormat(props.createdAt)}
            </td>
            <td className="item__options">
                <Options options={clientOptions} />
            </td>
        </tr>
    );
};

export default ClientItem;
