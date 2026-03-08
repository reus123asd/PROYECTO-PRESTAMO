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
          w-full rounded-[1.25rem] px-5 py-4 outline-none transition-all duration-500 resize-none
          
          /* Glassmorphism & Colors */
          bg-white dark:bg-slate-900/40
          text-slate-900 dark:text-white
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          font-medium text-[15px]
          
          /* Borders & Shadows */
          border border-slate-200 dark:border-white/5
          shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] dark:shadow-none
          
          /* Interaction States */
          hover:border-blue-400 dark:hover:border-white/20
          hover:shadow-[0_8px_20px_-6px_rgba(59,130,246,0.15)]
          
          focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
          focus:bg-white dark:focus:bg-slate-900/60
          
          ${error ? "border-red-500/50 shadow-lg shadow-red-500/5 focus:border-red-500" : ""}
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
