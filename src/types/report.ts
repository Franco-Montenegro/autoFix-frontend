import type { EngineType, RepairOrderStatus, VehicleType } from './enums'

/** Montos del desglose de costo; `null` si el ingreso aún no tiene costo calculado. */
export interface R1Amounts<T extends number | null> {
  repairsSubtotal: T
  mileageSurcharge: T
  ageSurcharge: T
  delaySurcharge: T
  repairCountDiscount: T
  dayDiscount: T
  bonusDiscount: T
  taxAmount: T
  totalAmount: T
}

export interface R1Row extends R1Amounts<number | null> {
  repairOrderId: number
  licensePlate: string
  brand: string
  model: string
  vehicleType: VehicleType
  engineType: EngineType
  entryDateTime: string
  readyDateTime: string | null
  pickupDateTime: string | null
  status: RepairOrderStatus
}

export interface R1Totals extends R1Amounts<number> {
  /** Cantidad de filas del reporte. */
  orderCount: number
  /** Filas con costo calculado: las que entran en la suma. */
  calculatedCount: number
}

export interface R1Report {
  from: string
  to: string
  rows: R1Row[]
  totals: R1Totals
}

export interface CountAmount {
  count: number
  amount: number
}

export interface MatrixRow<K extends string> {
  repairTypeId: number
  name: string
  cells: Record<K, CountAmount>
  total: CountAmount
}

/** Estructura común de R2 y R4: reparaciones × columnas, con totales. */
export interface MatrixReportData<K extends string> {
  from: string
  to: string
  rows: MatrixRow<K>[]
  columnTotals: Record<K, CountAmount>
  grandTotal: CountAmount
}

export interface R2Report extends MatrixReportData<VehicleType> {
  vehicleTypes: VehicleType[]
}

export interface R4Report extends MatrixReportData<EngineType> {
  engineTypes: EngineType[]
}

export interface R3Row {
  vehicleType: VehicleType
  count: number
  average: number | null
  standardDeviation: number | null
  min: number | null
  max: number | null
  p90: number | null
}

export interface R3Report {
  from: string
  to: string
  unit: 'HOURS'
  rows: R3Row[]
}
