import { createBrowserRouter, Navigate, Outlet } from 'react-router'
import { RequireRole } from './auth/RequireRole'
import { AppLayout } from './components/AppLayout'
import { ComingSoonPage } from './components/ComingSoonPage'
import { RepairTypesPage } from './pages/repair-types/RepairTypesPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/repair-types" replace /> },
      { path: 'repair-types', element: <RepairTypesPage /> },
      { path: 'vehicles', element: <ComingSoonPage title="Vehículos" /> },
      { path: 'repair-orders/new', element: <ComingSoonPage title="Nuevo ingreso" /> },
      { path: 'bonuses', element: <ComingSoonPage title="Bonos" /> },
      { path: 'reports/r1', element: <ComingSoonPage title="R1: Ingresos y costos" /> },
      {
        element: (
          <RequireRole role="ADMIN">
            <Outlet />
          </RequireRole>
        ),
        children: [
          { path: 'reports/r2', element: <ComingSoonPage title="R2: Por tipo de vehículo" /> },
          { path: 'reports/r3', element: <ComingSoonPage title="R3: Tiempos de reparación" /> },
          { path: 'reports/r4', element: <ComingSoonPage title="R4: Por tipo de motor" /> },
        ],
      },
      { path: '*', element: <ComingSoonPage title="Página no encontrada" /> },
    ],
  },
])
