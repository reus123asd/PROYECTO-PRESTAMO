import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import InputField from "../components/forms/InputField";
import { Lock, ArrowRight, Zap, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { resetPassword } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return toast.error("Las contraseñas no coinciden");
        }
        if (newPassword.length < 6) {
            return toast.error("La contraseña debe tener al menos 6 caracteres");
        }

        setLoading(true);
        try {
            await resetPassword(token, newPassword);
            setSuccess(true);
            toast.success("Contraseña actualizada correctamente");
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            toast.error(error.message || "Error al restablecer la contraseña");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#0B0F1A] transition-colors duration-500 overflow-hidden">
            {/* Decorative Side */}
            <div className="hidden lg:flex relative bg-gradient-to-br from-indigo-700 via-purple-800 to-blue-900 items-center justify-center p-12 overflow-hidden">
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="relative z-10 max-w-md text-center space-y-8">
                    <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                        <ShieldCheck size={60} className="text-white fill-white/20" />
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter">Nueva <span className="text-purple-400">Seguridad</span></h1>
                    <p className="text-zinc-300 text-lg font-medium leading-relaxed">Crea una contraseña fuerte y única para mantener tu cuenta protegida en todo momento.</p>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-6 md:p-12 lg:p-20 relative">
                <div className="w-full max-w-[420px] space-y-10">
                    {!success ? (
                        <>
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">Restablecer Contraseña</h2>
                                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Ingresa tu nueva contraseña a continuación.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <InputField
                                        label="Nueva Contraseña"
                                        type="password"
                                        placeholder="••••••••"
                                        icon={Lock}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <InputField
                                        label="Confirmar Contraseña"
                                        type="password"
                                        placeholder="••••••••"
                                        icon={ShieldCheck}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    className="w-full group flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <Loader2 size={24} className="animate-spin" />
                                    ) : (
                                        <>
                                            Restablecer Contraseña
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-purple-500/10">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">¡Contraseña Cambiada!</h2>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Tu contraseña ha sido restablecida con éxito. Serás redireccionado al inicio de sesión en unos segundos.</p>
                            </div>
                            <Link to="/" className="inline-block text-purple-600 dark:text-purple-400 font-black hover:underline uppercase tracking-widest text-sm">Ir al Login Ahora</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
