export default function TextAreaField({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      <label className="font-medium text-slate-700 dark:text-slate-300 ml-1">
        {label}
      </label>
      <textarea
        {...props}
        rows={3}
        className={`
          rounded-xl px-4 py-2.5 outline-none transition-all duration-200 resize-none
          bg-white dark:bg-slate-900 
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400
          
          border-2 
          ${error
            ? "border-red-500"
            : "border-slate-300 dark:border-slate-700"}
          
          hover:border-blue-400 dark:hover:border-slate-500
          focus:border-blue-500 dark:focus:border-blue-400 
          focus:ring-4 focus:ring-blue-500/10
          shadow-sm
        `}
      />
      {error && (
        <span className="text-xs font-medium text-red-500 ml-1">
          {error}
        </span>
      )}
    </div>
  );
}
