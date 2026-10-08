import type { ReactNode } from 'react'
import { Alert } from '@mui/material'
import { useAuth } from './useAuth'
import type { Role } from './roles'

/**
 * Muestra el contenido solo si el usuario tiene el rol. Es comodidad de UI:
 * la autorización real la aplica la API (403).
 */
export function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { hasRole } = useAuth()
  if (!hasRole(role)) {
    return <Alert severity="warning">No tiene permisos para acceder a esta página.</Alert>
  }
  return children
}
