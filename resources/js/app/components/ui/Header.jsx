import React from "react";
import "./Header.css";
import Logo from "../../assets/img/Logo-Billing.svg";
const Header = () => {
    return (
        <div className="main-header">
            <div className="container main-header__container">
                <img
                    src={Logo}
                    alt="Biling Ilie Florea"
                    className="main-header__logo"
                    width="25px"
                />
                <div className="main-header__text">Billing Local</div>
            </div>
        </div>
    );
};

export default Header;
