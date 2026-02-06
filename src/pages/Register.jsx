import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-[#232323] min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
          />

          <InputField
            label="Correo"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ingrese tu email"
          />

          <InputField
            label="Contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Introduce tu contraseña"
          />

          <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg">
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
  );
};

export default Register;