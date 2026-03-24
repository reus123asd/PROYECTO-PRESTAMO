export const handleLetras = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
};

export const handleNumeros = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
};

export const formatMoney = (val) => {
    if (!val && val !== 0) return "";
    const num = Number(val);
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export const handleMonto = (e) => {
    let val = e.target.value.replace(/\D/g, "");

    if (!val) {
        e.target.value = "";
        return;
    }

    const num = parseInt(val, 10) / 100;
    e.target.value = num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};
