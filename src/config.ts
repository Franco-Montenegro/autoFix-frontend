// Configuración pública de la app (sin secretos).
// En el contenedor la entrega /config.js (window.__APP_CONFIG__), generado al arrancar;
// en desarrollo (pnpm dev) se usan las variables VITE_* de .env.local.

type ConfigKey = keyof AppRuntimeConfig

const ENV_FALLBACK: Record<ConfigKey, keyof ImportMetaEnv> = {
  apiUrl: 'VITE_API_URL',
  keycloakUrl: 'VITE_KEYCLOAK_URL',
  keycloakRealm: 'VITE_KEYCLOAK_REALM',
  keycloakClientId: 'VITE_KEYCLOAK_CLIENT_ID',
}

function nonEmpty(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
}

function readConfig(key: ConfigKey): string {
  const envName = ENV_FALLBACK[key]
  const value = nonEmpty(window.__APP_CONFIG__?.[key]) ?? nonEmpty(import.meta.env[envName])
  if (value === undefined) {
    throw new Error(`Falta la configuración ${key} (config.js) o la variable ${envName} (ver .env.example)`)
  }
  return value.replace(/\/+$/, '')
}

export const config = {
  apiUrl: readConfig('apiUrl'),
  keycloakUrl: readConfig('keycloakUrl'),
  keycloakRealm: readConfig('keycloakRealm'),
  keycloakClientId: readConfig('keycloakClientId'),
} as const
