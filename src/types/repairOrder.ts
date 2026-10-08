import type { RepairOrderStatus } from './enums'

export interface RepairOrderItem {
  repairTypeId: number
  name: string
  /** Precio congelado al registrar el ingreso, según el motor del vehículo. */
  price: number
}

export interface RepairOrderBonus {
  id: number
  brand: string
  /** Valor nominal del bono. */
  amount: number
}

export interface RepairOrderCost {
  repairsSubtotal: number
  mileageSurcharge: number
  ageSurcharge: number
  delaySurcharge: number
  repairCountDiscount: number
  dayDiscount: number
  /** Monto del bono efectivamente aplicado. */
  bonusDiscount: number
  taxAmount: number
  totalAmount: number
}

export interface CreateRepairOrderRequest {
  licensePlate: string
  /** Fecha y hora ISO-8601 sin zona horaria. */
  entryDateTime: string
  mileage: number
  repairTypeIds: number[]
}

/** Body de los registros de salida y de retiro. */
export interface RepairOrderDateTimeRequest {
  /** Fecha y hora ISO-8601 sin zona horaria. */
  dateTime: string
}

export interface RepairOrderResponse {
  id: number
  licensePlate: string
  /** Fecha y hora ISO-8601 sin zona horaria. */
  entryDateTime: string
  mileage: number
  readyDateTime: string | null
  pickupDateTime: string | null
  status: RepairOrderStatus
  items: RepairOrderItem[]
  bonus: RepairOrderBonus | null
  /** `null` hasta que se registra el retiro. */
  cost: RepairOrderCost | null
}
