export default function TextAreaField({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
        {label}
      </label>
      <textarea
        {...props}
        rows={4}
        className={`
          w-full rounded-2xl px-5 py-4 outline-none transition-all duration-300 resize-none
          bg-slate-50 dark:bg-[#1A2234] 
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400 font-medium
          
          border border-gray-300 dark:border-white/10
          ${error ? "border-red-500 shadow-red-500/10" : "focus:border-blue-500 shadow-sm"}
          
          hover:border-blue-400 dark:hover:border-white/20
          focus:ring-4 focus:ring-blue-500/10
        `}
      />
      {error && (
        <span className="text-xs font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
}
