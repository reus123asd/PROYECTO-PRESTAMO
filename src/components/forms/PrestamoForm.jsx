import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import LoadingModal from "../common/LoadingModal";
import { registrarPrestamo } from "../../services/prestamosApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  User,
  Phone,
  DollarSign,
  Calendar,
  ListOrdered,
  FileText,
  UploadCloud,
  Briefcase,
  CheckCircle2
} from "lucide-react";

const prestamoSchema = z.object({
  nombres: z.string().min(1, "Los nombres son obligatorios"),
  apellidos: z.string().min(1, "Los apellidos son obligatorios"),
  telefono: z.string().regex(/^\d{9}$/, "Debe contener exactamente 9 dígitos"),
  moneda: z.enum(["PEN", "USD"]),
  monto: z.coerce
    .number()
    .min(0.01, "El monto debe ser mayor a 0"),
  fecha: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: "Fecha inválida",
  }),
  cuotas: z.coerce.number().min(1, "Debe ingresar al menos 1 cuota"),
  motivo: z.string().min(1, "El motivo es obligatorio").min(5, "El motivo debe ser más descriptivo"),
  evidencia: z.any().optional(),
});

export default function PrestamoForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(prestamoSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      telefono: "",
      moneda: "PEN",
      monto: "",
      fecha: new Date().toISOString().split("T")[0],
      cuotas: 1,
      motivo: "",
    }
  });

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
      const fechaLimite = calcularFechaLimite();
      const nombreCompleto = `${data.nombres} ${data.apellidos}`.trim();

      const payload = {
        ...data,
        nombre: nombreCompleto,
        fecha_limite: fechaLimite,
      };

      await registrarPrestamo(payload);
      toast.success("Préstamo registrado exitosamente");
      reset();
    } catch (error) {
      toast.error(error.message || "Error al registrar el préstamo");
    }
  };

  return (
    <div className="max-w-5xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-[#111826] p-8 md:p-10 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl shadow-blue-500/5 items-start"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

          <div className="md:col-span-2 mb-2">
            <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <User size={20} /> Información del Cliente
            </h3>
            <div className="h-px w-full bg-gradient-to-r from-blue-500/20 to-transparent mt-2"></div>
          </div>

          <InputField
            label="Nombres"
            placeholder="Juan"
            icon={User}
            error={errors.nombres?.message}
            {...register("nombres")}
          />

          <InputField
            label="Apellidos"
            placeholder="Pérez"
            icon={User}
            error={errors.apellidos?.message}
            {...register("apellidos")}
          />

          <InputField
            label="Número de teléfono"
            placeholder="999888777"
            maxLength={9}
            inputMode="numeric"
            icon={Phone}
            error={errors.telefono?.message}
            {...register("telefono")}
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Moneda
            </label>
            <div className="relative group">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <select
                {...register("moneda")}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#1A2234] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none font-medium"
              >
                <option value="PEN">Soles (S/)</option>
                <option value="USD">Dólares ($)</option>
              </select>
            </div>
            {errors.moneda && (
              <span className="text-xs font-bold text-red-500 ml-1">
                {errors.moneda.message}
              </span>
            )}
          </div>

          <div className="md:col-span-2 mt-4 mb-2">
            <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Briefcase size={20} /> Detalles del Préstamo
            </h3>
            <div className="h-px w-full bg-gradient-to-r from-indigo-500/20 to-transparent mt-2"></div>
          </div>

          <InputField
            label="Monto solicitado"
            type="number"
            step="0.01"
            placeholder="0.00"
            icon={DollarSign}
            error={errors.monto?.message}
            {...register("monto")}
          />

          <InputField
            label="Fecha del préstamo"
            type="date"
            icon={Calendar}
            error={errors.fecha?.message}
            {...register("fecha")}
          />

          <InputField
            label="Cantidad de cuotas"
            type="number"
            min="1"
            icon={ListOrdered}
            error={errors.cuotas?.message}
            {...register("cuotas")}
          />

          <InputField
            label="Vencimiento Estimado"
            type="date"
            disabled
            icon={Calendar}
            value={calcularFechaLimite()}
          />

          <TextAreaField
            label="Motivo del préstamo"
            placeholder="Explica brevemente para qué se usará el dinero..."
            error={errors.motivo?.message}
            {...register("motivo")}
          />


          <div className="md:col-span-2 flex justify-end mt-6">
            <button
              disabled={isSubmitting}
              className="flex items-center gap-3 bg-blue-600 px-10 py-4 rounded-2xl text-white font-extrabold shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Confirmar Préstamo
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      <LoadingModal show={isSubmitting} text="Estamos registrando el nuevo préstamo..." />
    </div>
  );
}
