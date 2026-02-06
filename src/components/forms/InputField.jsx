export default function InputField({
  label,
  error,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>

      <input
        {...props}
        className={`rounded-xl bg-slate-100 dark:bg-slate-900 px-4 py-2.5 border border-slate-300 dark:border-slate-700
          ${error ? "border-red-500" : "border-slate-300"}
        `}
      />

      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}