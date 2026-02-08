const SidebarItem = ({ item, collapsed, active, onClick }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center p-3 rounded-xl transition
      ${
        active
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
    </button>
  );
};

export default SidebarItem;
