import { Link as RouterLink } from 'react-router'
import {
  Alert,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { getR1 } from '../../api/reports'
import { RepairOrderStatusChip } from '../../components/RepairOrderStatusChip'
import type { R1Amounts, R1Report } from '../../types/report'
import { formatCLP, formatDateTime } from '../../utils/format'
import { ENGINE_TYPE_LABELS, VEHICLE_TYPE_LABELS } from '../../utils/labels'
import { ReportPage } from './ReportPage'

type AmountField = keyof R1Amounts<number>

const AMOUNT_COLUMNS: { field: AmountField; label: string; discount?: boolean }[] = [
  { field: 'repairsSubtotal', label: 'Subtotal reparaciones' },
  { field: 'mileageSurcharge', label: 'Recargo km' },
  { field: 'ageSurcharge', label: 'Recargo antigüedad' },
  { field: 'delaySurcharge', label: 'Recargo retraso' },
  { field: 'repairCountDiscount', label: 'Dcto. n.º reparaciones', discount: true },
  { field: 'dayDiscount', label: 'Dcto. día de atención', discount: true },
  { field: 'bonusDiscount', label: 'Dcto. bono', discount: true },
  { field: 'taxAmount', label: 'IVA' },
  { field: 'totalAmount', label: 'Total' },
]

/** Columnas de datos antes de los montos (para el ancho de la etiqueta de totales). */
const INFO_COLUMNS = 9

function formatAmount(amount: number | null, discount = false): string {
  return discount && amount !== null && amount > 0 ? `− ${formatCLP(amount)}` : formatCLP(amount)
}

const nowrap = { whiteSpace: 'nowrap' } as const
const bold = { fontWeight: 600, whiteSpace: 'nowrap' } as const

function R1Table({ data }: { data: R1Report }) {
  if (data.rows.length === 0) {
    return <Alert severity="info">No hay ingresos en el rango seleccionado.</Alert>
  }
  const { totals } = data
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>N.º</TableCell>
              <TableCell>Patente</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Motor</TableCell>
              <TableCell>Ingreso</TableCell>
              <TableCell>Salida</TableCell>
              <TableCell>Retiro</TableCell>
              <TableCell>Estado</TableCell>
              {AMOUNT_COLUMNS.map((column) => (
                <TableCell key={column.field} align="right">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows.map((row) => (
              <TableRow key={row.repairOrderId} hover>
                <TableCell>
                  <Link component={RouterLink} to={`/repair-orders/${row.repairOrderId}`}>
                    {row.repairOrderId}
                  </Link>
                </TableCell>
                <TableCell>{row.licensePlate}</TableCell>
                <TableCell sx={nowrap}>
                  {row.brand} {row.model}
                </TableCell>
                <TableCell>{VEHICLE_TYPE_LABELS[row.vehicleType]}</TableCell>
                <TableCell>{ENGINE_TYPE_LABELS[row.engineType]}</TableCell>
                <TableCell sx={nowrap}>{formatDateTime(row.entryDateTime)}</TableCell>
                <TableCell sx={nowrap}>{formatDateTime(row.readyDateTime)}</TableCell>
                <TableCell sx={nowrap}>{formatDateTime(row.pickupDateTime)}</TableCell>
                <TableCell>
                  <RepairOrderStatusChip status={row.status} />
                </TableCell>
                {AMOUNT_COLUMNS.map((column) => (
                  <TableCell
                    key={column.field}
                    align="right"
                    sx={column.field === 'totalAmount' ? bold : nowrap}
                  >
                    {formatAmount(row[column.field], column.discount)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell colSpan={INFO_COLUMNS} sx={bold}>
                Totales ({totals.calculatedCount} de {totals.orderCount} ingresos)
              </TableCell>
              {AMOUNT_COLUMNS.map((column) => (
                <TableCell key={column.field} align="right" sx={bold}>
                  {formatAmount(totals[column.field], column.discount)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        La suma incluye {totals.calculatedCount} de {totals.orderCount} ingresos: solo los
        entregados, que tienen su costo calculado. Los montos sin calcular se muestran como "—".
      </Typography>
    </>
  )
}

export function R1Page() {
  return (
    <ReportPage
      title="R1: Ingresos y costos"
      description="Ingresos al taller del rango (por fecha de ingreso) con el desglose de su costo."
      report="r1"
      fetch={getR1}
    >
      {(data) => <R1Table data={data} />}
    </ReportPage>
  )
}
