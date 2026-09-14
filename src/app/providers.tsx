import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from '@/features/theme'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {/* one switch for the whole site: reduced-motion users keep fades, lose movement */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>{children}</BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  )
}
