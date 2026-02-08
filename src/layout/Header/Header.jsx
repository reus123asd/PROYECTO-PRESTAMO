import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import Hero from "../../components/common/Hero";
import UserMenu from "./UserMenu";
import { useAuth } from "../../hooks/useAuth";

const Header = ({ onToggleSidebar, setCurrentView, darkMode, toggleTheme }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const menuWrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const inicial = user?.username?.[0]?.toUpperCase() || "?";

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
    border-b px-6 py-5 relative">

      <div className="flex justify-between items-center">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100"
        >
          <Menu />
        </button>

        <div className="flex items-center gap-3" ref={menuWrapperRef}>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl
          bg-slate-200 dark:bg-slate-800
          text-slate-900 dark:text-slate-100
          hover:bg-slate-300 dark:hover:bg-slate-700
          transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div
            onClick={() => setOpen((p) => !p)}
            className="w-8 h-8 cursor-pointer rounded-full
            bg-gradient-to-br from-blue-500 to-cyan-400
            text-white font-bold flex items-center justify-center"
          >
            {inicial}
          </div>

          {/* MENU */}
          {open && (
            <UserMenu
              user={user}
              setOpen={setOpen}
              setCurrentView={setCurrentView}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
