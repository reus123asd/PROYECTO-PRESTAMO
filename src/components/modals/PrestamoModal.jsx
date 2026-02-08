import { X, FileText } from "lucide-react";

export default function PrestamoModal({ prestamo, onClose }) {
  if (!prestamo) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1A2234] w-[450px] p-6 rounded-2xl border border-white/10 shadow-xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Detalles del Préstamo</h2>
          <X
            className="text-gray-300 cursor-pointer hover:text-white"
            onClick={onClose}
          />
        </div>

        {/* Contenido */}
        <div className="space-y-2 text-gray-300 text-sm">
          <p><strong>ID:</strong> {prestamo.id}</p>
          <p><strong>Nombre:</strong> {prestamo.nombre}</p>
          <p><strong>Fecha Inicio:</strong> {prestamo.fecha}</p>
          <p><strong>Fecha Fin:</strong> {prestamo.fecha_limite}</p>
          <p><strong>Monto:</strong> ${prestamo.monto}</p>
          <p><strong>Cuotas:</strong> {prestamo.cuotas}</p>
          <p><strong>Teléfono:</strong> {prestamo.telefono}</p>
          <p><strong>Descripción:</strong> {prestamo.motivo}</p>

          {prestamo.evidencia ? (
            <a
              href={prestamo.evidencia}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mt-2"
            >
              <FileText size={18} />
              Ver archivo adjunto
            </a>
          ) : (
            <p className="text-gray-500">Sin archivo adjunto.</p>
          )}
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 text-white"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
