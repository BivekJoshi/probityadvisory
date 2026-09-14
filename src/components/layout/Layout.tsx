import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import { ScrollProgress } from './ScrollProgress'
import { SkipLink } from './SkipLink'
import { TopBar } from './TopBar'
import { WhatsAppFab } from './WhatsAppFab'
import { useScrollReset } from './useScrollReset'

export function Layout() {
  const { pathname } = useLocation()
  useScrollReset()

  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <ScrollProgress />
      <TopBar />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
