import type { ReactNode } from 'react'
import AssessmentIcon from '@mui/icons-material/Assessment'
import BuildIcon from '@mui/icons-material/Build'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import ListAltIcon from '@mui/icons-material/ListAlt'
import TimerIcon from '@mui/icons-material/Timer'
import type { Role } from '../auth/roles'

export interface NavItem {
  label: string
  path: string
  icon: ReactNode
  /** Si se indica, la opción solo se muestra a ese rol (comodidad de UI). */
  role?: Role
}

export interface NavSection {
  title?: string
  items: NavItem[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { label: 'Vehículos', path: '/vehicles', icon: <DirectionsCarIcon /> },
      { label: 'Nuevo ingreso', path: '/repair-orders/new', icon: <BuildIcon /> },
      { label: 'Bonos', path: '/bonuses', icon: <CardGiftcardIcon /> },
      { label: 'Catálogo de reparaciones', path: '/repair-types', icon: <ListAltIcon /> },
    ],
  },
  {
    title: 'Reportes',
    items: [
      { label: 'R1: Ingresos y costos', path: '/reports/r1', icon: <AssessmentIcon /> },
      { label: 'R2: Por tipo de vehículo', path: '/reports/r2', icon: <AssessmentIcon />, role: 'ADMIN' },
      { label: 'R3: Tiempos de reparación', path: '/reports/r3', icon: <TimerIcon />, role: 'ADMIN' },
      { label: 'R4: Por tipo de motor', path: '/reports/r4', icon: <AssessmentIcon />, role: 'ADMIN' },
    ],
  },
]
