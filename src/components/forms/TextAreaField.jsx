export default function TextAreaField({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2 md:col-span-2">
      <label className="font-medium">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="rounded-xl bg-slate-100 dark:bg-slate-900 px-4 py-2.5 border border-slate-300 dark:border-slate-700 resize-none"
        required
      />
    </div>
  );
}
