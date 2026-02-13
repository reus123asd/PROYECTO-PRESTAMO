export default function LoadingModal({ show, text = "Cargando..." }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1A2234] rounded-2xl px-8 py-6 flex flex-col items-center gap-4 shadow-2xl border border-gray-100 dark:border-white/5 transition-colors">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="font-medium text-gray-700 dark:text-gray-200">{text}</p>
      </div>
    </div>
  );
}
