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

/**
 * Verifica si la fecha de una competencia ya ha pasado
 * @param competitionDate - Fecha de la competencia (almacenada en UTC en la base de datos)
 * @returns true si la fecha de la competencia ya pasó, false en caso contrario
 */
export function isCompetitionDatePassed(competitionDate: Date | string): boolean {
  const currentDate = new Date();
  const dateToCompare = new Date(competitionDate);

  return currentDate > dateToCompare;
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
    
  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h ${remainingMinutes}min`
  } else if (hours > 0) {
    return `${hours} hora${hours > 1 ? 's' : ''}`
  } 
  return `${remainingMinutes} minutos`
    
}
