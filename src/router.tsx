import { createBrowserRouter, Navigate, Outlet } from 'react-router'
import { RequireRole } from './auth/RequireRole'
import { AppLayout } from './components/AppLayout'
import { ComingSoonPage } from './components/ComingSoonPage'
import { BonusesPage } from './pages/bonuses/BonusesPage'
import { NewRepairOrderPage } from './pages/repair-orders/NewRepairOrderPage'
import { RepairOrderDetailPage } from './pages/repair-orders/RepairOrderDetailPage'
import { RepairTypesPage } from './pages/repair-types/RepairTypesPage'
import { VehicleDetailPage } from './pages/vehicles/VehicleDetailPage'
import { VehiclesPage } from './pages/vehicles/VehiclesPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/vehicles" replace /> },
      { path: 'repair-types', element: <RepairTypesPage /> },
      { path: 'vehicles', element: <VehiclesPage /> },
      { path: 'vehicles/:plate', element: <VehicleDetailPage /> },
      { path: 'repair-orders/new', element: <NewRepairOrderPage /> },
      { path: 'repair-orders/:id', element: <RepairOrderDetailPage /> },
      { path: 'bonuses', element: <BonusesPage /> },
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
