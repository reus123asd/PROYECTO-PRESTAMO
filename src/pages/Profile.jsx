import { useProfile } from "../hooks/useProfile";
import InputField from "../components/forms/InputField";

const Profile = () => {
  const { form, loading, msg, handleChange, updateProfile } = useProfile();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white transition-colors">Perfil de Cuenta</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 transition-colors">
        Administra la información de tu cuenta.
      </p>

      {msg && (
        <div className="mb-4 text-sm px-4 py-2 rounded-xl w-fit border bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 transition-colors">
          {msg}
        </div>
      )}

      <div className="max-w-md space-y-6">
        <InputField
          label="Usuario"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <button
          onClick={updateProfile}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition disabled:opacity-60 shadow-lg shadow-blue-500/30"
        >
          {loading ? "Actualizando..." : "Actualizar Perfil"}
        </button>
      </div>
    </div>
  );
};

export default Profile;