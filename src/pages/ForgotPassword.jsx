import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import InputField from "../components/forms/InputField";
import { Mail, ArrowRight, Zap, ChevronLeft, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { forgotPassword } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPassword(email);
            setSent(true);
            toast.success("Correo enviado correctamente");
        } catch (error) {
            toast.error(error.message || "Error al enviar el correo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#0B0F1A] transition-colors duration-500 overflow-hidden">
            {/* Decorative Side */}
            <div className="hidden lg:flex relative bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 items-center justify-center p-12 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="relative z-10 max-w-md text-center space-y-8">
                    <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                        <Zap size={60} className="text-white fill-white/20" />
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter">Recuperar <span className="text-blue-400">Acceso</span></h1>
                    <p className="text-zinc-300 text-lg font-medium leading-relaxed">No te preocupes, a todos nos pasa. Te ayudaremos a volver a tu cuenta de Reus Admin de forma segura.</p>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-6 md:p-12 lg:p-20 relative">
                <div className="w-full max-w-[420px] space-y-10">
                    <Link to="/" className="static lg:absolute lg:top-8 lg:left-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors font-bold group mb-6 lg:mb-0 -mt-4 lg:mt-0">
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al Inicio
                    </Link>

                    {!sent ? (
                        <>
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">¿Olvidaste tu contraseña?</h2>
                                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Ingresa tu correo y te enviaremos un link para restablecerla.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <InputField
                                    label="Correo Electrónico"
                                    type="email"
                                    placeholder="ejemplo@correo.com"
                                    icon={Mail}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <button
                                    disabled={loading}
                                    className="w-full group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <Loader2 size={24} className="animate-spin" />
                                    ) : (
                                        <>
                                            Enviar Instrucciones
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/10">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">¡Correo Enviado!</h2>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Hemos enviado las instrucciones a <span className="text-blue-600 dark:text-blue-400 font-bold">{email}</span>. Revisa tu bandeja de entrada.</p>
                            </div>
                            <p className="text-xs text-slate-400 uppercase font-black tracking-widest pt-4">¿No recibiste nada? Revisa tu carpeta de spam o intenta de nuevo en unos minutos.</p>
                            <button onClick={() => setSent(false)} className="text-blue-600 dark:text-blue-400 font-black hover:underline">Volver a intentar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
