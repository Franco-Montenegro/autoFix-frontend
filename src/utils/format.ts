const clpFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

/** Formatea un monto en pesos chilenos; `null` se muestra como "—". */
export function formatCLP(amount: number | null): string {
  return amount === null ? '—' : clpFormatter.format(amount)
}
