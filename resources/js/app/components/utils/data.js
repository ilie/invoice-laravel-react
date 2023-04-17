export const invoiceStatusOptions = [
    {
        value: "draft",
        label: "Draft",
    },
    {
        value: "pending_payment",
        label: "Pending payment",
    },
    {
        value: "paid",
        label: "Paid",
    },
];

export const makeid = (length = 15) => {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
};
