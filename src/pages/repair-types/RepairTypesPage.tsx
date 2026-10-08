import { useQuery } from '@tanstack/react-query'
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { getRepairTypes } from '../../api/repairTypes'
import { ErrorAlert } from '../../components/ErrorAlert'
import { PageHeader } from '../../components/PageHeader'
import type { EngineType } from '../../types/enums'
import type { RepairType } from '../../types/repairType'
import { formatCLP } from '../../utils/format'
import { ENGINE_TYPE_LABELS } from '../../utils/labels'

const PRICE_COLUMNS: { engine: EngineType; price: (repair: RepairType) => number }[] = [
  { engine: 'GASOLINE', price: (repair) => repair.priceGasoline },
  { engine: 'DIESEL', price: (repair) => repair.priceDiesel },
  { engine: 'HYBRID', price: (repair) => repair.priceHybrid },
  { engine: 'ELECTRIC', price: (repair) => repair.priceElectric },
]

export function RepairTypesPage() {
  const { data, isPending, error } = useQuery({
    queryKey: ['repair-types'],
    queryFn: getRepairTypes,
  })

  return (
    <>
      <PageHeader title="Catálogo de reparaciones" />
      {isPending && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <ErrorAlert error={error} />}
      {data && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Reparación</TableCell>
                {PRICE_COLUMNS.map(({ engine }) => (
                  <TableCell key={engine} align="right">
                    {ENGINE_TYPE_LABELS[engine]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((repair) => (
                <TableRow key={repair.id} hover>
                  <TableCell>{repair.name}</TableCell>
                  {PRICE_COLUMNS.map(({ engine, price }) => (
                    <TableCell key={engine} align="right">
                      {price(repair) === 0 ? (
                        <Typography variant="body2" color="text.disabled">
                          No aplica
                        </Typography>
                      ) : (
                        formatCLP(price(repair))
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
