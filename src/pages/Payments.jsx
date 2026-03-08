import LoadingModal from "../components/common/LoadingModal";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  obtenerPrestamos,
  obtenerPagos,
  registrarPagoApi,
  descargarVoucherApi,
} from "../services/pagosApi";
import {
  DollarSign,
  Calendar,
  FileText,
  Search,
  Download,
  CreditCard,
  User,
  TrendingUp,
  Clock,
  PlusCircle,
  FileCheck
} from "lucide-react";

export default function Payments() {
  const [records, setRecords] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [monto, setMonto] = useState("");
  const [loading, setLoading] = useState(true);
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [evidencia, setEvidencia] = useState(null);
  const [filtro, setFiltro] = useState("");

  const prestamo = records.find(r => r.id === selectedId);

  const historyBase = selectedId ? historial.filter(p => p.prestamoId === selectedId) : historial;
  const filteredHistory = historyBase.filter(p =>
    p.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
    p.prestamoId.includes(filtro)
  );

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (!prestamo) return;
    const cuotaBase = prestamo.monto / Number(prestamo.cuotas);
    const montoCalculado = prestamo.saldo < cuotaBase ? prestamo.saldo : cuotaBase;
    setMonto(montoCalculado.toFixed(2));
  }, [prestamo]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const prestamos = await obtenerPrestamos();
      setRecords(prestamos.filter(p => p.saldo > 0));
      const pagos = await obtenerPagos();
      setHistorial(pagos.sort((a, b) => b.id - a.id));
    } catch (error) {
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const registrarPago = async () => {
    if (!selectedId || !monto) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }

    try {
      const data = await registrarPagoApi(selectedId, {
        monto,
        fecha,
        evidencia,
      });

      if (data.message) {
        toast.success(data.message);
        cargarDatos();
        setMonto("");
        setEvidencia(null);
      }
    } catch (error) {
      toast.error("Error al registrar el pago");
    }
  };

  const descargarVoucher = async (id, originalName) => {
    try {
      const blob = await descargarVoucherApi(id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = originalName || `evidencia_${id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Error al descargar la evidencia");
    }
  };

  return (
    <div className="w-full text-gray-900 dark:text-white transition-colors">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Gestión de Pagos
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl font-medium">
          Administra los abonos de tus clientes y mantén el control de las evidencias de pago de forma segura.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Side - 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#111826] p-7 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl shadow-blue-500/5 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
                <PlusCircle size={22} />
              </div>
              <h2 className="text-xl font-bold">Nuevo Registro</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Seleccionar Préstamo Activo
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A2234] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none font-medium"
                  >
                    <option value="">Buscar por nombre...</option>
                    {records.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nombre} (Saldo: {r.moneda === 'USD' ? '$' : 'S/'} {r.saldo})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {prestamo && (
                <div className="bg-blue-50/50 dark:bg-blue-500/5 p-5 rounded-2xl border border-blue-100 dark:border-blue-500/10 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Balance Actual</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {prestamo.moneda === 'USD' ? '$' : 'S/'} {prestamo.saldo}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Progreso</span>
                    <span className="font-bold">
                      {prestamo.pagos.length} de {prestamo.cuotas} cuotas
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(prestamo.monto_pagado / prestamo.monto) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                    Monto
                  </label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="number"
                      placeholder="0.00"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A2234] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                    Fecha
                  </label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A2234] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Evidencia de Pago (PDF/JPG)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-slate-700 border-dashed rounded-3xl cursor-pointer bg-slate-50 dark:bg-[#1A2234] hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileCheck className={`w-8 h-8 mb-2 ${evidencia ? 'text-green-500' : 'text-gray-400'}`} />
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {evidencia ? evidencia[0].name : "Haz clic o arrastra un archivo"}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setEvidencia(e.target.files)}
                  />
                </label>
              </div>

              <button
                onClick={registrarPago}
                disabled={!selectedId || !monto}
                className="w-full py-4 bg-blue-600 rounded-2xl hover:bg-blue-700 text-white font-extrabold shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                Registrar Cobro
              </button>
            </div>
          </div>
        </div>

        {/* Table Side - 7 columns */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-[#111826] rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden flex flex-col h-full max-h-[700px]">
            <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Clock size={22} />
                </div>
                <h2 className="text-xl font-bold">Historial Reciente</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar pago..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#1A2234] border border-gray-200 dark:border-white/10 text-xs font-bold outline-none focus:border-blue-500 transition-all w-48"
                  />
                </div>
                {selectedId && (
                  <button
                    onClick={() => setSelectedId("")}
                    className="text-xs font-bold text-gray-500 hover:text-blue-500 transition-colors uppercase tracking-wider"
                  >
                    Ver Todo
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-6 space-y-4 custom-scrollbar">
              {filteredHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400">
                    <CreditCard size={32} />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No se encontraron movimientos registrados.</p>
                </div>
              ) : (
                filteredHistory.map(p => {
                  // Buscar el prestamo original para sacar la moneda real del historial global
                  const pOriginal = records.find(r => r.id === p.prestamoId);
                  const monedaSimbolo = p.moneda === 'USD' || pOriginal?.moneda === 'USD' ? '$' : 'S/';

                  return (
                    <div
                      key={p.id}
                      className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1A2234] flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-gray-100 dark:border-white/5">
                          <TrendingUp size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-gray-900 dark:text-white capitalize leading-tight mb-1">
                            {p.cliente}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} /> {p.fecha}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                              ID: {p.prestamoId}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                        <div className="text-right">
                          <p className="text-lg font-black text-gray-900 dark:text-white">
                            {monedaSimbolo} {Number(p.monto).toFixed(2)}
                          </p>
                        </div>

                        {p.evidencia ? (
                          <button
                            onClick={() => descargarVoucher(p.id, p.evidencia)}
                            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md hover:shadow-indigo-500/30 transition-all"
                            title="Descargar Evidencia"
                          >
                            <Download size={20} />
                          </button>
                        ) : (
                          <div className="p-3 bg-gray-100 dark:bg-slate-800 text-gray-400 rounded-xl cursor-not-allowed" title="Sin evidencia">
                            <FileText size={20} />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <LoadingModal show={loading} text="Cargando historial de pagos..." />
    </div>
  );
}
