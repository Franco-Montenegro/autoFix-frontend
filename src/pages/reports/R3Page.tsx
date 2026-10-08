import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { getR3 } from '../../api/reports'
import type { R3Report, R3Row } from '../../types/report'
import { formatHours } from '../../utils/format'
import { VEHICLE_TYPE_LABELS } from '../../utils/labels'
import { ReportPage } from './ReportPage'

const STAT_COLUMNS: { field: keyof Omit<R3Row, 'vehicleType' | 'count'>; label: string }[] = [
  { field: 'average', label: 'Promedio' },
  { field: 'standardDeviation', label: 'Desviación estándar' },
  { field: 'min', label: 'Mínimo' },
  { field: 'max', label: 'Máximo' },
  { field: 'p90', label: 'Percentil 90' },
]

function R3Table({ data }: { data: R3Report }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Tipo de vehículo</TableCell>
            <TableCell align="right">Ingresos</TableCell>
            {STAT_COLUMNS.map((column) => (
              <TableCell key={column.field} align="right">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row) => (
            <TableRow key={row.vehicleType} hover>
              <TableCell>{VEHICLE_TYPE_LABELS[row.vehicleType]}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              {STAT_COLUMNS.map((column) => (
                <TableCell key={column.field} align="right" sx={{ whiteSpace: 'nowrap' }}>
                  {formatHours(row[column.field])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function R3Page() {
  return (
    <ReportPage
      title="R3: Tiempos de reparación"
      description="Horas entre el ingreso y la salida de la reparación, de los ingresos con salida registrada."
      report="r3"
      fetch={getR3}
    >
      {(data) => <R3Table data={data} />}
    </ReportPage>
  )
}
