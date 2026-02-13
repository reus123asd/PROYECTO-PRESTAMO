import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";
import LoadingModal from "../components/common/LoadingModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .min(1, "El nombre de usuario es obligatorio"),
  email: z.string().email("Correo inválido").min(1, "El correo es obligatorio"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .min(1, "La contraseña es obligatoria"),
});

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Registro exitoso, por favor inicia sesión");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Error al registrar usuario");
    }
  };

  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-900 min-h-screen flex items-center justify-center transition-colors">
        <div className="bg-white dark:bg-[#1A2234] p-8 rounded-lg max-w-md w-full border border-gray-200 dark:border-white/10 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Registro
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Nombre de usuario"
              placeholder="Ingresa tu nombre"
              error={errors.username?.message}
              {...register("username")}
            />

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
              transition-all duration-200 hover:bg-blue-600
              active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Registrando..." : "Registrarme"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            ¿Ya tienes cuenta?
            <Link className="text-blue-600 dark:text-blue-400 font-semibold ml-1 hover:underline" to="/">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>

      <LoadingModal show={isSubmitting} text="Registrando usuario..." />
    </>
  );
};

export default Register;
