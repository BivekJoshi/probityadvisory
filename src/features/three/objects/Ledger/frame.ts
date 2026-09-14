import * as THREE from 'three'
import { clamp01, hash, lerp, smootherstep } from '../../lib/math'
import { pointer } from '../../lib/pointer'
import { pose, type Pose } from './poses'

const GOLD_TINT = new THREE.Color(1, 0.78, 0.32)

interface SheetScratch {
  a: Pose
  b: Pose
  qa: THREE.Quaternion
  qb: THREE.Quaternion
  matrix: THREE.Matrix4
  scale: THREE.Vector3
  color: THREE.Color
}

/** Blends every page between the poses of the two stages either side of `c.stage`. */
export function updateSheets(
  mesh: THREE.InstancedMesh,
  c: { stage: number; t: number },
  s: SheetScratch,
  count: number,
) {
  const from = Math.min(Math.floor(c.stage), 2)
  const progress = c.stage - from
  for (let i = 0; i < count; i++) {
    // each page sets off a little after the one before, so the change ripples
    const w = smootherstep(clamp01((progress - hash(i * 7.3) * 0.45) / 0.55))
    pose(from, i, count, c.t, s.a)
    pose(from + 1, i, count, c.t, s.b)
    s.qa.setFromEuler(s.a.rotation).slerp(s.qb.setFromEuler(s.b.rotation), w)
    s.a.position.lerp(s.b.position, w)
    s.matrix.compose(s.a.position, s.qa, s.scale.setScalar(lerp(s.a.scale, s.b.scale, w)))
    mesh.setMatrixAt(i, s.matrix)
    const light = lerp(s.a.light, s.b.light, w)
    mesh.setColorAt(i, s.color.setRGB(light, light, light).lerp(GOLD_TINT, lerp(s.a.gold, s.b.gold, w)))
  }
  mesh.instanceMatrix.needsUpdate = true
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
}

// pull back on narrow stages so the three piles always fit side by side
export function followPointer(
  camera: THREE.PerspectiveCamera,
  size: { width: number; height: number },
  delta: number,
) {
  const aspect = size.width / size.height
  const fit = Math.max(7.8, 2.75 / (Math.tan((camera.fov * Math.PI) / 360) * aspect) + 1.3)
  const ease = 1 - Math.exp(-delta * 2)
  camera.position.x += (pointer.x * 0.4 - camera.position.x) * ease
  camera.position.y += (1.3 + pointer.y * 0.25 - camera.position.y) * ease
  camera.position.z += (fit - camera.position.z) * ease
  camera.lookAt(0, 0.1, 0)
}
