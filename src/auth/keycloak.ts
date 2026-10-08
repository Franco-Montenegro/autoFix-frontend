import Keycloak from 'keycloak-js'
import { config } from '../config'

// Única instancia de Keycloak. El token vive solo en memoria (dentro de keycloak-js).
export const keycloak = new Keycloak({
  url: config.keycloakUrl,
  realm: config.keycloakRealm,
  clientId: config.keycloakClientId,
})

/** Inicia sesión: si no hay sesión activa, redirige al login de Keycloak. */
export async function initKeycloak(): Promise<void> {
  await keycloak.init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
    checkLoginIframe: false,
  })
}

/** Devuelve un token vigente, renovándolo si le quedan menos de 30 s. */
export async function getValidToken(): Promise<string> {
  try {
    await keycloak.updateToken(30)
  } catch {
    await keycloak.login()
  }
  if (!keycloak.token) {
    throw new Error('No hay una sesión activa')
  }
  return keycloak.token
}
