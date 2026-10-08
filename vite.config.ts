import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Origen permitido por el CORS del backend y por el cliente de Keycloak
    port: 5173,
    strictPort: true,
  },
})
