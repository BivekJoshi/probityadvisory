import { useReducedMotion } from 'framer-motion'

/* Kathmandu sits on the right, London on the left; work travels right to left. */
const ARC = 'M6 44 Q100 -8 194 44'

/** The dotted route between the two clocks, with finished work travelling home along it. */
export function RouteArc() {
  const reduced = useReducedMotion()

  return (
    <svg viewBox="0 0 200 50" className="mb-2 w-full overflow-visible" aria-hidden="true">
      <path
        d={ARC}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 5"
        strokeLinecap="round"
        className="text-on-navy-muted/50"
      />
      <circle cx="6" cy="44" r="4" className="fill-on-navy" />
      <circle cx="194" cy="44" r="4" className="fill-gold" />
      {!reduced && (
        <circle r="3" className="fill-gold">
          <animateMotion
            dur="3.6s"
            repeatCount="indefinite"
            path={ARC}
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
        </circle>
      )}
    </svg>
  )
}
