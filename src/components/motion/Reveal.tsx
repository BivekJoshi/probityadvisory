import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  distance?: number
  direction?: Direction
  once?: boolean
  as?: 'div' | 'section' | 'span' | 'li' | 'article'
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance }
    case 'down':
      return { y: -distance }
    case 'left':
      return { x: distance }
    case 'right':
      return { x: -distance }
    default:
      return {}
  }
}

/** Fades a block in as it enters the viewport. The workhorse of the page. */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 22,
  direction = 'up',
  once = true,
  as = 'div',
  ...props
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as as unknown as React.FC<
      React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }
    >
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px 0px -80px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...(props as object)}
    >
      {children}
    </MotionTag>
  )
}

/** Parent that walks its children in one after another. */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.09,
  once = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  delay?: number
  step?: number
  once?: boolean
}) {
  const reduced = useReducedMotion()
  if (reduced) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    )
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-70px 0px -70px 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
      {...(props as object)}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

/** Child of <Stagger>. */
export function StaggerItem({
  children,
  className,
  as = 'div',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { as?: 'div' | 'li' | 'article' | 'span' }) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]
  if (reduced) {
    const Tag = as as unknown as React.FC<
      React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }
    >
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }
  return (
    <MotionTag className={className} variants={staggerItem} {...(props as object)}>
      {children}
    </MotionTag>
  )
}
