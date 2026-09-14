import * as THREE from 'three'
import { clamp01, hash } from '../../lib/math'

/*
 * The four process steps as one continuous choreography of ledger pages:
 *   0 Scoping call  — scattered records, one live file brought forward
 *   1 Pilot batch   — a small set laid out for review, the rest waiting behind
 *   2 Named team    — three piles, one per principal, each under a green halo
 *   3 Steady state  — pages circling a bound green file on three steady orbits
 */

export interface Pose {
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: number
  light: number
  green: number
}

export const makePose = (): Pose => ({
  position: new THREE.Vector3(),
  rotation: new THREE.Euler(),
  scale: 1,
  light: 1,
  green: 0,
})

/* three gyroscope-like orbits for the steady state, each tipped toward the viewer */
const ORBIT_TILTS = [
  new THREE.Euler(1.15, 0, 0.35),
  new THREE.Euler(1.3, 0, -0.3),
  new THREE.Euler(1.0, 0, 0),
]
const orbit = new THREE.Vector3()

export function pose(stage: number, i: number, count: number, t: number, out: Pose) {
  const p = out.position
  const r = out.rotation

  if (stage === 0) {
    if (i === 0) {
      p.set(0, 0.15 + Math.sin(t * 0.8) * 0.05, 1.8)
      r.set(-0.08, Math.sin(t * 0.4) * 0.18, 0)
      out.scale = 1.55
      out.light = 1
      out.green = 1
      return
    }
    const theta = hash(i * 1.7) * Math.PI * 2
    const phi = Math.acos(2 * hash(i * 2.3) - 1)
    const reach = 0.35 + 0.65 * Math.cbrt(hash(i * 3.1))
    p.set(
      Math.sin(phi) * Math.cos(theta) * 4.4 * reach + Math.cos(t * 0.35 + i * 0.7) * 0.08,
      Math.cos(phi) * 2.3 * reach + Math.sin(t * 0.6 + i) * 0.12,
      Math.sin(phi) * Math.sin(theta) * 2.6 * reach - 1.4,
    )
    r.set(
      hash(i * 4.1) * 6.28 + t * 0.3 * (hash(i * 5.3) - 0.5),
      hash(i * 6.2) * 6.28 + t * 0.3 * (hash(i * 8.1) - 0.5),
      hash(i * 9.4) * 3.14,
    )
    out.scale = 0.75 + hash(i * 10.7) * 0.35
    out.light = 0.5 + hash(i * 11.3) * 0.25
    out.green = 0
    return
  }

  if (stage === 1) {
    if (i < 24) {
      const col = i % 6
      const row = Math.floor(i / 6)
      p.set((col - 2.5) * 0.6, (1.5 - row) * 0.8 + 0.15 + Math.sin(t * 0.9 + i * 0.5) * 0.02, 1)
      r.set(-0.16, 0, 0)
      out.scale = 1
      out.light = 1
      out.green = i === 0 ? 0.6 : 0
      return
    }
    const a = (i / count) * Math.PI * 2 + t * 0.05
    p.set(Math.cos(a) * 5.6, Math.sin(a * 3) * 0.35 - 0.3, Math.sin(a) * 1.8 - 6.8)
    r.set(0.3, -a + Math.PI / 2, 0)
    out.scale = 0.55
    out.light = 0.1
    out.green = 0
    return
  }

  if (stage === 2) {
    const c = i % 3
    const j = Math.floor(i / 3)
    p.set((c - 1) * 1.85, 0.05 + Math.sin(t * 1.1 - j * 0.22) * 0.025, 1.3 - j * 0.065)
    r.set(-0.05, (1 - c) * 0.22, 0)
    out.scale = 0.82
    out.light = 1 - Math.min(j / 60, 1) * 0.65
    out.green = j === 0 ? 0.5 : 0
    return
  }

  // pages circle the bound file on three rings, alternating direction, facing the viewer
  const lane = i % 3
  const j = Math.floor(i / 3)
  const radius = 1.45 + lane * 0.62
  const a = (j / Math.ceil(count / 3)) * Math.PI * 2 + t * (lane % 2 ? -0.22 : 0.18)
  orbit.set(Math.cos(a) * radius, 0, Math.sin(a) * radius).applyEuler(ORBIT_TILTS[lane])
  p.set(orbit.x, orbit.y + 0.15, orbit.z + 0.4)
  r.set(-0.1, 0, Math.sin(a) * 0.25)
  out.scale = 0.52
  out.light = 0.55 + 0.45 * clamp01((orbit.z + radius) / (2 * radius))
  out.green = j % 12 === 0 ? 0.85 : 0
}
