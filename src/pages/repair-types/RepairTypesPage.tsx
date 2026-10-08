import { useQuery } from '@tanstack/react-query'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { getRepairTypes } from '../../api/repairTypes'
import { ErrorAlert } from '../../components/ErrorAlert'
import { Loading } from '../../components/Loading'
import { PageHeader } from '../../components/PageHeader'
import { RepairPrice } from '../../components/RepairPrice'
import type { EngineType } from '../../types/enums'
import { ENGINE_TYPE_LABELS } from '../../utils/labels'
import { priceForEngine } from '../../utils/repairTypes'

const ENGINES = Object.keys(ENGINE_TYPE_LABELS) as EngineType[]

export function RepairTypesPage() {
  const { data, isPending, error } = useQuery({
    queryKey: ['repair-types'],
    queryFn: getRepairTypes,
  })

  return (
    <>
      <PageHeader title="Catálogo de reparaciones" />
      {isPending && <Loading />}
      {error && <ErrorAlert error={error} />}
      {data && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Reparación</TableCell>
                {ENGINES.map((engine) => (
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
                  {ENGINES.map((engine) => (
                    <TableCell key={engine} align="right">
                      <RepairPrice price={priceForEngine(repair, engine)} />
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
