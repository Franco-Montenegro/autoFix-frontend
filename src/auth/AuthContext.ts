import { createContext } from 'react'
import type { Role } from './roles'

export interface AuthContextValue {
  username: string
  roles: Role[]
  hasRole: (role: Role) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
