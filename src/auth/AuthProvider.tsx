import { useState, type ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from './AuthContext'
import { keycloak } from './keycloak'
import type { Role } from './roles'

const KNOWN_ROLES: readonly Role[] = ['ADMIN', 'USER']

function readAuth(): AuthContextValue {
  const parsed = keycloak.tokenParsed
  const preferred: unknown = parsed?.preferred_username
  const username = typeof preferred === 'string' ? preferred : 'Usuario'
  const roles = KNOWN_ROLES.filter((role) => keycloak.hasRealmRole(role))

  return {
    username,
    roles,
    hasRole: (role) => roles.includes(role),
    logout: () => {
      void keycloak.logout({ redirectUri: `${window.location.origin}/` })
    },
  }
}

/** Expone el usuario y sus roles. Se monta después de que Keycloak inició sesión. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth] = useState(readAuth)
  return <AuthContext value={auth}>{children}</AuthContext>
}
