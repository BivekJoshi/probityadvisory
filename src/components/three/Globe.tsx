import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const RADIUS = 1.6

/** Cities the practice actually runs between. */
const KATHMANDU = { lat: 27.7172, lon: 85.324, label: 'Kathmandu' }
const LONDON = { lat: 51.5074, lon: -0.1278, label: 'London' }

function latLonToVec3(lat: number, lon: number, r = RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

/** Great-circle-ish arc, lifted off the surface so it reads as a flight path. */
function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segments = 72) {
  const lift = 1 + a.distanceTo(b) * 0.22
  const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(RADIUS * lift)
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
  return curve.getPoints(segments)
}

/** Evenly distributed dots suggesting a landmass-free, ledger-like globe. */
function useSphereDots(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = golden * i
      positions[i * 3] = Math.cos(theta) * radius * RADIUS
      positions[i * 3 + 1] = y * RADIUS
      positions[i * 3 + 2] = Math.sin(theta) * radius * RADIUS
    }
    return positions
  }, [count])
}

function CityMarker({
  position,
  color,
  pulse,
}: {
  position: THREE.Vector3
  color: string
  pulse: boolean
}) {
  const ring = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ring.current || !pulse) return
    const t = (clock.getElapsedTime() % 2.6) / 2.6
    const s = 1 + t * 2.4
    ring.current.scale.setScalar(s)
    const material = ring.current.material as THREE.MeshBasicMaterial
    material.opacity = (1 - t) * 0.55
  })

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.038, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={ring}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

/** A packet of finished work travelling Kathmandu → London overnight. */
function TravellingPulse({ points, colour }: { points: THREE.Vector3[]; colour: string }) {
  const dot = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!dot.current) return
    const t = (clock.getElapsedTime() % 4) / 4
    const idx = Math.floor(t * (points.length - 1))
    const p = points[idx]
    if (p) dot.current.position.copy(p)
    const material = dot.current.material as THREE.MeshBasicMaterial
    material.opacity = Math.sin(t * Math.PI) * 0.95
  })

  return (
    <mesh ref={dot}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshBasicMaterial color={colour} transparent opacity={0} />
    </mesh>
  )
}

function GlobeScene({ dark, spin }: { dark: boolean; spin: boolean }) {
  const group = useRef<THREE.Group>(null)
  const dots = useSphereDots(1400)

  const gold = dark ? '#D6B33F' : '#C9A227'
  const wire = dark ? '#20456E' : '#1E3A5C'
  const dotColour = dark ? '#3C6288' : '#8AA6C0'

  const kathmandu = useMemo(() => latLonToVec3(KATHMANDU.lat, KATHMANDU.lon), [])
  const london = useMemo(() => latLonToVec3(LONDON.lat, LONDON.lon), [])
  const arc = useMemo(() => arcPoints(kathmandu, london), [kathmandu, london])

  useFrame((_, delta) => {
    if (group.current && spin) group.current.rotation.y += delta * 0.075
  })

  return (
    <group ref={group} rotation={[0.32, -1.15, 0.12]}>
      {/* solid core so the far side of the wireframe stays quiet */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 48, 48]} />
        <meshBasicMaterial color={dark ? '#07182A' : '#0E2A47'} transparent opacity={0.92} />
      </mesh>

      {/* latitude / longitude cage */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.001, 32, 20]} />
        <meshBasicMaterial color={wire} wireframe transparent opacity={dark ? 0.4 : 0.32} />
      </mesh>

      {/* surface stipple */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dots, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.018} color={dotColour} transparent opacity={0.85} sizeAttenuation />
      </points>

      <Line points={arc} color={gold} lineWidth={1.6} transparent opacity={0.9} />
      <TravellingPulse points={arc} colour={gold} />

      <CityMarker position={kathmandu} color={gold} pulse />
      <CityMarker position={london} color={dark ? '#E9F0F7' : '#FFFFFF'} pulse={false} />

      {/* faint halo */}
      <mesh scale={1.12}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshBasicMaterial
          color={gold}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

export function Globe({ className, dark = true }: { className?: string; dark?: boolean }) {
  const reduced = useReducedMotion()
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={cn(
          'grid place-items-center rounded-md border border-on-navy-line bg-white/[0.03]',
          className,
        )}
        aria-hidden="true"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-on-navy-muted">
          Kathmandu → London
        </span>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        onError={() => setFailed(true)}
      >
        <Suspense fallback={null}>
          <GlobeScene dark={dark} spin={!reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}
