import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";
import LoadingModal from "../components/common/LoadingModal";

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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


  const validateForm = () => {
    const newErrors = {};

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
      await login(form);
    } catch (error) { 
      setErrors({
        email: "",
        password: error.message,
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#232323] min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Correo"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ingrese tu email"
              error={errors.email}
            />

            <InputField
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ingrese tu contraseña"
              error={errors.password}
            />

            <button className=" w-full bg-blue-500 text-white font-bold py-2 rounded-lg
            transition-all duration-200 hover:bg-blue-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
              Iniciar sesión
            </button>
          </form>

          <p className="mt-4 text-center">
            ¿Nuevo usuario?
            <Link className="text-blue-600 font-semibold ml-1" to="/register">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
      <LoadingModal show={loading} text="Iniciando sesión..." />
    </>
  );
};

export default Login;