import { FormInput } from '@/components/FormInput';

interface RutInputProps {
  error?: string;
}

export function RutInput({ error }: RutInputProps) {
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
      name="rut"
      type="text"
      placeholder="RUT (ej: 12.345.678-9)"
      error={error}
      onChange={handleRutChange}
      maxLength={12}
    />
  );
} 
