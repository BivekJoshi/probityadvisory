import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion, type MotionValue } from 'framer-motion'
import * as THREE from 'three'
import { pointer, trackPointer } from '../support'

/*
 * The four process steps as one continuous choreography of ledger pages:
 *   0 Scoping call  — scattered records, one live file brought forward
 *   1 Pilot batch   — a small set laid out for review, the rest waiting behind
 *   2 Named team    — three piles, one per principal, each under a gold halo
 *   3 Steady state  — pages moving on an unbroken loop into a bound file
 */

const GOLD_TINT = new THREE.Color(1, 0.78, 0.32)

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1)
const smootherstep = (x: number) => x * x * x * (x * (x * 6 - 15) + 10)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

interface Pose {
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: number
  light: number
  gold: number
}

const makePose = (): Pose => ({
  position: new THREE.Vector3(),
  rotation: new THREE.Euler(),
  scale: 1,
  light: 1,
  gold: 0,
})

/** A figure-of-eight track: the lemniscate of Bernoulli, laid on the floor. */
function lemniscate(u: number, out: THREE.Vector3) {
  const theta = u * Math.PI * 2
  const d = 1 + Math.sin(theta) ** 2
  return out.set(
    (2.9 * Math.cos(theta)) / d,
    0.1 + Math.sin(theta * 2) * 0.12,
    ((2.9 * Math.sin(theta) * Math.cos(theta)) / d) * 1.3 + 0.4,
  )
}

const ahead = new THREE.Vector3()

function pose(stage: number, i: number, count: number, t: number, out: Pose) {
  const p = out.position
  const r = out.rotation

  if (stage === 0) {
    if (i === 0) {
      p.set(0, 0.15 + Math.sin(t * 0.8) * 0.05, 1.8)
      r.set(-0.08, Math.sin(t * 0.4) * 0.18, 0)
      out.scale = 1.55
      out.light = 1
      out.gold = 1
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
    out.gold = 0
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
      out.gold = i === 0 ? 0.6 : 0
      return
    }
    const a = (i / count) * Math.PI * 2 + t * 0.05
    p.set(Math.cos(a) * 5.6, Math.sin(a * 3) * 0.35 - 0.3, Math.sin(a) * 1.8 - 5.2)
    r.set(0.3, -a + Math.PI / 2, 0)
    out.scale = 0.7
    out.light = 0.22
    out.gold = 0
    return
  }

  if (stage === 2) {
    const c = i % 3
    const j = Math.floor(i / 3)
    p.set((c - 1) * 1.85, 0.05 + Math.sin(t * 1.1 - j * 0.22) * 0.025, 1.3 - j * 0.065)
    r.set(-0.05, (1 - c) * 0.22, 0)
    out.scale = 0.82
    out.light = 1 - Math.min(j / 60, 1) * 0.65
    out.gold = j === 0 ? 0.5 : 0
    return
  }

  const u = (i / count + t * 0.03) % 1
  lemniscate(u, p)
  lemniscate((u + 0.002) % 1, ahead)
  // the sheet's face runs along the track, like cards sliding on a rail
  r.set(-0.12, Math.atan2(ahead.x - p.x, ahead.z - p.z) + Math.PI / 2, 0)
  out.scale = 0.72
  out.light = 0.9
  out.gold = i % 15 === 0 ? 0.85 : 0
}

