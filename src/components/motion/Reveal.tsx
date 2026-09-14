import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { brandEase } from './easing'

/*
 * The site's scroll-in vocabulary. Reduced motion is handled once, by
 * <MotionConfig reducedMotion="user"> in app/providers.tsx: movement is dropped and
 * only the fade remains, so nothing here needs to check for it.
 */

const viewport = { once: true, margin: '0px 0px -64px 0px' } as const

type Tag = 'div' | 'section' | 'article' | 'ul' | 'ol' | 'li' | 'dl'
type MotionProps = HTMLMotionProps<'div'> & { as?: Tag }

/** Fades a block up as it enters the viewport. */
export function Reveal({
  as = 'div',
  delay = 0,
  distance = 18,
  ...props
}: MotionProps & { delay?: number; distance?: number }) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: brandEase }}
      {...props}
    />
  )
}

/** Parent that walks its <StaggerItem> children in one after another. */
export function Stagger({ as = 'div', step = 0.08, ...props }: MotionProps & { step?: number }) {
  const Component = motion[as] as typeof motion.div
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
      {...props}
    />
  )
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: brandEase } },
}

export function StaggerItem({ as = 'div', ...props }: MotionProps) {
  const Component = motion[as] as typeof motion.div
  return <Component variants={item} {...props} />
}
