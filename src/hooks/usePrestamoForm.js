import { useEffect, useState } from "react";

const today = new Date().toISOString().split("T")[0];

export default function usePrestamoForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    monto: "",
    fecha: today,
    cuotas: "",
    fecha_limite: "",
    motivo: "",
    evidencia: null,
  });

  const [errors, setErrors] = useState({});

  // 🔹 Manejo de cambios
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Teléfono: solo números
    if (name === "telefono" && !/^\d*$/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // 🔹 Validación nombre completo
  const validateNombre = (value) => {
    if (!value.trim()) return "El nombre es obligatorio";

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value))
      return "Solo se permiten letras";

    const palabras = value.trim().split(/\s+/);

    if (palabras.length < 2)
      return "Ingrese nombre y apellido";

    if (palabras.some((p) => p.length < 3))
      return "Cada nombre debe tener al menos 3 letras";

    return "";
  };

  // 🔹 Validación general
  const validateForm = () => {
    const newErrors = {};

    newErrors.nombre = validateNombre(form.nombre);

    if (!/^\d{9}$/.test(form.telefono))
      newErrors.telefono = "Debe contener 9 dígitos";

    if (form.monto <= 0)
      newErrors.monto = "El monto debe ser mayor a S/. 0";

    if (form.cuotas < 1)
      newErrors.cuotas = "Debe ingresar al menos 1 cuota";

    Object.keys(newErrors).forEach(
      (key) => newErrors[key] === "" && delete newErrors[key]
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Calcular fecha límite según cuotas
  useEffect(() => {
    if (!form.cuotas || form.cuotas < 1) return;

    const base = new Date(form.fecha);
    const limite = new Date(base);
    limite.setMonth(limite.getMonth() + Number(form.cuotas));

    setForm((prev) => ({
      ...prev,
      fecha_limite: limite.toISOString().split("T")[0],
    }));
  }, [form.cuotas, form.fecha]);

  const resetForm = () => {
    setForm({
      nombre: "",
      telefono: "",
      monto: "",
      fecha: today,
      cuotas: "",
      fecha_limite: "",
      motivo: "",
      evidencia: null,
    });
    setErrors({});
  };

  return {
    form,
    errors,
    handleChange,
    validateForm,
    resetForm,
  };
}