/** A ruled ledger page with a navy header and a gold tab, drawn once. */
function ledgerTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 344
  const g = canvas.getContext('2d')!
  g.fillStyle = '#EEF3F8'
  g.fillRect(0, 0, 256, 344)
  g.fillStyle = '#0E2A47'
  g.fillRect(0, 0, 256, 34)
  g.fillStyle = '#C9A227'
  g.fillRect(18, 12, 60, 10)

  g.lineWidth = 2
  g.strokeStyle = 'rgba(14, 42, 71, 0.18)'
  for (let y = 58; y < 330; y += 20) {
    g.beginPath()
    g.moveTo(18, y)
    g.lineTo(238, y)
    g.stroke()
  }
  g.strokeStyle = 'rgba(14, 42, 71, 0.12)'
  for (const x of [150, 196]) {
    g.beginPath()
    g.moveTo(x, 44)
    g.lineTo(x, 330)
    g.stroke()
  }
  g.fillStyle = 'rgba(14, 42, 71, 0.45)'
  for (let y = 64, row = 0; y < 320; y += 20, row++) {
    g.fillRect(24, y, 60 + ((row * 37) % 70), 6)
    g.fillRect(158, y, 28, 6)
    g.fillRect(204, y, 26, 6)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

export function Ledger({ stage }: { stage: MotionValue<number> }) {
  const reduced = useReducedMotion()
  const narrow = useThree((state) => state.size.width < 640)
  const invalidate = useThree((state) => state.invalidate)
  const count = narrow ? 120 : 180

  const sheets = useRef<THREE.InstancedMesh>(null)
  const halos = useRef<THREE.Group>(null)
  const file = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.PointLight>(null)
  const clock = useRef({ stage: stage.get(), t: 0 })
  const scratch = useRef({
    a: makePose(),
    b: makePose(),
    qa: new THREE.Quaternion(),
    qb: new THREE.Quaternion(),
    matrix: new THREE.Matrix4(),
    scale: new THREE.Vector3(),
    color: new THREE.Color(),
  })

  const texture = useMemo(() => ledgerTexture(), [])
  const geometry = useMemo(() => new THREE.BoxGeometry(0.46, 0.62, 0.006), [])
  const paper = useMemo(
    () => new THREE.MeshStandardMaterial({ map: texture, roughness: 0.7, metalness: 0 }),
    [texture],
  )
  const halo = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#E0BD52', transparent: true, opacity: 0, depthWrite: false }),
    [],
  )

  useEffect(() => trackPointer(), [])
  // on-demand rendering (reduced motion) still follows the scroll
  useEffect(() => stage.on('change', () => invalidate()), [stage, invalidate])
  useEffect(
    () => () => {
      texture.dispose()
      geometry.dispose()
      paper.dispose()
      halo.dispose()
    },
    [texture, geometry, paper, halo],
  )

  useFrame((state, delta) => {
    const mesh = sheets.current
    if (!mesh) return
    const c = clock.current
    const s = scratch.current
    if (!reduced) c.t += delta
    const target = stage.get()
    c.stage = reduced ? target : c.stage + (target - c.stage) * (1 - Math.exp(-delta * 3.5))

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

    const near = (n: number) => clamp01(1 - Math.abs(c.stage - n))
    // the three halos share one material, reached through the scene graph
    const ring = halos.current?.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> | undefined
    if (ring) ring.material.opacity = smootherstep(near(2)) * 0.9
    if (file.current) {
      file.current.scale.setScalar(Math.max(smootherstep(near(3)), 0.0001))
      file.current.rotation.y = Math.sin(c.t * 0.5) * 0.35
    }
    if (glow.current) glow.current.intensity = 3 + near(0) * 5 + near(3) * 7

    const camera = state.camera
    const ease = 1 - Math.exp(-delta * 2)
    camera.position.x += (pointer.x * 0.4 - camera.position.x) * ease
    camera.position.y += (1.3 + pointer.y * 0.25 - camera.position.y) * ease
    camera.lookAt(0, 0.1, 0)
  })

  return (
    <>
      <instancedMesh
        ref={sheets}
        args={[geometry, paper, count]}
        frustumCulled={false}
        key={count}
      />
      <group ref={halos}>
        {[-1, 0, 1].map((column) => (
          <mesh key={column} material={halo} position={[column * 1.85, 0.64, 1.3]} rotation-x={Math.PI / 2}>
            <torusGeometry args={[0.36, 0.008, 8, 64]} />
          </mesh>
        ))}
      </group>
      <mesh ref={file} position={[0, 0.15, 0.4]}>
        <boxGeometry args={[0.62, 0.8, 0.14]} />
        <meshStandardMaterial color="#C9A227" metalness={0.55} roughness={0.35} />
      </mesh>
      <pointLight ref={glow} color="#E0BD52" position={[0, 0.6, 2.6]} distance={9} decay={1.6} />
    </>
  )
}
