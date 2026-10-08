import type { R1Report, R2Report, R3Report, R4Report } from '../types/report'
import { apiRequest } from './client'

export type ReportName = 'r1' | 'r2' | 'r3' | 'r4'

export function reportQueryKey(report: ReportName, from: string, to: string) {
  return ['reports', report, from, to] as const
}

function getReport<T>(report: ReportName, from: string, to: string): Promise<T> {
  return apiRequest<T>(`/reports/${report}`, { query: { from, to } })
}

export const getR1 = (from: string, to: string) => getReport<R1Report>('r1', from, to)
export const getR2 = (from: string, to: string) => getReport<R2Report>('r2', from, to)
export const getR3 = (from: string, to: string) => getReport<R3Report>('r3', from, to)
export const getR4 = (from: string, to: string) => getReport<R4Report>('r4', from, to)
