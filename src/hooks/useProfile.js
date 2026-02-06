import { useEffect, useState } from "react";

export const useProfile = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMsg("No hay token. Inicia sesión.");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setMsg("Error al cargar perfil");
          return;
        }

        const data = await res.json();
        setForm({
          username: data.username ?? "",
          email: data.email ?? "",
        });
      } catch {
        setMsg("Error de conexión");
      }
    };

    fetchProfile();
  }, [token]);

  const updateProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
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
    msg,
    handleChange,
    updateProfile,
  };
};