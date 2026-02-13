import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import LoadingModal from "../common/LoadingModal";
import { registrarPrestamo } from "../../services/prestamosApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

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

  // Calcular fecha límite (simple aproximación +30 días * cuotas)
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

      // Enviamos 'nombre' concatenado para compatibilidad, y también 'moneda'
      const payload = {
        ...data,
        nombre: nombreCompleto,
        fecha_limite: fechaLimite,
      };

      await registrarPrestamo(payload);
      toast.success("Préstamo registrado exitosamente");
      reset();
    } catch (error) {
      toast.error("Error al registrar el préstamo");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
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
          label="Número de teléfono"
          placeholder="999888777"
          maxLength={9}
          inputMode="numeric"
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
          {errors.moneda && (
            <span className="text-xs font-medium text-red-500 ml-1">
              {errors.moneda.message}
            </span>
          )}
        </div>

        <InputField
          label="Monto solicitado"
          type="number"
          step="0.01"
          placeholder="0.00"
          error={errors.monto?.message}
          {...register("monto")}
        />

        <InputField
          label="Fecha del préstamo"
          type="date"
          error={errors.fecha?.message}
          {...register("fecha")}
        />

        <InputField
          label="Cantidad de cuotas"
          type="number"
          min="1"
          error={errors.cuotas?.message}
          {...register("cuotas")}
        />

        <InputField
          label="Fecha límite de pago (Estimada)"
          type="date"
          disabled
          value={calcularFechaLimite()}
        />

        <TextAreaField
          label="Motivo del préstamo"
          placeholder="Describa brevemente el motivo del préstamo..."
          error={errors.motivo?.message}
          {...register("motivo")}
        />

        <InputField
          label="Adjuntar evidencia"
          type="file"
          {...register("evidencia")}
        />

        <div className="md:col-span-2 flex justify-end">
          <button
            disabled={isSubmitting}
            className="bg-blue-600 px-6 py-3 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
            {isSubmitting ? "Registrando..." : "Registrar Préstamo"}
          </button>
        </div>
      </form>
      <LoadingModal show={isSubmitting} text="Registrando préstamo..." />
    </>
  );
}
