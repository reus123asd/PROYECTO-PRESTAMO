import { X, Pencil, Save, DollarSign, Calendar, Clock, AlignLeft, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { actualizarPrestamo } from "../../services/prestamosApi";
import InputField from "../forms/InputField";
import TextAreaField from "../forms/TextAreaField";
import LoadingModal from "../common/LoadingModal";
import { useEffect } from "react";

const prestamoSchema = z.object({
    nombres: z.string().min(1, "Los nombres son obligatorios"),
    apellidos: z.string().min(1, "Los apellidos son obligatorios"),
    telefono: z.string().regex(/^\d{9}$/, "Debe contener exactamente 9 dígitos"),
    moneda: z.enum(["PEN", "USD"]),
    monto: z.coerce.number().min(0.01, "El monto debe ser mayor a 0"),
    fecha: z.string(),
    cuotas: z.coerce.number().min(1, "Debe ingresar al menos 1 cuota"),
    motivo: z.string().min(1, "El motivo es obligatorio"),
});

export default function EditPrestamoModal({ prestamo, onClose, onUpdate }) {
    if (!prestamo) return null;

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(prestamoSchema),
        defaultValues: {
            nombres: "",
            apellidos: "",
            telefono: prestamo.telefono || "",
            moneda: prestamo.moneda || "PEN",
            monto: prestamo.monto || "",
            fecha: prestamo.fecha || "",
            cuotas: prestamo.cuotas || 1,
            motivo: prestamo.motivo || "",
        },
    });

    useEffect(() => {
        if (prestamo) {
            const names = prestamo.nombre.split(" ");
            setValue("nombres", names[0] || "");
            setValue("apellidos", names.slice(1).join(" ") || "");
            setValue("telefono", prestamo.telefono);
            setValue("moneda", prestamo.moneda);
            setValue("monto", prestamo.monto);
            setValue("fecha", prestamo.fecha);
            setValue("cuotas", prestamo.cuotas);
            setValue("motivo", prestamo.motivo);
        }
    }, [prestamo, setValue]);

    const fecha = watch("fecha");
    const cuotas = watch("cuotas");

    const calcularFechaLimite = () => {
        if (!fecha || !cuotas) return "";
        const date = new Date(fecha);
        date.setMonth(date.getMonth() + Number(cuotas));
        return date.toISOString().split("T")[0];
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                nombre: `${data.nombres} ${data.apellidos}`.trim(),
                fecha_limite: calcularFechaLimite(),
            };
            await actualizarPrestamo(prestamo.id, payload);
            toast.success("Préstamo actualizado correctamente");
            onUpdate();
            onClose();
        } catch (error) {
            toast.error(error.message || "Error al actualizar el préstamo");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#1A2234] w-full max-w-2xl rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl transition-all flex flex-col max-h-[95vh] overflow-hidden">

                {/* Header */}
                <div className="relative bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-gray-100 dark:border-white/5">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-slate-700 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white shadow-sm hover:shadow-md transition-all z-10"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-2xl">
                            <Pencil size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Editar Préstamo</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Modifica la información del registro #{prestamo.id}</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField
                            label="Nombres"
                            placeholder="Ej: Juan"
                            error={errors.nombres?.message}
                            {...register("nombres")}
                        />
                        <InputField
                            label="Apellidos"
                            placeholder="Ej: Pérez"
                            error={errors.apellidos?.message}
                            {...register("apellidos")}
                        />
                        <InputField
                            label="Teléfono"
                            placeholder="999888777"
                            maxLength={9}
                            error={errors.telefono?.message}
                            {...register("telefono")}
                        />
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                                Moneda
                            </label>
                            <select
                                {...register("moneda")}
                                className="rounded-xl px-4 py-2.5 outline-none transition-all duration-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-2 border-slate-400 dark:border-slate-700 hover:border-blue-400 dark:hover:border-slate-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 shadow-sm"
                            >
                                <option value="PEN">Soles (S/)</option>
                                <option value="USD">Dólares ($)</option>
                            </select>
                        </div>
                        <InputField
                            label="Monto"
                            type="number"
                            step="0.01"
                            error={errors.monto?.message}
                            {...register("monto")}
                        />
                        <InputField
                            label="Fecha"
                            type="date"
                            error={errors.fecha?.message}
                            {...register("fecha")}
                        />
                        <InputField
                            label="Cuotas"
                            type="number"
                            min="1"
                            error={errors.cuotas?.message}
                            {...register("cuotas")}
                        />
                        <InputField
                            label="Fecha Límite (Estimada)"
                            type="date"
                            disabled
                            value={calcularFechaLimite()}
                        />
                        <TextAreaField
                            label="Motivo"
                            error={errors.motivo?.message}
                            {...register("motivo")}
                        />
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border-2 border-slate-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? "Guardando..." : (
                                <>
                                    <Save size={20} />
                                    Guardar Cambios
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <LoadingModal show={isSubmitting} text="Actualizando préstamo..." />
            </div>
        </div>
    );
}
