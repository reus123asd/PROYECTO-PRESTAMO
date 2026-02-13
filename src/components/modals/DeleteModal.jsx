import { AlertTriangle } from "lucide-react";

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1A2234] p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl w-full max-w-md transition-all flex flex-col items-center text-center">

        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 text-red-600 dark:text-red-500">
          <AlertTriangle size={32} strokeWidth={2.5} />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          ¿Eliminar registro?
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-[280px]">
          Esta acción eliminará el registro permanentemente y no se podrá recuperar.
        </p>

        <div className="flex gap-4 w-full">
          <button
            className="flex-1 bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-semibold"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            className="flex-1 bg-red-600 py-3 rounded-xl hover:bg-red-700 text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-600/20 font-bold"
            onClick={onConfirm}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
