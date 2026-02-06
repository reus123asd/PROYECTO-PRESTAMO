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
  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
  );

  const prestamo = records.find(r => r.id === selectedId);

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

    const montoCalculado =
      saldo < cuotaBase ? saldo : cuotaBase;

    setMonto(montoCalculado.toFixed(2));
  }, [prestamo]);

  const cargarDatos = async () => {
    const prestamos = await obtenerPrestamos();
    setRecords(prestamos.filter(p => p.saldo > 0));

    const pagos = await obtenerPagos();
    setHistorial(pagos);
  };

  const registrarPago = async () => {
    if (!selectedId || !monto) return alert("Completa los campos");

    const data = await registrarPagoApi(selectedId, {
      monto,
      fecha,
    });

    setRecords(prev =>
      prev.map(r => r.id === data.prestamo.id ? data.prestamo : r)
    );

    setHistorial(prev => [...prev, data.pago]);

    setMonto("");
    setFecha("");
    setSelectedId("");
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
      <div className="w-full p-6 text-white">

        <h1 className="text-4xl font-bold mb-1">Registro de Pagos</h1>
        <p className="text-gray-400 mb-6">
          Registra pagos de los préstamos activos.
        </p>

        {/* Selección préstamo */}
        <div className="bg-[#111826] p-5 rounded-xl border border-white/10 space-y-4">

          <label className="block text-gray-300 font-semibold">
            Seleccionar préstamo
          </label>

          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#1A2234] border border-white/10 text-gray-200"
          >
            <option value="">-- Seleccionar --</option>
            {records.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nombre} — Saldo pendiente: S/ {r.saldo}
              </option>
            ))}
          </select>

          {prestamo && (
            <div className="bg-[#1A2234] p-4 rounded-xl border border-white/10">
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
              <label className="block text-gray-300 font-semibold mt-3">
                Monto a pagar
              </label>

              <input
                type="number"
                value={monto}
                disabled
                className="w-full p-3 rounded-xl bg-[#1A2234] border border-white/10 text-gray-400 cursor-not-allowed"
              />

              <label className="block text-gray-300 font-semibold mt-3">
                Fecha del pago
              </label>

              <input
                type="date"
                value={fecha}
                disabled
                onChange={(e) => setFecha(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#1A2234] border border-white/10"
              />

              <button
                onClick={registrarPago}
                className="w-full mt-4 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 font-semibold"
              >
                Registrar Pago
              </button>
            </>
          )}

          <h2 className="text-2xl font-bold mt-8 mb-3">Historial de Pagos</h2>

          <div className="bg-[#111826] p-4 rounded-xl border border-white/10 max-h-64 overflow-y-auto">
            {historial.length === 0 ? (
              <p className="text-gray-500">No hay pagos registrados.</p>
            ) : (
              historial.map(p => (
                <div
                  key={p.id}
                  className="flex justify-between items-center border-b border-white/10 py-2 text-sm text-gray-300"
                >
                  <div>
                    <p><strong>{p.cliente}</strong></p>
                    <p>S/ {p.monto} — {p.fecha}</p>
                    <p>ID Préstamo: {p.prestamoId}</p>
                  </div>

                  <button
                    onClick={() => descargarVoucher(p.id)}
                    className="px-3 py-2 bg-red-600 rounded-xl text-white hover:bg-red-700"
                  >
                    Descargar PDF
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
