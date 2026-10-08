import { createBrowserRouter, Navigate, Outlet } from 'react-router'
import { RequireRole } from './auth/RequireRole'
import { AppLayout } from './components/AppLayout'
import { ComingSoonPage } from './components/ComingSoonPage'
import { BonusesPage } from './pages/bonuses/BonusesPage'
import { NewRepairOrderPage } from './pages/repair-orders/NewRepairOrderPage'
import { RepairOrderDetailPage } from './pages/repair-orders/RepairOrderDetailPage'
import { R1Page } from './pages/reports/R1Page'
import { R2Page } from './pages/reports/R2Page'
import { R3Page } from './pages/reports/R3Page'
import { R4Page } from './pages/reports/R4Page'
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
      { path: 'reports/r1', element: <R1Page /> },
      {
        element: (
          <RequireRole role="ADMIN">
            <Outlet />
          </RequireRole>
        ),
        children: [
          { path: 'reports/r2', element: <R2Page /> },
          { path: 'reports/r3', element: <R3Page /> },
          { path: 'reports/r4', element: <R4Page /> },
        ],
      },
      { path: '*', element: <ComingSoonPage title="Página no encontrada" /> },
    ],
  },
])
