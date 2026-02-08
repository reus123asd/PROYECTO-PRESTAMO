import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import usePrestamoForm from "../../hooks/usePrestamoForm";
import { registrarPrestamo } from "../../services/prestamosApi";

const fields = [
  { label: "Nombre completo", name: "nombre", type: "text" },
  {
    label: "Número de teléfono",
    name: "telefono",
    type: "text",
    inputMode: "numeric",
    maxLength: 9,
    validate: (v) =>
      !/^\d{9}$/.test(v) ? "Debe contener exactamente 9 dígitos" : "",
  },
  {
    label: "Monto solicitado (S/.)",
    name: "monto",
    type: "number",
    min: 0.01,
    step: "0.01",
    validate: (v) =>
      v <= 0 ? "El monto debe ser mayor a S/. 0" : "",
  },
  {
    label: "Fecha del préstamo",
    name: "fecha",
    type: "date",
  },
  {
    label: "Cantidad de cuotas",
    name: "cuotas",
    type: "number",
    min: 1,
    validate: (v) =>
      v < 1 ? "Debe ingresar al menos 1 cuota" : "",
  },
  {
    label: "Fecha límite de pago",
    name: "fecha_limite",
    type: "date",
    disabled: true,
  },
];

export default function PrestamoForm() {
  const { form, errors, handleChange, validateForm, resetForm } =
    usePrestamoForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    await registrarPrestamo(form);
    alert("Préstamo registrado");
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {fields.map((f) => (
        <InputField
          key={f.name}
          {...f}
          value={form[f.name]}
          onChange={handleChange}
          error={errors[f.name]}
        />
      ))}
      <TextAreaField
        label="Motivo del préstamo"
        name="motivo"
        value={form.motivo}
        onChange={handleChange}
      />

      <InputField
        label="Adjuntar evidencia"
        type="file"
        name="evidencia"
        onChange={handleChange}
      />

      <div className="md:col-span-2 flex justify-end">
        <button className="bg-blue-600 px-6 py-3 rounded-xl text-white">
          Registrar Préstamo
        </button>
      </div>
    </form>
  );
}
