import { getR4 } from '../../api/reports'
import { ENGINE_TYPE_LABELS } from '../../utils/labels'
import { RepairMatrixTable } from './RepairMatrixTable'
import { ReportPage } from './ReportPage'

export function R4Page() {
  return (
    <ReportPage
      title="R4: Reparaciones por tipo de motor"
      description="Cantidad de reparaciones y monto a precio de lista, solo de ingresos entregados."
      report="r4"
      fetch={getR4}
    >
      {(data) => (
        <RepairMatrixTable data={data} columns={data.engineTypes} columnLabels={ENGINE_TYPE_LABELS} />
      )}
    </ReportPage>
  )
}
