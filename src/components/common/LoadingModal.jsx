export default function LoadingModal({ show, text = "Cargando..." }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl px-6 py-5 flex items-center gap-4 shadow-xl">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="font-medium text-slate-700">{text}</p>
      </div>
    </div>
  );
}
