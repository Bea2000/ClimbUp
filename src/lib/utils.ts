export function generateRandomCode(numDigits: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < numDigits; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}


export function formatCurrency(value: string) {
  return `$${parseInt(value.replace(/\D/g, '') || '0').toLocaleString('es-CL')}`;
}

export function unformatCurrency(value: string) {
  return value.replace(/\D/g, '');
}


export function formatPrice(price: string) {
  return parseInt(price.replace(/\./g, ''), 10);
}
