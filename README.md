# autoFix-frontend

Frontend web de autoFix (React + TypeScript + Vite + MUI). La API REST vive en `../autoFix-backend` y su contrato está en `../docs/api.md`.

## Requisitos

- Node.js 24 y pnpm 11 (versión fijada en `packageManager`).
- Backend en `http://localhost:8090` y Keycloak en `http://localhost:8080` (realm `autofix`).

## Puesta en marcha

```sh
pnpm install
cp .env.example .env.local   # ajustar si es necesario
pnpm dev                     # http://localhost:5173 (puerto fijo)
```

## Scripts

| Script | Uso |
|---|---|
| `pnpm dev` | Servidor de desarrollo en el puerto 5173 |
| `pnpm build` | Chequeo de tipos y build de producción |
| `pnpm lint` | ESLint |
| `pnpm audit` | Revisión de vulnerabilidades de dependencias |

## Seguridad de dependencias

Configurada en `pnpm-workspace.yaml`: versiones exactas, antigüedad mínima de 7 días y scripts de instalación bloqueados (se autorizan por nombre en `allowBuilds`).
