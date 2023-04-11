export const selectStyles = {
    control: (provided) => ({
        ...provided,
        height: "2.2rem",
        fontSize: "0.9rem",
        borderColor: "var(--white-gray)",
        borderRadius: "0.6rem",
        "&:hover": {
            borderColor: "var(--soft-blue)",
        },
        "&:focus": {
            borderColor: "var(--soft-blue)",
            outline: "none",
            boxShadow: "none",
        },
    }),
    input: (provided, state) => ({
        ...provided,
        margin: "-3px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "var(--purple)" : state.isFocused,
        color: state.isSelected
            ? "white"
            : state.isFocused
            ? "var(--light-gray)"
            : "var(--purple)",
        "&:hover": {
            backgroundColor: "var(--dark-white)",
            color: "var(--light-gray)",
        },
    }),
};
