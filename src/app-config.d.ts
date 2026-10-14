// Configuración entregada por /config.js antes de cargar la app (ver public/config.js).

interface AppRuntimeConfig {
  apiUrl?: string
  keycloakUrl?: string
  keycloakRealm?: string
  keycloakClientId?: string
}

interface Window {
  __APP_CONFIG__?: AppRuntimeConfig
}
