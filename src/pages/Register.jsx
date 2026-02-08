import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";
import LoadingModal from "../components/common/LoadingModal";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 🔹 Limpiar error al escribir
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // 🔹 Validaciones
  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "El nombre es obligatorio";
    } else if (form.username.length < 3) {
      newErrors.username = "Mínimo 3 caracteres";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Correo inválido";
    }

    if (!form.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await register(form);
      navigate("/");
    } catch (error) {
      // error del backend
      setErrors({
        email: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6">
            Registro
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField
              label="Nombre de usuario"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
              error={errors.username}
            />

            <InputField
              label="Correo"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ingrese su correo"
              error={errors.email}
            />

            <InputField
              label="Contraseña"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              error={errors.password}
            />

            <button
              disabled={loading}
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg
              transition-all duration-200 hover:bg-blue-600
              active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400
              disabled:opacity-50"
            >
              Registrarme
            </button>
          </form>

          <p className="mt-4 text-center">
            ¿Ya tienes cuenta?
            <Link className="text-blue-600 font-semibold ml-1" to="/">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* 🔹 Modal reutilizable */}
      <LoadingModal show={loading} text="Registrando usuario..." />
    </>
  );
};

export default Register;
