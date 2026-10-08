import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { CountAmount, MatrixReportData } from '../../types/report'
import { formatCLP } from '../../utils/format'

interface RepairMatrixTableProps<K extends string> {
  data: MatrixReportData<K>
  /** Orden de las columnas, tal como lo entrega la API. */
  columns: K[]
  columnLabels: Record<K, string>
}

function MatrixCell({ value, total = false }: { value: CountAmount; total?: boolean }) {
  const empty = value.count === 0
  return (
    <TableCell align="right" sx={{ bgcolor: total ? 'action.hover' : undefined, whiteSpace: 'nowrap' }}>
      <Box sx={{ color: empty ? 'text.disabled' : undefined, fontWeight: total ? 600 : undefined }}>
        <Typography variant="body2" component="div" sx={{ fontWeight: 'inherit' }}>
          {value.count}
        </Typography>
        <Typography
          variant="caption"
          component="div"
          color={empty ? 'inherit' : 'text.secondary'}
          sx={{ fontWeight: 'inherit' }}
        >
          {formatCLP(value.amount)}
        </Typography>
      </Box>
    </TableCell>
  )
}

/** Matriz reparaciones × columnas con cantidad y monto por celda (R2 y R4). */
export function RepairMatrixTable<K extends string>({
  data,
  columns,
  columnLabels,
}: RepairMatrixTableProps<K>) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Reparación</TableCell>
            {columns.map((column) => (
              <TableCell key={column} align="right">
                {columnLabels[column]}
              </TableCell>
            ))}
            <TableCell align="right" sx={{ bgcolor: 'action.hover', fontWeight: 600 }}>
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row) => (
            <TableRow key={row.repairTypeId} hover>
              <TableCell>{row.name}</TableCell>
              {columns.map((column) => (
                <MatrixCell key={column} value={row.cells[column]} />
              ))}
              <MatrixCell value={row.total} total />
            </TableRow>
          ))}
          <TableRow>
            <TableCell sx={{ bgcolor: 'action.hover', fontWeight: 600 }}>Total</TableCell>
            {columns.map((column) => (
              <MatrixCell key={column} value={data.columnTotals[column]} total />
            ))}
            <MatrixCell value={data.grandTotal} total />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
