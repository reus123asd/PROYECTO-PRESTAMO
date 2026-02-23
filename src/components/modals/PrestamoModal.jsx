import { X, FileText, Calendar, DollarSign, User, Phone, FileDigit, AlignLeft, Clock, Download } from "lucide-react";

const estadoColors = {
  Cancelado: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Deuda: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  Pendiente: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
};

export default function PrestamoModal({ prestamo, onClose }) {
  if (!prestamo) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1A2234] w-full max-w-lg rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl transition-all flex flex-col max-h-[90vh] overflow-hidden">

        {/* Header con gradiente suave */}
        <div className="relative bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-gray-100 dark:border-white/5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-slate-700 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white shadow-sm hover:shadow-md transition-all z-10"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center mt-2">
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${estadoColors[prestamo.estado] || 'bg-gray-100 text-gray-600'}`}>
              {prestamo.estado}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize leading-tight">
              {prestamo.nombre}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center gap-1.5">
              <FileDigit size={14} /> ID: {prestamo.id}
            </p>
          </div>
        </div>

        {/* Contenido Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Sección Principal: Monto y Cuotas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-500/20 flex flex-col items-center justify-center text-center">
              <span className="text-blue-600 dark:text-blue-400 mb-1"><DollarSign size={24} /></span>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70 font-semibold uppercase">Monto Total</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {prestamo.moneda === 'USD' ? '$' : 'S/'} {prestamo.monto}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-2xl border border-purple-100 dark:border-purple-500/20 flex flex-col items-center justify-center text-center">
              <span className="text-purple-600 dark:text-purple-400 mb-1"><Clock size={24} /></span>
              <p className="text-xs text-purple-600/70 dark:text-purple-400/70 font-semibold uppercase">Cuotas</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{prestamo.cuotas}</p>
            </div>
          </div>

          {/* Información Detallada */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Fechas</p>
                <div className="text-sm text-gray-900 dark:text-gray-200 font-medium grid grid-cols-2 gap-x-8">
                  <span>In: {prestamo.fecha}</span>
                  <span>Fin: {prestamo.fecha_limite}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Contacto</p>
                <a
                  href={`https://wa.me/51${prestamo.telefono}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-900 dark:text-gray-200 font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-1"
                >
                  {prestamo.telefono} <span className="text-xs text-gray-400">(WhatsApp)</span>
                </a>
              </div>
            </div>

            <div className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors items-start">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                <AlignLeft size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">Motivo</p>
                <p className="text-sm text-gray-900 dark:text-gray-300 leading-relaxed">
                  {prestamo.motivo}
                </p>
              </div>
            </div>
          </div>

          {/* Pagos y Evidencias */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 px-1">
              <Clock size={16} className="text-blue-500" /> Historial de Pagos y Evidencias
            </h3>

            {prestamo.pagos && prestamo.pagos.length > 0 ? (
              <div className="space-y-3">
                {prestamo.pagos.map((pago, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                        <DollarSign size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          S/ {Number(pago.monto).toFixed(2)}
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium italic">
                          {pago.fecha}
                        </p>
                      </div>
                    </div>

                    {pago.evidencia && (
                      <button
                        onClick={async () => {
                          try {
                            const { descargarVoucherApi } = await import("../../services/pagosApi");
                            const blob = await descargarVoucherApi(pago.id);
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = pago.evidencia || `evidencia_${pago.id}.pdf`;
                            a.click();
                            URL.revokeObjectURL(url);
                          } catch (error) {
                            console.error("Error al descargar la evidencia:", error);
                          }
                        }}
                        className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md hover:shadow-indigo-500/30 transition-all"
                        title="Descargar Evidencia"
                      >
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
                <Clock size={32} className="text-gray-300 dark:text-gray-600 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No se han registrado pagos aún.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/30">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all"
          >
            Cerrar Detalles
          </button>
        </div>
      </div>
    </div>
  );
}
