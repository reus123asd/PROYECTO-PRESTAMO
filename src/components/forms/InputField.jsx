export default function InputField({
  label,
  error,
  icon: Icon,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
        {label}
      </label>

      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Icon size={20} />
          </div>
        )}
        <input
          {...props}
          className={`
            w-full rounded-2xl px-4 py-3.5 outline-none transition-all duration-300
            ${Icon ? "pl-12" : "pl-5"}
            bg-slate-50 dark:bg-[#1A2234] 
            text-slate-900 dark:text-slate-100
            placeholder:text-slate-400 font-medium
            
            border border-gray-300 dark:border-white/10
            ${error ? "border-red-500 shadow-red-500/10" : "focus:border-blue-500 shadow-sm"}
            
            hover:border-blue-400 dark:hover:border-white/20
            focus:ring-4 focus:ring-blue-500/10
          `}
        />
      </div>

      {error && (
        <span className="text-xs font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
}