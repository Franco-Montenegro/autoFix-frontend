import type {
  CreateRepairOrderRequest,
  RepairOrderDateTimeRequest,
  RepairOrderResponse,
} from '../types/repairOrder'
import { apiRequest } from './client'

export function createRepairOrder(request: CreateRepairOrderRequest): Promise<RepairOrderResponse> {
  return apiRequest<RepairOrderResponse>('/repair-orders', { method: 'POST', body: request })
}

export function getRepairOrder(id: string): Promise<RepairOrderResponse> {
  return apiRequest<RepairOrderResponse>(`/repair-orders/${encodeURIComponent(id)}`)
}

/** Registra la salida de la reparación (IN_REPAIR → READY). */
export function registerReady(
  id: number,
  request: RepairOrderDateTimeRequest,
): Promise<RepairOrderResponse> {
  return apiRequest<RepairOrderResponse>(`/repair-orders/${id}/ready`, {
    method: 'PATCH',
    body: request,
  })
}

/** Registra el retiro del vehículo (READY → DELIVERED); la API calcula el costo. */
export function registerPickup(
  id: number,
  request: RepairOrderDateTimeRequest,
): Promise<RepairOrderResponse> {
  return apiRequest<RepairOrderResponse>(`/repair-orders/${id}/pickup`, {
    method: 'PATCH',
    body: request,
  })
}
