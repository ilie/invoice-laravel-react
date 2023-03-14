export const formatAmount = (amount) => {
    return amount.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    });
};

export function formatNumberToSuffix(num) {
    const suffixes = ["", "K", "M", "B", "T"]; // suffixes for thousand, million, billion, trillion...
    const thousand = 1000;

    for (let i = suffixes.length - 1; i >= 0; i--) {
        const divisor = Math.pow(thousand, i);
        if (num >= divisor) {
            const roundedNum = Math.floor(num / divisor);
            if (roundedNum < 10 * thousand) {
                // check if the number is between 1000 and 9999
                return roundedNum + suffixes[i];
            }
            const roundedNumThousands = Math.floor(roundedNum / thousand); // round down to the nearest thousand
            const decimalPart = roundedNum % thousand; // get the decimal part
            const formattedNum =
                roundedNumThousands +
                (decimalPart > 0
                    ? "." + decimalPart.toString().padStart(3, "0")
                    : ""); // format the number with a thousand separator and optional decimal part
            return formattedNum + suffixes[i];
        }
    }
    return num.toString();
}

export function humanDateFormat(isoDate, locale = "en-UK") {
    if (!isoDate) {
        return "--";
    }
    const date = new Date(isoDate);
    const now = new Date().getTime();
    const diff = now - date.getTime();

    if (diff < 60 * 1000) {
        const seconds = Math.round(diff / 1000);
        return `${seconds} seconds ago`;
    } else if (diff < 60 * 60 * 1000) {
        const minutes = Math.round(diff / (60 * 1000));
        return `${minutes} minutes ago`;
    } else if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.round(diff / (60 * 60 * 1000));
        return `${hours} hours ago`;
    } else if (date.getFullYear() === new Date().getFullYear()) {
        const formattedDate = date.toLocaleString(locale, {
            day: "numeric",
            month: "short",
        });
        return `${formattedDate}, at ${date.toLocaleTimeString(locale)}`;
    } else {
        const formattedDate = date.toLocaleString(locale, {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        return `${formattedDate}, at ${date.toLocaleTimeString(locale)}`;
    }
}
