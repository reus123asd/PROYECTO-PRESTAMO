import { useEffect } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";
import LoadingModal from "../components/common/LoadingModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Zap, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

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
      // Error handled in AuthContext
    }
  };

  useEffect(() => {
    // Check if system prefers dark mode or if it was active
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#0B0F1A] transition-colors duration-500 overflow-hidden">

      {/* Decorative Side - Desktop Only */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 items-center justify-center p-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-md text-center space-y-8">
          <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-in zoom-in duration-700">
            <Zap size={60} className="text-white fill-white/20" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white tracking-tighter">
              Reus <span className="text-blue-400">Admin</span>
            </h1>
            <p className="text-zinc-300 text-lg font-medium leading-relaxed">
              La plataforma más avanzada para la gestión de préstamos y cobranzas con análisis en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="text-blue-400 mb-2" size={24} />
              <p className="text-white font-bold text-sm">Seguridad Total</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Zap className="text-yellow-400 mb-2" size={24} />
              <p className="text-white font-bold text-sm">Alta Velocidad</p>
            </div>
          </div>
        </div>

        {/* Floating cards for depth */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 border border-white/10 rounded-2xl rotate-12 backdrop-blur-sm animate-bounce duration-[5s]"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 border border-white/10 rounded-2xl -rotate-12 backdrop-blur-sm animate-bounce duration-[4s] delay-700"></div>
      </div>

      {/* Login Form Side */}
      <div className="flex items-center justify-center p-6 md:p-12 lg:p-20 relative">
        {/* Mobile Mini Logo */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <Zap size={24} className="text-blue-600 dark:text-blue-400" />
          <span className="font-black text-xl tracking-tighter dark:text-white">REUS</span>
        </div>

        <div className="w-full max-w-[420px] space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              ¡Hola de nuevo!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
              Ingresa tus credenciales para acceder al panel.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <InputField
                label="Correo Electrónico"
                type="email"
                placeholder="ejemplo@correo.com"
                icon={Mail}
                error={errors.email?.message}
                {...register("email")}
              />

              <InputField
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-[#1A2234] dark:border-white/10" />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Recordarme</span>
              </label>
              <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-[#0B0F1A] text-gray-500 font-bold uppercase tracking-widest text-[10px]">O CONTINÚA CON</span>
            </div>
          </div>

          <p className="text-center text-gray-500 dark:text-gray-400 font-medium">
            ¿Aún no tienes una cuenta?
            <Link className="text-blue-600 dark:text-blue-400 font-black ml-2 hover:underline decoration-2 underline-offset-4" to="/register">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
      <LoadingModal show={isSubmitting} text="Validando credenciales..." />
    </div>
  );
};

export default Login;