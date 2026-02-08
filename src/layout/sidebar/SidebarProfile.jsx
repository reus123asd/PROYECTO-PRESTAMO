const SidebarProfile = ({ user }) => {
  const initial = user?.username?.[0]?.toUpperCase() || "?";

  return (
    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
        <div className="w-10 h-10 flex items-center justify-center rounded-full
          bg-gradient-to-br from-blue-500 to-cyan-400 text-white font-bold">
          {initial}
        </div>
        <div>
          <p className="text-sm font-medium">{user?.username}</p>
          <p className="text-xs text-slate-500">{user?.role || "Administrador"}</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
