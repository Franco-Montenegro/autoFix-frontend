import { getR2 } from '../../api/reports'
import { VEHICLE_TYPE_LABELS } from '../../utils/labels'
import { RepairMatrixTable } from './RepairMatrixTable'
import { ReportPage } from './ReportPage'

export function R2Page() {
  return (
    <ReportPage
      title="R2: Reparaciones por tipo de vehículo"
      description="Cantidad de reparaciones y monto a precio de lista, solo de ingresos entregados."
      report="r2"
      fetch={getR2}
    >
      {(data) => (
        <RepairMatrixTable
          data={data}
          columns={data.vehicleTypes}
          columnLabels={VEHICLE_TYPE_LABELS}
        />
      )}
    </ReportPage>
  )
}
