import { Eye, Trash2 } from "lucide-react";

const estadoColors = {
    Cancelado: "bg-green-600/20 text-green-400",
    Deuda: "bg-orange-600/20 text-orange-400",
    Pendiente: "bg-yellow-600/20 text-yellow-400",
};

export default function PrestamosTable({ rows, onView, onDelete }) {
    return (
        <div className="bg-[#111826] rounded-2xl border border-white/10 overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table className="min-w-[900px] w-full text-left text-gray-300">
                    <thead className="bg-[#1A2234] text-gray-200">
                        <tr>
                            <th className="p-4 whitespace-nowrap">ID</th>
                            <th className="p-4 whitespace-nowrap">Nombre</th>
                            <th className="p-4 whitespace-nowrap">Fecha Inicio</th>
                            <th className="p-4 whitespace-nowrap">Fecha Fin</th>
                            <th className="p-4 whitespace-nowrap">Monto</th>
                            <th className="p-4 whitespace-nowrap">N° Cuotas</th>
                            <th className="p-4 whitespace-nowrap">Telefono</th>
                            <th className="p-4 whitespace-nowrap">Descripcion</th>
                            <th className="p-4 whitespace-nowrap">Estado</th>
                            <th className="p-4 text-center whitespace-nowrap">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map(item => (
                            <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                <td className="p-4 whitespace-nowrap">{item.id}</td>
                                <td className="p-4 whitespace-nowrap">{item.nombre}</td>
                                <td className="p-4 whitespace-nowrap">{item.fecha}</td>
                                <td className="p-4 whitespace-nowrap">{item.fecha_limite}</td>
                                <td className="p-4 whitespace-nowrap">S/ {item.monto}</td>
                                <td className="p-4 whitespace-nowrap">{item.cuotas}</td>
                                <td className="p-4 whitespace-nowrap">{item.telefono}</td>
                                <td className="p-4 whitespace-nowrap">{item.motivo}</td>
                                <td>
                                    <span className={`px-3 py-1 text-sm rounded-full ${estadoColors[item.estado]}`}>
                                        {item.estado}
                                    </span>
                                </td>
                                <td className="p-4 whitespace-nowrap flex gap-3 justify-center">
                                    <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white flex items-center gap-1"
                                        onClick={() => onView(item)}>
                                        <Eye size={18} />
                                    </button>
                                    <button className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white flex items-center gap-1"
                                        onClick={() => onDelete(item.id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
