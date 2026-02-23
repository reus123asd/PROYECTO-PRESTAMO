const API = import.meta.env.VITE_API_URL || "https://backend-inicial-proyecto-prestamo.onrender.com/api";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getPrestamos = async () => {
  const res = await fetch(`${API}/prestamos`, {
    headers: authHeader(),
  });
  return res.json();
};

export const deletePrestamo = async (id) => {
  await fetch(`${API}/prestamos/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
};

export async function registrarPrestamo(form) {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  Object.entries(form).forEach(([k, v]) => {
    if (v instanceof FileList) {
      if (v.length > 0) formData.append(k, v[0]);
    } else if (v !== undefined && v !== null && v !== "") {
      formData.append(k, v);
    }
  });

  const res = await fetch(`${API}/prestamos`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al registrar el préstamo");
  }

  return res.json();
}

export async function actualizarPrestamo(id, form) {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  Object.entries(form).forEach(([k, v]) => {
    if (v instanceof FileList) {
      if (v.length > 0) formData.append(k, v[0]);
    } else if (v !== undefined && v !== null && v !== "") {
      formData.append(k, v);
    }
  });

  const res = await fetch(`${API}/prestamos/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar el préstamo");
  }

  return res.json();
}
