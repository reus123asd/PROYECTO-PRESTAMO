import { useProfile } from "../hooks/useProfile";
import InputField from "../components/forms/InputField";

const Profile = () => {
  const { form, loading, msg, handleChange, updateProfile } = useProfile();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Perfil de Cuenta</h1>
      <p className="text-slate-500 mb-8">
        Administra la información de tu cuenta.
      </p>

      {msg && (
        <div className="mb-4 text-sm px-4 py-2 rounded-xl w-fit border bg-blue-100 text-blue-700">
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
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition disabled:opacity-60"
        >
          {loading ? "Actualizando..." : "Actualizar Perfil"}
        </button>
      </div>
    </div>
  );
};

export default Profile;