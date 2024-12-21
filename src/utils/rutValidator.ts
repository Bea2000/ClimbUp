export function cleanRut(rut: string): string {
  return rut.replace(/[^0-9kK]/g, '').toLowerCase();
}

export function formatRut(rut: string): string {
  const cleaned = cleanRut(rut);
  const dv = cleaned.slice(-1);
  const numbers = cleaned.slice(0, -1);
  return `${numbers}-${dv}`;
}

export function validateRut(rut: string): boolean {
  if (!rut) return false;
  
  const cleaned = cleanRut(rut);
  
  if (cleaned.length < 8) return false;
  
  const dv = cleaned.slice(-1);
  const numbers = cleaned.slice(0, -1);
  
  let sum = 0;
  let multiplier = 2;
  
  for (let i = numbers.length - 1; i >= 0; i--) {
    sum += parseInt(numbers[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const expectedDv = 11 - (sum % 11);
  const calculatedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'k' : expectedDv.toString();
  
  return calculatedDv === dv.toLowerCase();
}
