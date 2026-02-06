import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserMenu = ({ user, setOpen, setCurrentView }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl
    bg-white dark:bg-slate-900 border border-slate-200
    dark:border-slate-700 shadow-xl z-50 overflow-hidden">

      <div className="px-4 py-3 border-b">
        <p className="font-semibold">{user?.username}</p>
        <p className="text-sm text-slate-500">{user?.email}</p>
      </div>

      <button
        onClick={() => {
          setOpen(false);
          setCurrentView("Profile");
        }}
        className="w-full flex justify-between items-center px-4 py-3
        hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Perfil <User size={18} />
      </button>

      <button
        onClick={handleLogout}
        className="w-full flex justify-between items-center px-4 py-3
        text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        Cerrar sesión <LogOut size={18} />
      </button>
    </div>
  );
};

export default UserMenu;
