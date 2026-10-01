import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, CircleAlert } from 'lucide-react'
import { brandEase } from '@/components/motion'
import { site } from '@/config/site'
import { cn } from '@/lib/utils'
import type { SendStatus } from './useEnquiryForm'

/** The outcome of a send: thanks once it is through, our address if it is not. */
export function SentNotice({ status }: { status: SendStatus }) {
  const failed = status === 'failed'
  const show = status === 'sent' || failed

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.p
          key={status}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: brandEase }}
          role={failed ? 'alert' : 'status'}
          className={cn(
            'flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[14px]',
            failed
              ? 'border-destructive/40 bg-destructive/8 text-destructive'
              : 'border-green/50 bg-green-soft text-green-ink',
          )}
        >
          {failed ? (
            <>
              <CircleAlert className="mt-0.5 size-4 shrink-0" />
              <span>
                Sorry, your enquiry did not go through. Please try again, or email us directly at{' '}
                <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-4">
                  {site.email}
                </a>
                .
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              Thank you — we will reply within one working day.
            </>
          )}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
