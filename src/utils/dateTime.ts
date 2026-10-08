function pad(value: number): string {
  return String(value).padStart(2, '0')
}

/** Fecha y hora local actual en el formato de un input `datetime-local` (`YYYY-MM-DDTHH:mm`). */
export function nowForInput(): string {
  const now = new Date()
  return (
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
    `T${pad(now.getHours())}:${pad(now.getMinutes())}`
  )
}

/** Convierte el valor de un input `datetime-local` al formato de la API (ISO sin zona, con segundos). */
export function inputToApiDateTime(value: string): string {
  return value.length === 16 ? `${value}:00` : value
}
