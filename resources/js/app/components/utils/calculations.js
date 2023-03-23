// utils
function positive(number) {
    if (number < 0) {
        return (number *= -1);
    }

    return number;
}

// Calculate VAT
export function calculateVat(base, vat) {
    const result = base * (vat / 100);
    return result;
}

// Calculate Pesonal Income Tax
export function calculateIrpf(base, irpf) {
    const result = -base * (irpf / 100);
    return result;
}

// Calculate Total
export function calculateTotalAmount(base, irpf, vat) {
    const totalAmount = base + vat - positive(irpf);
    return totalAmount;
}
