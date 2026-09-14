import type { SVGProps } from 'react'

/**
 * The sweep from the PA stationery: a green stripe, thin on the left and
 * swelling to the right, riding a dark fill that takes `currentColor`.
 * Stretches to whatever box it is given.
 */
export function BrandWave(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true" {...props}>
      <path className="fill-green" d="M0 64C240 100 500 106 780 70S1240 0 1440 0V120H0Z" />
      <path fill="currentColor" d="M0 72C240 110 510 120 790 88S1250 26 1440 22V120H0Z" />
    </svg>
  )
}
