export const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))
export const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

/** A stable pseudo-random number in [0, 1) for a given seed. */
export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
export const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1)
export const smootherstep = (x: number) => x * x * x * (x * (x * 6 - 15) + 10)
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
