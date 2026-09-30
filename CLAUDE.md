# autoFix-frontend

Frontend web del proyecto autoFix. Este repo es solo el frontend; la API REST vive en `../autoFix-backend`.

## Stack
- React + TypeScript (modo `strict`) con Vite (plantilla `react-ts`)
- pnpm 11 como gestor de paquetes (nunca npm ni yarn)
- MUI (Material UI) + `@mui/icons-material`
- React Router
- TanStack Query para el estado del servidor
- `fetch` nativo con un wrapper propio (sin axios)
- `keycloak-js` para el login (cliente `autofix-frontend`, PKCE S256)

## Documentación compartida (en `../docs/`)
- `api.md`: **contrato con el backend**, con rutas, bodies, respuestas, errores y roles. Consúltalo antes de consumir cualquier endpoint y tipa las respuestas según lo que dice.
- `plan.md`: plan de trabajo; la sección "Fase 9" tiene el detalle del frontend.
- `enunciado.md` y `modelo-datos.md`: reglas de negocio y decisiones.

No leas estos documentos completos en cada tarea: lee solo la sección relevante.
Si el frontend necesita algo que la API no ofrece, no lo resuelvas con lógica duplicada en el cliente: avísame para cambiar primero el backend.

## Alcance actual
- Dentro de alcance: desarrollo y ejecución local del frontend (Fase 9 y sus subfases 9.1 a 9.5).
- Fuera de alcance por ahora: tests del frontend y Dockerfile/Nginx de producción. No los implementes ni configures todavía.
- Escribe el código de forma que esas etapas no se dificulten: configuración por variables de entorno y capas desacopladas.

## Arquitectura (`src/`)
- `api/`: `client.ts` (URL base, token Bearer, JSON, `ApiError`) y un módulo por recurso. Los componentes nunca llaman a `fetch` directamente.
- `types/`: tipos que reflejan `api.md`.
- `auth/`: Keycloak, `AuthProvider`, `useAuth`, guarda `RequireRole`.
- `components/`: componentes reutilizables (layout, alertas, diálogos, selector de rango de fechas).
- `pages/`: una carpeta por módulo (`vehicles`, `repair-orders`, `bonuses`, `reports`).
- `utils/`: formato de montos (CLP), fechas y horas (`es-CL`) y etiquetas en español de los enums.

## Convenciones de código
- Componentes funcionales y hooks; nada de componentes de clase.
- Sin `any`; si un tipo no se conoce, usa `unknown` y estréchalo.
- Nombres en inglés para archivos, componentes, funciones y variables; **todos los textos visibles en español**.
- Los enums de la API se muestran traducidos (ej. `VAN` → "Furgoneta", `IN_REPAIR` → "En reparación").
- Montos siempre formateados como pesos chilenos; `null` se muestra como "—".
- Validación en el navegador solo básica (obligatorios, formato de patente); la que vale es la del backend. Muestra `errors[]` de la API en el campo correspondiente y `message` en una alerta.
- Cambios pequeños y enfocados: una funcionalidad por vez.

## Seguridad
- Dependencias: versiones exactas (sin `^`/`~`), `pnpm-lock.yaml` versionado, scripts de instalación bloqueados salvo autorización explícita y antigüedad mínima de versiones configurada en pnpm.
- Antes de agregar una dependencia nueva, propónla y justifícala; espera mi aprobación.
- Las variables `VITE_*` son públicas (quedan en el bundle): nunca pongas secretos en ellas.
- El token lo maneja `keycloak-js` en memoria; nunca lo guardes en `localStorage` ni `sessionStorage`.
- Ocultar opciones del menú según rol es solo comodidad de UI; la autorización real la aplica la API.
- Nunca escribas credenciales en código, en archivos versionados ni en el chat.

## Configuración
- Variables: `VITE_API_URL`, `VITE_KEYCLOAK_URL`, `VITE_KEYCLOAK_REALM`, `VITE_KEYCLOAK_CLIENT_ID`.
- Se versiona `.env.example`; los valores locales van en `.env.local` (ignorado por git).
- Dev server en el puerto **5173** fijo (`strictPort`): es el origen permitido por el CORS del backend y por el cliente de Keycloak.

## Entorno local para probar
- Backend: `http://localhost:8090` (lo levanto yo desde IntelliJ).
- Keycloak: `http://localhost:8080`, realm `autofix` (Docker Compose en `../autoFix-backend/keycloak`).
- Usuarios de prueba: `admin` (rol ADMIN) y `user` (rol USER). Las contraseñas están en `../autoFix-backend/keycloak/.env`; si necesitas un token para verificar la API, léelas desde ese archivo dentro del comando sin mostrarlas.

## Cómo trabajar conmigo
- Para tareas grandes, propón primero un plan y espera mi aprobación antes de escribir código.
- Trabaja solo la subfase que te pida; no avances a la siguiente por tu cuenta.
- Al terminar cada subfase: `pnpm build` y `pnpm lint` sin errores, y `pnpm audit` revisado.
- Al terminar, indícame cómo probar lo que hiciste (pasos en el navegador y resultado esperado).
- No ejecutes git commit ni git push; los hago yo.
