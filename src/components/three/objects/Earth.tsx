import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import * as shaders from '../shaders/earth'
import { KATHMANDU, LONDON, arcCurve, landPoints, latLonToVec3, subsolarPoint } from '../lib/geo'
import { pointer, trackPointer } from '../support'

type Ref = RefObject<HTMLElement | null>

interface EarthProps {
  /** An empty square in the page layout; the globe sizes and centres itself on it. */
  anchor: Ref
  /** Labels positioned over each city every frame. */
  labels: { london: Ref; kathmandu: Ref }
}

const DEG = Math.PI / 180
/* the view rests between the two cities */
const REST_LON = 42
const REST_LAT = 34
const GOLD = new THREE.Color('#E0BD52')
const PAPER = new THREE.Color('#E9F0F7')
const STEEL = new THREE.Color('#7FA6CC')

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

function shader(
  source: { vertexShader: string; fragmentShader: string },
  uniforms: Record<string, THREE.IUniform>,
  options: THREE.ShaderMaterialParameters = {},
) {
  return new THREE.ShaderMaterial({
    ...source,
    uniforms,
    transparent: true,
    premultipliedAlpha: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    ...options,
  })
}

function CityMarker({
  position,
  ring,
  beam,
}: {
  position: THREE.Vector3
  ring: THREE.Material
  beam: THREE.Material
}) {
  // stand the marker up along the surface normal
  const quaternion = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), position.clone().normalize()),
    [position],
  )
  return (
    <group position={position} quaternion={quaternion}>
      <mesh material={ring} rotation-x={-Math.PI / 2} position-y={0.004} renderOrder={4}>
        <planeGeometry args={[0.17, 0.17]} />
      </mesh>
      <mesh material={beam} position-y={0.07} renderOrder={4}>
        <cylinderGeometry args={[0.0035, 0.0035, 0.14, 8, 1, true]} />
      </mesh>
    </group>
  )
}

/**
 * The live Earth: land as dots, lit by where the sun really is, with records
 * travelling out to Kathmandu and finished work coming home to London.
 */
