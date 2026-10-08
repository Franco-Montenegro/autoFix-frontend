import { use } from 'react'
import { AuthContext, type AuthContextValue } from './AuthContext'

export function useAuth(): AuthContextValue {
  const auth = use(AuthContext)
  if (!auth) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return auth
}
