export default function InputField({
  label,
  error,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
        {label}
      </label>

      <input
        {...props}
        className={`
          rounded-xl px-4 py-2.5 outline-none transition-all duration-200
          bg-white dark:bg-slate-900 
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400
          
          /* BORDE SIEMPRE VISIBLE */
          border-2 
          ${error 
            ? "border-red-500" 
            : "border-slate-400 dark:border-slate-700"} /* Aquí definimos el borde base */
          
          /* EFECTO HOVER (Al pasar el mouse) */
          hover:border-slate-400 dark:hover:border-slate-600
          
          /* EFECTO FOCUS (Al hacer clic) */
          focus:border-blue-500 dark:focus:border-blue-400 
          focus:ring-4 focus:ring-blue-500/10
          
          /* Sombra sutil para dar profundidad */
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