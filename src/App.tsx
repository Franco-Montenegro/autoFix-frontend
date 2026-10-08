import { QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router'
import { queryClient } from './api/queryClient'
import { AuthProvider } from './auth/AuthProvider'
import { router } from './router'
import { theme } from './theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