export function Earth({ anchor, labels }: EarthProps) {
  const reduced = useReducedMotion()
  const narrow = useThree((state) => state.size.width < 768)

  const place = useRef<THREE.Group>(null)
  const tilt = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const born = useRef(0)
  const smoothPointer = useRef({ x: 0, y: 0 })
  const sun = useRef({ earth: new THREE.Vector3(), at: 0 })

  const cities = useMemo(
    () => ({
      london: latLonToVec3(LONDON.lat, LONDON.lon),
      kathmandu: latLonToVec3(KATHMANDU.lat, KATHMANDU.lon),
    }),
    [],
  )

  const landGeometry = useMemo(() => {
    const positions = landPoints(narrow ? 2 : 1)
    // lifted a hair off the ocean so the two never z-fight
    for (let i = 0; i < positions.length; i++) positions[i] *= 1.004
    // a stable per-dot random, so re-renders never reshuffle the city lights
    const rand = new Float32Array(positions.length / 3).map((_, i) => {
      const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
      return x - Math.floor(x)
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
    return geometry
  }, [narrow])

  const routes = useMemo(() => {
    const home = arcCurve(cities.kathmandu, cities.london, 1, 0.3)
    const out = arcCurve(cities.london, cities.kathmandu, 1, 0.17)
    const packets = new THREE.BufferGeometry()
    packets.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3))
    packets.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(4), 1))
    packets.setAttribute(
      'aColor',
      new THREE.BufferAttribute(new Float32Array([...GOLD.toArray(), ...GOLD.toArray(), ...STEEL.toArray(), ...STEEL.toArray()]), 3),
    )
    return {
      home,
      out,
      homeTube: new THREE.TubeGeometry(home, 160, 0.0048, 8),
      outTube: new THREE.TubeGeometry(out, 160, 0.0034, 8),
      packets,
    }
  }, [cities])

  const m = useMemo(() => {
    const shared = { uTime: { value: 0 }, uSun: { value: new THREE.Vector3(1, 0, 0) } }
    return {
      shared,
      ocean: shader(shaders.ocean, { uSun: shared.uSun }, { blending: THREE.NormalBlending, depthWrite: true }),
      land: shader(
        shaders.land,
        { ...shared, uSize: { value: 30 }, uReveal: { value: 0 } },
        { blending: THREE.NormalBlending },
      ),
      atmosphere: shader(shaders.atmosphere, { uSun: shared.uSun }, { side: THREE.BackSide }),
      home: shader(shaders.arc, {
        uTime: shared.uTime,
        uSpeed: { value: 0.22 },
        uBase: { value: 0.16 },
        uColor: { value: GOLD },
      }),
      out: shader(shaders.arc, {
        uTime: shared.uTime,
        uSpeed: { value: 0.16 },
        uBase: { value: 0.08 },
        uColor: { value: STEEL },
      }),
      packets: shader(shaders.packets, { uSize: { value: 120 } }),
      ringGold: shader(shaders.ring, { uTime: shared.uTime, uColor: { value: GOLD } }, { side: THREE.DoubleSide }),
      ringPaper: shader(shaders.ring, { uTime: shared.uTime, uColor: { value: PAPER } }, { side: THREE.DoubleSide }),
      beamGold: shader(shaders.beam, { uColor: { value: GOLD } }),
      beamPaper: shader(shaders.beam, { uColor: { value: PAPER } }),
    }
  }, [])

  useEffect(() => trackPointer(), [])
  useEffect(() => () => landGeometry.dispose(), [landGeometry])
  useEffect(
    () => () => {
      routes.homeTube.dispose()
      routes.outTube.dispose()
      routes.packets.dispose()
    },
    [routes],
  )
  useEffect(
    () => () =>
      Object.values(m).forEach((value) => value instanceof THREE.Material && value.dispose()),
    [m],
  )

  const scratch = useMemo(
    () => ({
      world: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      toCamera: new THREE.Vector3(),
      quaternion: new THREE.Quaternion(),
    }),
    [],
  )

  useFrame((state, delta) => {
    const el = anchor.current
    if (!el || !place.current || !tilt.current || !spin.current) return
    const camera = state.camera as THREE.PerspectiveCamera
    const now = performance.now()
    if (!born.current) born.current = now
    const intro = reduced ? 1 : easeOutExpo(Math.min((now - born.current) / 2600, 1))
    // uTime is one uniform object shared by every material on the globe
    const landMaterial = m.land
    const u = landMaterial.uniforms
    if (!reduced) u.uTime.value += delta
    const t: number = u.uTime.value

    // --- layout: centre and size the globe on its slot in the page
    const canvas = state.gl.domElement.getBoundingClientRect()
    const slot = el.getBoundingClientRect()
    const worldPerPx = (2 * camera.position.z * Math.tan((camera.fov * DEG) / 2)) / canvas.height
    const radiusPx = Math.min(slot.width, slot.height) * 0.42
    place.current.position.set(
      (slot.left + slot.width / 2 - canvas.left - canvas.width / 2) * worldPerPx,
      -(slot.top + slot.height / 2 - canvas.top - canvas.height / 2) * worldPerPx,
      0,
    )
    place.current.scale.setScalar(radiusPx * worldPerPx * (0.86 + 0.14 * intro))

    // --- orientation: resting between the cities, drifting, leaning after the pointer
    const ease = 1 - Math.exp(-delta * 2)
    smoothPointer.current.x += (pointer.x - smoothPointer.current.x) * ease
    smoothPointer.current.y += (pointer.y - smoothPointer.current.y) * ease
    const drift = reduced ? 0 : Math.sin(t * 0.08) * 0.3
    spin.current.rotation.y =
      (-90 - REST_LON) * DEG + drift + smoothPointer.current.x * 0.22 - (1 - intro) * 1.6
    tilt.current.rotation.set(REST_LAT * DEG - smoothPointer.current.y * 0.1, 0, -0.08)
    place.current.updateWorldMatrix(false, true)

    // --- the real sun, refreshed every half minute
    if (now - sun.current.at > 30_000) {
      const { lat, lon } = subsolarPoint(new Date())
      latLonToVec3(lat, lon, 1, sun.current.earth)
      sun.current.at = now
    }
    m.shared.uSun.value
      .copy(sun.current.earth)
      .applyQuaternion(spin.current.getWorldQuaternion(scratch.quaternion))
      .normalize()

    const dpr = state.gl.getPixelRatio()
    m.land.uniforms.uSize.value = radiusPx * 0.0085 * dpr * camera.position.z
    m.land.uniforms.uReveal.value = intro
    m.packets.uniforms.uSize.value = radiusPx * 0.05 * dpr * camera.position.z

    // --- the glowing heads of each comet on the two routes
    const positions = routes.packets.getAttribute('position') as THREE.BufferAttribute
    const alphas = routes.packets.getAttribute('aAlpha') as THREE.BufferAttribute
    const heads: [THREE.CatmullRomCurve3, number][] = [
      [routes.home, 0.22],
      [routes.out, 0.16],
    ]
    heads.forEach(([curve, speed], r) => {
      for (let n = 0; n < 2; n++) {
        const u = (((n + 1 + t * speed) / 2) % 1 + 1) % 1
        const p = curve.getPointAt(u, scratch.world)
        positions.setXYZ(r * 2 + n, p.x, p.y, p.z)
        alphas.setX(r * 2 + n, Math.pow(Math.sin(u * Math.PI), 0.6) * intro)
      }
    })
    positions.needsUpdate = true
    alphas.needsUpdate = true

    // --- pin the HTML labels beside their cities, fading as they turn away. London's tag
    // sits up and to the left of its pin, Kathmandu's down and to the right, so the two
    // never collide; both are held inside the canvas on narrow screens.
    const entries: [Ref, THREE.Vector3, 'above' | 'below'][] = [
      [labels.london, cities.london, 'above'],
      [labels.kathmandu, cities.kathmandu, 'below'],
    ]
    for (const [ref, local, side] of entries) {
      const label = ref.current
      if (!label) continue
      const world = scratch.world.copy(local).applyMatrix4(spin.current.matrixWorld)
      const normal = scratch.normal.copy(local).transformDirection(spin.current.matrixWorld)
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
  })

  return (
    <group ref={place}>
      <group ref={tilt}>
        <group ref={spin}>
          <mesh material={m.ocean} renderOrder={1}>
            <sphereGeometry args={[1, 96, 64]} />
          </mesh>
          <points geometry={landGeometry} material={m.land} renderOrder={2} />
          <mesh geometry={routes.outTube} material={m.out} renderOrder={3} />
          <mesh geometry={routes.homeTube} material={m.home} renderOrder={3} />
          <points geometry={routes.packets} material={m.packets} renderOrder={4} frustumCulled={false} />
          <CityMarker position={cities.london} ring={m.ringPaper} beam={m.beamPaper} />
          <CityMarker position={cities.kathmandu} ring={m.ringGold} beam={m.beamGold} />
        </group>
        <mesh material={m.atmosphere} scale={1.22} renderOrder={5}>
          <sphereGeometry args={[1, 64, 48]} />
        </mesh>
      </group>
    </group>
  )
}
