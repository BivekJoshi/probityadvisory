import type { RootState } from '@react-three/fiber'
import * as THREE from 'three'
import { smoothstep } from '../../lib/math'
import { DEG, type Ref } from './constants'
import type { Routes } from './geometry'

// --- layout: centre and size the globe on its slot in the page
export function fitToSlot(group: THREE.Group, el: HTMLElement, state: RootState, intro: number) {
  const camera = state.camera as THREE.PerspectiveCamera
  const canvas = state.gl.domElement.getBoundingClientRect()
  const slot = el.getBoundingClientRect()
  const worldPerPx = (2 * camera.position.z * Math.tan((camera.fov * DEG) / 2)) / canvas.height
  const radiusPx = Math.min(slot.width, slot.height) * 0.42
  group.position.set(
    (slot.left + slot.width / 2 - canvas.left - canvas.width / 2) * worldPerPx,
    -(slot.top + slot.height / 2 - canvas.top - canvas.height / 2) * worldPerPx,
    0,
  )
  group.scale.setScalar(radiusPx * worldPerPx * (0.86 + 0.14 * intro))
  return { canvas, radiusPx }
}

// --- the glowing heads of each comet on the two routes
export function updateComets(
  points: THREE.Points,
  routes: Routes,
  t: number,
  intro: number,
  target: THREE.Vector3,
) {
  const positions = points.geometry.getAttribute('position') as THREE.BufferAttribute
  const alphas = points.geometry.getAttribute('aAlpha') as THREE.BufferAttribute
  const paths: [THREE.CatmullRomCurve3, number][] = [
    [routes.home, 0.22],
    [routes.out, 0.16],
  ]
  paths.forEach(([curve, speed], r) => {
    for (let n = 0; n < 2; n++) {
      const u = ((((n + 1 + t * speed) / 2) % 1) + 1) % 1
      const p = curve.getPointAt(u, target)
      positions.setXYZ(r * 2 + n, p.x, p.y, p.z)
      alphas.setX(r * 2 + n, Math.pow(Math.sin(u * Math.PI), 0.6) * intro)
    }
  })
  positions.needsUpdate = true
  alphas.needsUpdate = true
}

// --- pin the HTML labels beside their cities, fading as they turn away. London's tag
// sits up and to the left of its pin, Kathmandu's down and to the right, so the two
// never collide; both are held inside the canvas on narrow screens.
export function pinLabels(
  entries: [Ref, THREE.Vector3, 'above' | 'below'][],
  spin: THREE.Group,
  camera: THREE.PerspectiveCamera,
  canvas: DOMRect,
  intro: number,
  scratch: { world: THREE.Vector3; normal: THREE.Vector3; toCamera: THREE.Vector3 },
) {
  for (const [ref, local, side] of entries) {
    const label = ref.current
    if (!label) continue
    const world = scratch.world.copy(local).applyMatrix4(spin.matrixWorld)
    const normal = scratch.normal.copy(local).transformDirection(spin.matrixWorld)
    const facing = normal.dot(scratch.toCamera.copy(camera.position).sub(world).normalize())
    world.project(camera)
    const x = ((world.x + 1) / 2) * canvas.width
    const y = ((1 - world.y) / 2) * canvas.height
    const w = label.offsetWidth
    const h = label.offsetHeight
    const left = Math.min(Math.max(side === 'above' ? x - w + 18 : x - 18, 8), canvas.width - w - 8)
    const top = side === 'above' ? y - h - 22 : y + 22
    label.style.transform = `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0)`
    label.style.opacity = String(smoothstep(0.12, 0.4, facing) * smoothstep(0.6, 1, intro))
  }
}
