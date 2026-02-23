import { Eye, Trash2, MessageCircle, Pencil } from "lucide-react";

const estadoColors = {
    Cancelado: "bg-green-600/20 text-green-400",
    Deuda: "bg-orange-600/20 text-orange-400",
    Pendiente: "bg-yellow-600/20 text-yellow-400",
};

export default function PrestamosTable({ rows, onView, onEdit, onDelete, search }) {
    return (
        <div className="bg-white dark:bg-[#111826] rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm transition-colors">
            <div className="w-full overflow-x-auto scrollbar-hide">
                <table className="w-full text-left text-gray-600 dark:text-gray-300">
                    <thead className="bg-gray-50 dark:bg-[#1A2234] text-gray-700 dark:text-gray-200 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-3 whitespace-nowrap">ID</th>
                            <th className="p-3 text-left">Nombre</th>
                            <th className="p-3 whitespace-nowrap">Fecha Inicio</th>
                            <th className="p-3 whitespace-nowrap">Fecha Fin</th>
                            <th className="p-3 whitespace-nowrap">Monto</th>
                            <th className="p-3 whitespace-nowrap text-center">Cuotas</th>
                            <th className="p-3 whitespace-nowrap">Teléfono</th>
                            <th className="p-3 text-left">Descripción</th>
                            <th className="p-3 whitespace-nowrap">Estado</th>
                            <th className="p-3 text-center whitespace-nowrap">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-sm">
                        {rows.map(item => (
                            <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-white/5 transition">
                                <td className="p-3 whitespace-nowrap font-medium text-gray-900 dark:text-white max-w-[100px] truncate" title={item.id}>
                                    {item.id}
                                </td>
                                <td className="p-3 font-medium text-gray-900 dark:text-white capitalize min-w-[120px]">
                                    {item.nombre}
                                </td>
                                <td className="p-3 whitespace-nowrap">{item.fecha}</td>
                                <td className="p-3 whitespace-nowrap">{item.fecha_limite}</td>
                                <td className="p-3 whitespace-nowrap font-bold text-gray-900 dark:text-white">
                                    {item.moneda === 'USD' ? '$' : 'S/'} {item.monto}
                                </td>
                                <td className="p-3 whitespace-nowrap text-center">{item.cuotas}</td>
                                <td className="p-3 whitespace-nowrap">
                                    <a
                                        href={`https://wa.me/51${item.telefono}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors group"
                                        title="Abrir WhatsApp"
                                    >
                                        <MessageCircle size={18} className="text-green-500 group-hover:scale-110 transition-transform" />
                                        {item.telefono}
                                    </a>
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-400 min-w-[150px] max-w-[250px]">
                                    {item.motivo}
                                </td>
                                <td>
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${estadoColors[item.estado]}`}>
                                        {item.estado}
                                    </span>
                                </td>
                                <td className="p-3 whitespace-nowrap flex gap-2 justify-center">
                                    <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white shadow-sm hover:shadow-md transition-all"
                                        onClick={() => onView(item)} title="Ver detalles">
                                        <Eye size={16} />
                                    </button>
                                    <button className="p-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-white shadow-sm hover:shadow-md transition-all"
                                        onClick={() => onEdit(item)} title="Editar">
                                        <Pencil size={16} />
                                    </button>
                                    <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white shadow-sm hover:shadow-md transition-all"
                                        onClick={() => onDelete(item.id)} title="Eliminar">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {rows.length === 0 && (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    {search ? (
                        <>
                            No se encontraron resultados para <span className="font-bold text-gray-900 dark:text-white">"{search}"</span>.
                        </>
                    ) : (
                        "No hay préstamos registrados."
                    )}
                </div>
            )}
        </div>

    );
}
