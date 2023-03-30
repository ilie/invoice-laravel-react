import React, { useState, useEffect, useRef } from "react";
import classes from "./Options.module.css";
const Options = (props) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState("down");
    const optionsRef = useRef(null);
    const itemRef = useRef(null);

    const toggleMenuHandler = () => {
        setMenuIsOpen((prevState) => !prevState);
    };

    const outsideClickHandler = (event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setMenuIsOpen(false);
        }
    };

    const clickMenuOptionHandler = (option) => {
        option.click();
        setMenuIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", outsideClickHandler);
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler);
        };
    }, []);

    useEffect(() => {
        const itemPosition = itemRef.current.getBoundingClientRect();
        const optionsHeight = optionsRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        let menuTop = itemPosition.bottom;
        let menuBottom = menuTop + optionsHeight;

        if (menuTop >= 560) {
            setMenuPosition("up");
        } else {
            setMenuPosition("down");
        }

        // setMenuPosition({ top: menuTop, left: itemPosition.left });
    }, [menuIsOpen]);

    return (
        <div
            className={classes.options_container}
            ref={optionsRef}
            // style={{ top: menuPosition.top, left: menuPosition.left }}
        >
            <div
                className={classes.options_menu}
                onClick={toggleMenuHandler}
                ref={itemRef}
            >
                <div className={classes.dot}></div>
                <div className={classes.dot}></div>
                <div className={classes.dot}></div>
            </div>
            {menuIsOpen && (
                <>
                    <div className={classes.options_dropdown}>
                        {props.options.map((option) => (
                            <div
                                key={option.text}
                                className={`${classes.dropdown_item} ${
                                    option.danger
                                        ? classes.dropdown_item_danger
                                        : ""
                                }`}
                                onClick={() => {
                                    clickMenuOptionHandler(option);
                                }}
                            >
                                {option.text}
                            </div>
                        ))}
                    </div>
                    <div className={classes.options_dropdown__arrow}></div>
                </>
            )}
        </div>
    );
};

export default Options;
