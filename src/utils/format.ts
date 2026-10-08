const clpFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('es-CL')

const dateTimeFormatter = new Intl.DateTimeFormat('es-CL', {
  dateStyle: 'short',
  timeStyle: 'short',
})

/** Formatea un monto en pesos chilenos; `null` se muestra como "—". */
export function formatCLP(amount: number | null): string {
  return amount === null ? '—' : clpFormatter.format(amount)
}

const hoursFormatter = new Intl.NumberFormat('es-CL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Formatea un tiempo en horas con 2 decimales, ej. "16,25 h"; `null` se muestra como "—". */
export function formatHours(hours: number | null): string {
  return hours === null ? '—' : `${hoursFormatter.format(hours)} h`
}

/** Formatea un kilometraje, ej. "45.000 km". */
export function formatMileage(mileage: number): string {
  return `${numberFormatter.format(mileage)} km`
}

/**
 * Formatea una fecha y hora ISO-8601 sin zona horaria (como las envía la API);
 * `null` se muestra como "—".
 */
export function formatDateTime(isoDateTime: string | null): string {
  return isoDateTime === null ? '—' : dateTimeFormatter.format(new Date(isoDateTime))
}
