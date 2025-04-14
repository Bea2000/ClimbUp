import FormInput from '@/components/ui/FormInput';

interface RutInputProps {
  errors?: string[];
  label?: boolean;
}

export function RutInput({ errors, label = true }: RutInputProps) {
  function formatRut(value: string) {
    let rut = value.replace(/\./g, '').replace(/-/g, '');
    rut = rut.replace(/[^0-9kK]/g, '');
    
    if (rut.length > 1) {
      const dv = rut.slice(-1);
      const rutBody = rut.slice(0, -1);
      const rutFormateado = rutBody
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        .concat('-', dv);
      return rutFormateado;
    }
    return rut;
  }

  function handleRutChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatRut(e.target.value);
    e.target.value = formatted;
  }

  return (
    <FormInput
      label={label ? "RUT" : undefined}
      name="rut"
      type="text"
      placeholder={label ? "ej: 12.345.678-9" : "RUT (ej: 12.345.678-9)"}
      errors={errors}
      onChange={handleRutChange}
      maxLength={12}
    />
  );
} 
