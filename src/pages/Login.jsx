import { useEffect } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";
import LoadingModal from "../components/common/LoadingModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Correo inválido").min(1, "El correo es obligatorio"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .min(1, "La contraseña es obligatoria"),
});

const Login = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      // Error is handled in AuthContext with toast
    }
  };

  useEffect(() => {
    localStorage.removeItem("theme");
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center transition-colors">
        <div className="bg-white dark:bg-[#1A2234] p-8 rounded-lg w-full max-w-md border border-gray-200 dark:border-white/10 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Iniciar Sesión</h2>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Correo"
              type="email"
              placeholder="Ingresa tu correo"
              error={errors.email?.message}
              {...register("email")}
            />

            <InputField
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              error={errors.password?.message}
              {...register("password")}
            />

            <button
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg
            transition-all duration-200 hover:bg-blue-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            ¿Nuevo usuario?
            <Link className="text-blue-600 dark:text-blue-400 font-semibold ml-1 hover:underline" to="/register">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
      <LoadingModal show={isSubmitting} text="Iniciando sesión..." />
    </>
  );
};

export default Login;