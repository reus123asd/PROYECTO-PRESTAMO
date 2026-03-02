import { useProfile } from "../hooks/useProfile";
import InputField from "../components/forms/InputField";
import LoadingModal from "../components/common/LoadingModal";
import { User, Mail, Camera, Shield, Bell, CheckCircle2, Loader2, Save } from "lucide-react";

const Profile = () => {
  const { form, loading, fetching, msg, handleChange, updateProfile } = useProfile();

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <LoadingModal show={fetching} text="Preparando tu perfil..." />
      <LoadingModal show={loading} text="Guardando cambios..." />

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          Mi <span className="text-blue-600">Cuenta</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Administra tu información personal y preferencias de seguridad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#1A2234] rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300">
            <div className="relative group w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-blue-500/30">
                {form.nombres?.charAt(0).toUpperCase() || "U"}
              </div>
              <button className="absolute bottom-1 right-1 p-2.5 bg-white dark:bg-[#2D3748] rounded-full shadow-lg border border-slate-100 dark:border-white/10 text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform duration-300">
                <Camera size={18} />
              </button>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {form.nombres ? `${form.nombres} ${form.apellidos}` : "Usuario"}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{form.email || "correo@ejemplo.com"}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm font-medium">
                <Shield size={18} className="text-blue-500" />
                <span>Cuenta Verificada</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm font-medium">
                <CheckCircle2 size={18} className="text-green-500" />
                <span>Miembro desde 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 dark:bg-blue-600/20 rounded-3xl p-6 text-white overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="font-bold mb-2 relative z-10">Soporte Premium</h4>
            <p className="text-blue-100 dark:text-blue-200 text-xs font-medium relative z-10 leading-relaxed">
              Como usuario de Reus Admin, tienes acceso a soporte prioritario 24/7.
            </p>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1A2234] rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-400">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Información Personal</h2>
            </div>

            {msg && (
              <div className="mb-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 flex items-center gap-3 text-blue-700 dark:text-blue-300 animate-in zoom-in-95 duration-300">
                <Bell size={18} className="shrink-0" />
                <p className="text-sm font-bold">{msg}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Nombres"
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                icon={User}
                placeholder="Tus nombres"
              />

              <InputField
                label="Apellidos"
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                icon={User}
                placeholder="Tus apellidos"
              />

              <InputField
                label="Correo Electrónico"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                icon={Mail}
                placeholder="tu@correo.com"
              />
            </div>

            <div className="mt-10 flex items-center justify-end border-t border-slate-100 dark:border-white/5 pt-8">
              <button
                onClick={updateProfile}
                disabled={loading}
                className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  <>
                    <Save size={20} className="group-hover:rotate-12 transition-transform" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#1A2234]/50 rounded-3xl p-8 border border-dashed border-slate-300 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold mb-1">Configuración Avanzada</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Descarga tus datos o elimina tu cuenta permanentemente.</p>
              </div>
              <button className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-white dark:hover:bg-white/5 transition-colors">
                Gestionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
