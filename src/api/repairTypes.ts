import type { RepairType } from '../types/repairType'
import { apiRequest } from './client'

export function getRepairTypes(): Promise<RepairType[]> {
  return apiRequest<RepairType[]>('/repair-types')
}
