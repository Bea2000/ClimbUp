export const FORM_FIELDS = {
  name: {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Ej: Iron Fest 2024',
  },
  location: {
    name: 'location',
    label: 'Ubicación',
    type: 'text',
    placeholder: 'Ej: Pdte. Riesco 5330, Las Condes',
  },
  date: {
    name: 'date',
    label: 'Fecha y Hora',
    type: 'datetime-local',
  },
  duration: {
    name: 'duration',
    label: 'Duración (minutos)',
    type: 'number',
    placeholder: 'Ej: 90',
    min: '30',
    step: '30',
  },
  code: {
    name: 'code',
    label: 'Código',
    type: 'text',
    placeholder: 'Código para que jueces ingresen a la competencia',
  },
} as const;
