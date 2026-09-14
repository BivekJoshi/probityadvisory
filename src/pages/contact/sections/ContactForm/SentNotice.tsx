import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { brandEase } from '@/components/motion'
import { site } from '@/config/site'

/** Confirms the hand-off to the visitor's mail client, with our address as the fallback. */
export function SentNotice({ sent }: { sent: boolean }) {
  return (
    <AnimatePresence>
      {sent && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: brandEase }}
          role="status"
          className="flex items-start gap-2.5 rounded-xl border border-gold/50 bg-gold-soft px-4 py-3 text-[14px] text-gold-ink"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          Your mail client should have opened with the enquiry ready to send. If it did not, email
          us directly at {site.email}.
        </motion.p>
      )}
    </AnimatePresence>
  )
}
