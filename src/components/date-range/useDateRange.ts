import { useSearchParams } from 'react-router'
import { currentMonthRange } from '../../utils/dateTime'

export interface DateRange {
  from: string
  to: string
}

/**
 * Rango de fechas de los reportes, guardado en la URL (`?from=…&to=…`) para que se
 * mantenga al cambiar de reporte y se pueda compartir. Por defecto, el mes actual.
 */
export function useDateRange(): [DateRange, (range: DateRange) => void] {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaults = currentMonthRange()
  const range = {
    from: searchParams.get('from') ?? defaults.from,
    to: searchParams.get('to') ?? defaults.to,
  }
  const setRange = (next: DateRange) => setSearchParams({ from: next.from, to: next.to })
  return [range, setRange]
}
