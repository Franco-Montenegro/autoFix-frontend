import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Typography } from '@mui/material'
import { reportQueryKey, type ReportName } from '../../api/reports'
import { DateRangePicker } from '../../components/date-range/DateRangePicker'
import { useDateRange } from '../../components/date-range/useDateRange'
import { ErrorAlert } from '../../components/ErrorAlert'
import { Loading } from '../../components/Loading'
import { PageHeader } from '../../components/PageHeader'

interface ReportPageProps<T> {
  title: string
  description: string
  report: ReportName
  fetch: (from: string, to: string) => Promise<T>
  children: (data: T) => ReactNode
}

/** Estructura común de los reportes: título, rango de fechas y estados de carga y error. */
export function ReportPage<T>({ title, description, report, fetch, children }: ReportPageProps<T>) {
  const [range, setRange] = useDateRange()
  const { data, isPending, error } = useQuery({
    queryKey: reportQueryKey(report, range.from, range.to),
    queryFn: () => fetch(range.from, range.to),
  })

  return (
    <>
      <PageHeader title={title} />
      <Typography color="text.secondary" sx={{ mt: -2, mb: 3 }}>
        {description}
      </Typography>
      <DateRangePicker
        // Se reinicia si el rango cambia desde fuera (ej. al navegar por la URL).
        key={`${range.from}_${range.to}`}
        value={range}
        onChange={setRange}
      />
      {isPending && <Loading />}
      {error && <ErrorAlert error={error} />}
      {data !== undefined && children(data)}
    </>
  )
}
