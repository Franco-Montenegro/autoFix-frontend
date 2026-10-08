// Configuración leída de las variables de entorno de Vite (públicas: sin secretos).

function requireEnv(name: keyof ImportMetaEnv): string {
  const value: unknown = import.meta.env[name]
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Falta la variable de entorno ${name} (ver .env.example)`)
  }
  return value.trim().replace(/\/+$/, '')
}

export const config = {
  apiUrl: requireEnv('VITE_API_URL'),
  keycloakUrl: requireEnv('VITE_KEYCLOAK_URL'),
  keycloakRealm: requireEnv('VITE_KEYCLOAK_REALM'),
  keycloakClientId: requireEnv('VITE_KEYCLOAK_CLIENT_ID'),
} as const
