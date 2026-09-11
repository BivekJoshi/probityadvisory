import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const Globe = lazy(() =>
  import('./Globe').then((module) => ({ default: module.Globe })),
)

function GlobeFrame({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid place-items-center rounded-md border border-on-navy-line bg-white/[0.02]',
        className,
      )}
      aria-hidden="true"
    >
      <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-on-navy-muted/60">
        Kathmandu → London
      </span>
    </div>
  )
}

/**
 * three.js is ~240 kB gzipped, so it is kept out of the first paint:
 * the canvas only mounts once the frame is on screen.
 */
export function LazyGlobe({ className, dark = true }: { className?: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  // Browsers without IntersectionObserver simply mount the canvas straight away.
  const [show, setShow] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  )

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {show ? (
        <Suspense fallback={<GlobeFrame className="size-full" />}>
          <Globe className="size-full" dark={dark} />
        </Suspense>
      ) : (
        <GlobeFrame className="size-full" />
      )}
    </div>
  )
}
