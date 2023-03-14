// utils
function positive(number) {
    if (number < 0) {
        return (number *= -1);
    }

    return number;
}

// Calculate VAT
export function calculateVat(base, vat) {
    const vat = base * (vat / 100);
    return vat;
}

// Calculate Pesonal Income Tax
export function calculateIrpf(base, irpf) {
    const irpf = -base * (irpf / 100);
    return irpf;
}

// Calculate Total
export function calculateTotalAmount(base, irpf, vat) {
    const totalAmount = base + vat - positive(irpf);
    return totalAmount;
}
