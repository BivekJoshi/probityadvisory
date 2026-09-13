import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollProgress } from './ScrollProgress'
import { TopBar } from './TopBar'
import { WhatsAppFab } from './WhatsAppFab'

export function Layout() {
  const { pathname, hash } = useLocation()

  // Start each page at the top, the way a real page load would. Pages that own
  // #anchors (Services) scroll to them themselves once their content exists.
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-100 focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-[14px] focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
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
