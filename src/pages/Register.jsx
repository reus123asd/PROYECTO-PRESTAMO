import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/forms/InputField";
import { useAuth } from "../hooks/useAuth";
import LoadingModal from "../components/common/LoadingModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Zap, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

const registerSchema = z.object({
  nombres: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .min(1, "El nombre es obligatorio"),
  apellidos: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .min(1, "El apellido es obligatorio"),
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

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#0B0F1A] transition-colors duration-500 overflow-hidden">

      {/* Decorative Side - Desktop Only */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-indigo-700 via-purple-800 to-blue-900 items-center justify-center p-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-md text-center space-y-8">
          <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-in zoom-in duration-700">
            <Zap size={60} className="text-white fill-white/20" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-white tracking-tighter">
              Únete a <span className="text-purple-400">Reus</span>
            </h1>
            <p className="text-zinc-300 text-lg font-medium leading-relaxed">
              Empieza a gestionar tus préstamos hoy mismo con la herramienta más potente del mercado.
            </p>
          </div>

          <div className="space-y-4 mt-12">
            {[
              "Gestión de clientes ilimitada",
              "Reportes financieros avanzados",
              "Soporte multi-moneda (Soles/Dólares)",
              "Control de evidencias de pago"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-white font-bold bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                <CheckCircle2 className="text-green-400" size={20} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Register Form Side */}
      <div className="flex items-center justify-center p-6 md:p-12 lg:p-20 relative">
        {/* Mobile Mini Logo */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <Zap size={24} className="text-purple-600 dark:text-purple-400" />
          <span className="font-black text-xl tracking-tighter dark:text-white">REUS</span>
        </div>

        <div className="w-full max-w-[420px] space-y-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Crear Cuenta
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
              Completa los datos para empezar tu registro.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Nombres"
                  placeholder="Tu nombre"
                  icon={User}
                  error={errors.nombres?.message}
                  {...register("nombres")}
                />

                <InputField
                  label="Apellidos"
                  placeholder="Tu apellido"
                  icon={User}
                  error={errors.apellidos?.message}
                  {...register("apellidos")}
                />
              </div>

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

            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Al registrarte, aceptas nuestros <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline font-bold">Términos de Servicio</span> y <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline font-bold">Políticas de Privacidad</span>.
            </p>

            <button
              disabled={isSubmitting}
              className="w-full group flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Crear Cuenta Ahora
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 font-medium">
            ¿Ya tienes una cuenta instalada?
            <Link className="text-purple-600 dark:text-purple-400 font-black ml-2 hover:underline decoration-2 underline-offset-4" to="/">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
      <LoadingModal show={isSubmitting} text="Creando tu cuenta..." />
    </div>
  );
};

export default Register;
