import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { getPrestamos, deletePrestamo } from "../services/prestamosApi";
import PrestamosTable from "../components/tables/PrestamosTable";
import PrestamoModal from "../components/modals/PrestamoModal";
import EditPrestamoModal from "../components/modals/EditPrestamoModal";
import DeleteModal from "../components/modals/DeleteModal";
import LoadingModal from "../components/common/LoadingModal";
import { Search, Download, FileSpreadsheet } from "lucide-react";

export default function Loans() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 8;

  useEffect(() => {
    cargarPrestamos();
  }, []);

  const cargarPrestamos = async () => {
    try {
      const data = await getPrestamos();
      setRecords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    await deletePrestamo(deleteId);
    setRecords(prev => prev.filter(r => r.id !== deleteId));
    setDeleteId(null);
  };

  const filtered = records.filter(r =>
    r.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const currentRows = filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const exportToExcel = () => {
    const dataToExport = records.map(r => ({
      ID: r.id,
      Nombre: r.nombre,
      Fecha: r.fecha,
      Monto: r.monto,
      Moneda: r.moneda,
      Cuotas: r.cuotas,
      Telefono: r.telefono,
      Estado: r.estado
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Préstamos");

    // Generar archivo y descargar
    XLSX.writeFile(workbook, `prestamos_${new Date().toISOString().split('T')[0]}.xlsx`);
  };
  return (

    <div className="w-full text-gray-900 dark:text-white transition-colors">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Historial de Préstamos
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Consulta y gestiona todos los movimientos registrados de forma detallada.
        </p>
      </div>

      {/* Toolbar Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="relative group w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Buscar por nombre de cliente..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#111826] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium shadow-sm group-hover:border-slate-300 dark:group-hover:border-white/20"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto mt-2 sm:mt-0"
        >
          <FileSpreadsheet size={20} />
          Exportar Excel
        </button>
      </div>

      <PrestamosTable
        rows={currentRows}
        onView={setSelected}
        onEdit={setEditRecord}
        onDelete={setDeleteId}
        search={search}
      />

      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-2 rounded-lg transition-colors font-medium border ${page === i + 1
              ? "bg-blue-600 border-blue-600 text-white shadow-md"
              : "bg-white dark:bg-[#1A2234] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>


      <PrestamoModal
        prestamo={selected}
        onClose={() => setSelected(null)}
      />

      <EditPrestamoModal
        prestamo={editRecord}
        onClose={() => setEditRecord(null)}
        onUpdate={cargarPrestamos}
      />


      {deleteId && (
        <DeleteModal
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}

      <LoadingModal show={loading} text="Cargando historial..." />

    </div >
  );
}
