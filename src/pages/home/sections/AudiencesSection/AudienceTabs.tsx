import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, brandEase } from '@/components/motion'
import { audiences } from '@/content/audiences'
import { AudiencePanel } from './AudiencePanel'
import { AudienceTabList } from './AudienceTabList'

/** Practices and direct clients, one tab each, so both read an answer written for them. */
export function AudienceTabs() {
  const [active, setActive] = useState(0)
  const audience = audiences[active]

  return (
    <Reveal className="overflow-hidden rounded-3xl border border-line bg-card shadow-card">
      <AudienceTabList active={active} onSelect={setActive} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={audience.key}
          role="tabpanel"
          id={`audience-panel-${audience.key}`}
          aria-labelledby={`audience-tab-${audience.key}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: brandEase }}
          className="grid gap-10 p-[clamp(24px,4vw,48px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14"
        >
          <AudiencePanel audience={audience} />
        </motion.div>
      </AnimatePresence>
    </Reveal>
  )
}
