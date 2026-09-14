import * as THREE from 'three'
import { LAND_MASK, LAND_SAMPLES } from '../data/landMask'

const DEG = Math.PI / 180

export const LONDON = { lat: 51.5074, lon: -0.1278 }
export const KATHMANDU = { lat: 27.7172, lon: 85.324 }

/** Latitude/longitude in degrees to a point on a sphere of radius `r` (y up). */
export function latLonToVec3(lat: number, lon: number, r = 1, target = new THREE.Vector3()) {
  const phi = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return target.set(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

/**
 * Unit-sphere positions of every land sample in the mask. The samples are a
 * Fibonacci sphere, so the dots sit evenly with no pole pinching; `stride`
 * keeps every n-th dot for smaller screens.
 */
export function landPoints(stride = 1) {
  const bytes = Uint8Array.from(atob(LAND_MASK), (c) => c.charCodeAt(0))
  const golden = Math.PI * (3 - Math.sqrt(5))
  const out: number[] = []
  let seen = 0
  for (let i = 0; i < LAND_SAMPLES; i++) {
    if (!(bytes[i >> 3] & (1 << (i & 7)))) continue
    if (seen++ % stride) continue
    const y = 1 - ((i + 0.5) * 2) / LAND_SAMPLES
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    out.push(Math.cos(theta) * r, y, Math.sin(theta) * r)
  }
  return new Float32Array(out)
}

/**
 * Where the sun is directly overhead at `date`. Ignores the equation of time
 * (a few degrees at most), which is invisible on a terminator this soft.
 */
export function subsolarPoint(date: Date) {
  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 0)
  const day = (date.getTime() - startOfYear) / 86_400_000
  const lat = -23.44 * Math.cos(((2 * Math.PI) / 365) * (day + 10))
  const hours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600
  return { lat, lon: (12 - hours) * 15 }
}

/** A great-circle path between two surface points, lifted into an arc. */
export function arcCurve(from: THREE.Vector3, to: THREE.Vector3, radius: number, lift: number) {
  const a = from.clone().normalize()
  const b = to.clone().normalize()
  const angle = a.angleTo(b)
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= 64; i++) {
    const t = i / 64
    // slerp on the unit sphere, then raise the middle of the path
    const p = a
      .clone()
      .multiplyScalar(Math.sin((1 - t) * angle))
      .add(b.clone().multiplyScalar(Math.sin(t * angle)))
      .divideScalar(Math.sin(angle))
    points.push(p.multiplyScalar(radius * (1 + Math.sin(Math.PI * t) * lift)))
  }
  return new THREE.CatmullRomCurve3(points)
}
