import { useEffect, useState } from "react";
import { getPrestamos, deletePrestamo } from "../services/prestamosApi";
import PrestamosTable from "../components/tables/PrestamosTable";
import PrestamoModal from "../components/modals/PrestamoModal";
import DeleteModal from "../components/modals/DeleteModal";
import { Search } from "lucide-react";

export default function Record() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);

  const rowsPerPage = 4;

  useEffect(() => {
    cargarPrestamos();
  }, []);

  const cargarPrestamos = async () => {
    const data = await getPrestamos();
    setRecords(data);
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
  return (

    <div className="w-full p-6 text-white min-h-screen">
      {/* Título */}
      <h1 className="text-4xl font-bold mb-1" > Historial de Préstamos </h1>
      <p className="text-gray-400 mb-6">Todos los movimientos registrados.</p>

      {/* Barra superior */}
      <div className="flex justify-between items-center mb-4"> {/* Buscador */}
        <div className="bg-[#1A2234] flex items-center px-3 py-2 rounded-xl w-80 border border-white/10">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="bg-transparent ml-2 outline-none w-full text-gray-200"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }} />
        </div>
      </div>

      <PrestamosTable
        rows={currentRows}
        onView={setSelected}
        onDelete={setDeleteId}
      />

      <div className="flex justify-center gap-2 mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-2 rounded-lg ${page === i + 1 ? "bg-blue-600" : "bg-[#1A2234]"
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


      {deleteId && (
        <DeleteModal
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}

    </div >
  );
}
