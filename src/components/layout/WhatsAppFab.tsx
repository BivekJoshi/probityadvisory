import { AnimatePresence, motion } from 'framer-motion'
import { WhatsApp } from '@/components/icons'
import { brandEase } from '@/components/motion'
import { site } from '@/config/site'
import { useScrolledPast } from '@/hooks/useScrolledPast'

/** WhatsApp shortcut that appears once the masthead has scrolled out of view. */
export function WhatsAppFab() {
  const shown = useScrolledPast(560)

  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          href={`https://wa.me/${site.phoneUKRaw}`}
          target="_blank"
          rel="noopener"
          aria-label="Message us on WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.3, ease: brandEase }}
          className="fixed bottom-5 right-5 z-40 grid size-13 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-[filter] duration-200 hover:brightness-105 sm:bottom-7 sm:right-7"
        >
          <WhatsApp className="size-6.5" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
