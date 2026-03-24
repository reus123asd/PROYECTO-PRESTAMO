import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useProfile = () => {
  const { updateUser } = useAuth();
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMsg("No hay token. Inicia sesión.");
      setFetching(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setFetching(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL || "https://backend-inicial-proyecto-prestamo.onrender.com/api"}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setMsg("Error al cargar perfil");
          return;
        }

        const data = await res.json();
        const nombresVal = data.nombres || data.username || "";

        setForm({
          nombres: nombresVal,
          apellidos: data.apellidos || "",
          email: data.email || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMsg("Error de conexión");
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [token]);

  const updateProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL || "https://backend-inicial-proyecto-prestamo.onrender.com/api"}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Actualizamos el usuario en el contexto global y localStorage
        updateUser(form);
      }

      setMsg(data.message);
    } catch {
      setMsg("Error actualizando perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return {
    form,
    loading,
    fetching,
    msg,
    handleChange,
    updateProfile,
  };
};