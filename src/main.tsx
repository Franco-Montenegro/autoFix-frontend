import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { initKeycloak } from './auth/keycloak'

const root = createRoot(document.getElementById('root') as HTMLElement)

// Keycloak se inicia una sola vez, fuera de React (StrictMode monta dos veces en desarrollo).
// Con "login-required", si no hay sesión el navegador se redirige al login de Keycloak.
initKeycloak()
  .then(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
  .catch((error: unknown) => {
    console.error(error)
    root.render(
      <p style={{ fontFamily: 'sans-serif', padding: 24 }}>
        No se pudo conectar con el servidor de autenticación. Verifique que Keycloak esté
        disponible y recargue la página.
      </p>,
    )
  })
