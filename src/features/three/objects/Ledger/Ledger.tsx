import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion, type MotionValue } from 'framer-motion'
import * as THREE from 'three'
import { clamp01, smootherstep } from '../../lib/math'
import { trackPointer } from '../../lib/pointer'
import { followPointer, updateSheets } from './frame'
import { ledgerTexture } from './ledgerTexture'
import { makePose } from './poses'

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

    updateSheets(mesh, c, s, count)

    const near = (n: number) => clamp01(1 - Math.abs(c.stage - n))
    // the three halos share one material, reached through the scene graph
    const ring = halos.current?.children[0] as THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> | undefined
    if (ring) ring.material.opacity = smootherstep(near(2)) * 0.9
    if (file.current) {
      file.current.scale.setScalar(Math.max(smootherstep(near(3)), 0.0001))
      file.current.rotation.y = Math.sin(c.t * 0.5) * 0.35
    }
    if (glow.current) glow.current.intensity = 3 + near(0) * 5 + near(3) * 7

    followPointer(state.camera as THREE.PerspectiveCamera, state.size, delta)
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
        <boxGeometry args={[0.7, 0.92, 0.16]} />
        <meshStandardMaterial color="#C9A227" metalness={0.55} roughness={0.35} />
      </mesh>
      <pointLight ref={glow} color="#E0BD52" position={[0, 0.6, 2.6]} distance={9} decay={1.6} />
    </>
  )
}
