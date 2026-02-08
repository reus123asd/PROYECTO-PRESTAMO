export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1A2234] p-6 rounded-2xl border border-white/10 shadow-xl w-[380px]">
        
        <h2 className="text-xl font-bold mb-3 text-white">
          ¿Eliminar registro?
        </h2>

        <p className="text-gray-400 mb-5 text-sm">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-gray-600/40 text-gray-300 py-2 rounded-xl hover:bg-gray-600/60"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            className="flex-1 bg-red-600 py-2 rounded-xl hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
