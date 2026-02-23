const API = import.meta.env.VITE_API_URL || "https://backend-inicial-proyecto-prestamo.onrender.com/api";

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
  const token = localStorage.getItem("token");
  const formData = new FormData();

  Object.entries(payload).forEach(([k, v]) => {
    if (v instanceof FileList) {
      if (v.length > 0) formData.append(k, v[0]);
    } else if (v !== undefined && v !== null && v !== "") {
      formData.append(k, v);
    }
  });

  const res = await fetch(`${API}/prestamos/${prestamoId}/pago`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  return res.json();
};

export const descargarVoucherApi = async (pagoId) => {
  const res = await fetch(
    `${API}/prestamos/pagos/${pagoId}/voucher`,
    { headers: authHeader() }
  );

  return res.blob();
};
