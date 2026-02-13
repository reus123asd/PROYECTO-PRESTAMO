import LoadingModal from "../components/common/LoadingModal";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  obtenerPrestamos,
  obtenerPagos,
  registrarPagoApi,
  descargarVoucherApi,
} from "../services/pagosApi";

export default function Payments() {
  const [records, setRecords] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [monto, setMonto] = useState("");
  const [loading, setLoading] = useState(true);
  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
  );

  const prestamo = records.find(r => r.id === selectedId);

  // Filtrar historial de pagos del préstamo seleccionado
  const pagosDelPrestamo = historial.filter(p => p.prestamoId === selectedId);

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (!prestamo) return;

    const totalCuotas = Number(prestamo.cuotas);
    const montoTotal = prestamo.monto;
    const saldo = prestamo.saldo;

    if (!totalCuotas || totalCuotas <= 0) return;

    const cuotaBase = montoTotal / totalCuotas;

    // Sugerir monto sin exceder saldo
    const montoCalculado =
      saldo < cuotaBase ? saldo : cuotaBase;

    setMonto(montoCalculado.toFixed(2));
  }, [prestamo]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const prestamos = await obtenerPrestamos();
      setRecords(prestamos.filter(p => p.saldo > 0));

      const pagos = await obtenerPagos();
      setHistorial(pagos);
    } catch (error) {
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const registrarPago = async () => {
    if (!selectedId || !monto) {
      toast.error("Por favor completa los campos");
      return;
    }

    if (Number(monto) <= 0) {
      toast.error("El monto debe ser mayor a 0");
      return;
    }

    if (prestamo && Number(monto) > prestamo.saldo) {
      toast.error(`El monto no puede exceder el saldo de S/ ${prestamo.saldo}`);
      return;
    }

    try {
      const data = await registrarPagoApi(selectedId, {
        monto,
        fecha,
      });

      toast.success("Pago registrado exitosamente");

      setRecords(prev =>
        prev.map(r => r.id === data.prestamo.id ? data.prestamo : r)
      );

      setHistorial(prev => [...prev, data.pago]);

      // No limpiar selección para permitir seguir viendo
      setMonto("");
    } catch (error) {
      toast.error("Error al registrar el pago");
    }
  };

  const descargarVoucher = async (id) => {
    const blob = await descargarVoucherApi(id);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `voucher_${id}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div className="max-h-[calc(100vh-130px)] overflow-y-auto pr-2">
      <div className="w-full p-6 text-gray-900 dark:text-white transition-colors">

        <h1 className="text-4xl font-bold mb-1">Registro de Pagos</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Registra pagos de los préstamos activos.
        </p>

        {/* Selección préstamo */}
        <div className="bg-white dark:bg-[#111826] p-5 rounded-xl border border-gray-200 dark:border-white/10 space-y-4 shadow-sm transition-colors">

          <label className="block text-gray-700 dark:text-gray-300 font-semibold">
            Seleccionar préstamo
          </label>

          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1A2234] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
          >
            <option value="">-- Seleccionar --</option>
            {records.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre} — Saldo pendiente: S/ {r.saldo}
              </option>
            ))}
          </select>

          {prestamo && (
            <div className="bg-slate-50 dark:bg-[#1A2234] p-4 rounded-xl border border-gray-200 dark:border-white/10 transition-colors">
              <p><strong>ID:</strong> {prestamo.id}</p>
              <p><strong>Cliente:</strong> {prestamo.nombre}</p>
              <p><strong>Cuotas:</strong> {prestamo.pagos.length}/{prestamo.cuotas}</p>
              <p><strong>Cuota: </strong>S/ {(prestamo.monto / prestamo.cuotas).toFixed(2)}</p>
              <p><strong>Saldo:</strong> S/ {prestamo.saldo}</p>
              <p><strong>Estado:</strong> {prestamo.estado}</p>
            </div>
          )}

          {prestamo && (
            <>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mt-3">
                Monto a pagar
              </label>

              <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1A2234] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-200 outline-none focus:border-blue-500 transition-colors"
              />

              <label className="block text-gray-700 dark:text-gray-300 font-semibold mt-3">
                Fecha del pago
              </label>

              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1A2234] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-200 outline-none focus:border-blue-500 transition-colors"
              />

              <button
                onClick={registrarPago}
                className="w-full mt-4 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                Registrar Pago
              </button>
            </>
          )}

          <h2 className="text-2xl font-bold mt-8 mb-3">Historial de Pagos</h2>

          <div className="bg-slate-50 dark:bg-[#111826] p-4 rounded-xl border border-gray-200 dark:border-white/10 max-h-64 overflow-y-auto transition-colors">
            {(selectedId ? pagosDelPrestamo : historial).length === 0 ? (
              <p className="text-gray-500">No hay pagos registrados.</p>
            ) : (
              (selectedId ? pagosDelPrestamo : historial).map(p => (
                <div
                  key={p.id}
                  className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 py-2 px-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div>
                    <p><strong>{p.cliente}</strong></p>
                    <p>S/ {p.monto} — {p.fecha}</p>
                    <p>ID Préstamo: {p.prestamoId}</p>
                  </div>

                  <button
                    onClick={() => descargarVoucher(p.id)}
                    className="px-3 py-2 bg-red-600 rounded-xl text-white hover:bg-red-700 shadow-sm"
                  >
                    Descargar PDF
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
      <LoadingModal show={loading} text="Cargando pagos..." />
    </div>
  );
}
