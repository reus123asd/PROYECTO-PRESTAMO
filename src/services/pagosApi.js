const API = "https://backend-inicial-proyecto-prestamo.onrender.com/api";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const obtenerPrestamos = async () => {
  const res = await fetch(`${API}/prestamos`, {
    headers: authHeader(),
  });
  return res.json();
};

export const obtenerPagos = async () => {
  const res = await fetch(`${API}/prestamos/pagos`, {
    headers: authHeader(),
  });
  return res.json();
};

export const registrarPagoApi = async (prestamoId, payload) => {
  const res = await fetch(`${API}/prestamos/${prestamoId}/pago`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const descargarVoucherApi = async (pagoId) => {
  const res = await fetch(
    `${API}/prestamos/pagos/${pagoId}/voucher/pdf`,
    { headers: authHeader() }
  );

  return res.blob();
};
