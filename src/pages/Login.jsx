import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
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
          />

          <InputField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Ingrese tu contraseña"
          />

          <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg">
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
  );
};

export default Login;