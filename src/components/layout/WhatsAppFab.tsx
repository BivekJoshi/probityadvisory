import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { WhatsApp } from '@/components/icons/Brand'
import { site } from '@/data/site'

/** WhatsApp shortcut that appears once the masthead has scrolled out of view. */
export function WhatsAppFab() {
  const [shown, setShown] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > 560))

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
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-40 grid size-13 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-[filter] duration-200 hover:brightness-105 sm:bottom-7 sm:right-7"
        >
          <WhatsApp className="size-6.5" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
