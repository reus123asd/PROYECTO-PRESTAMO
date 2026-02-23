import { Zap } from "lucide-react";
import { menuItems } from "../../utils/menuItems";
import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ collapsed, currentPage, onPageChange }) => {
  const { user } = useAuth();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 transition-all duration-300 transform
        ${collapsed ? "-translate-x-full md:translate-x-0 md:w-20" : "translate-x-0 w-72"}
        bg-white/95 dark:bg-slate-900/95 backdrop-blur-md
        border-r border-slate-200 dark:border-slate-700 flex flex-col
        md:relative md:translate-x-0
      `}
    >
      {/* Logo */}
      <div className="p-5 border-b flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600
          rounded-xl flex items-center justify-center">
          <Zap className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-bold">Reus</h1>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(item => (
          <SidebarItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            active={currentPage === item.id}
            onClick={() => onPageChange(item.id)}
          />
        ))}
      </nav>

      {!collapsed && <SidebarProfile user={user} />}
    </aside>
  );
};

export default Sidebar;
