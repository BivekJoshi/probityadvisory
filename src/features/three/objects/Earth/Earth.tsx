import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { KATHMANDU, LONDON, latLonToVec3, subsolarPoint } from '../../lib/geo'
import { easeOutExpo } from '../../lib/math'
import { pointer, trackPointer } from '../../lib/pointer'
import { CityMarker } from './CityMarker'
import { DEG, REST_LAT, REST_LON, type Ref } from './constants'
import { fitToSlot, pinLabels, updateComets } from './frame'
import { createLandGeometry, createRoutes, disposeRoutes } from './geometry'
import { createEarthMaterials } from './materials'

interface EarthProps {
  /** An empty square in the page layout; the globe sizes and centres itself on it. */
  anchor: Ref
  /** Labels positioned over each city every frame. */
  labels: { london: Ref; kathmandu: Ref }
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
  const dots = useRef<THREE.Points>(null)
  const comets = useRef<THREE.Points>(null)
  const born = useRef(0)
  const elapsed = useRef(0)
  const smoothPointer = useRef({ x: 0, y: 0 })
  const sun = useRef({ earth: new THREE.Vector3(), at: 0 })

  const cities = useMemo(
    () => ({
      london: latLonToVec3(LONDON.lat, LONDON.lon),
      kathmandu: latLonToVec3(KATHMANDU.lat, KATHMANDU.lon),
    }),
    [],
  )

  const landGeometry = useMemo(() => createLandGeometry(narrow), [narrow])
  const routes = useMemo(() => createRoutes(cities), [cities])
  const m = useMemo(() => createEarthMaterials(), [])

  useEffect(() => trackPointer(), [])
  useEffect(() => () => landGeometry.dispose(), [landGeometry])
  useEffect(() => () => disposeRoutes(routes), [routes])
  useEffect(() => () => Object.values(m).forEach((material) => material.dispose()), [m])

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
    const landDots = dots.current
    const cometHeads = comets.current
    if (!el || !place.current || !tilt.current || !spin.current || !landDots || !cometHeads) return
    // per-frame state is reached through the scene graph rather than the memoised materials
    const land = (landDots.material as THREE.ShaderMaterial).uniforms
    const heads = (cometHeads.material as THREE.ShaderMaterial).uniforms

    const camera = state.camera as THREE.PerspectiveCamera
    const now = performance.now()
    if (!born.current) born.current = now
    const intro = reduced ? 1 : easeOutExpo(Math.min((now - born.current) / 2600, 1))
    if (!reduced) elapsed.current += delta
    const t = elapsed.current
    land.uTime.value = t

    const { canvas, radiusPx } = fitToSlot(place.current, el, state, intro)

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
    land.uSun.value
      .copy(sun.current.earth)
      .applyQuaternion(spin.current.getWorldQuaternion(scratch.quaternion))
      .normalize()

    const dpr = state.gl.getPixelRatio()
    land.uSize.value = radiusPx * 0.0085 * dpr * camera.position.z
    land.uReveal.value = intro
    heads.uSize.value = radiusPx * 0.05 * dpr * camera.position.z

    updateComets(cometHeads, routes, t, intro, scratch.world)

    const entries: [Ref, THREE.Vector3, 'above' | 'below'][] = [
      [labels.london, cities.london, 'above'],
      [labels.kathmandu, cities.kathmandu, 'below'],
    ]
    pinLabels(entries, spin.current, camera, canvas, intro, scratch)
  })

  return (
    <group ref={place}>
      <group ref={tilt}>
        <group ref={spin}>
          <mesh material={m.ocean} renderOrder={1}>
            <sphereGeometry args={[1, 96, 64]} />
          </mesh>
          <points ref={dots} geometry={landGeometry} material={m.land} renderOrder={2} />
          <mesh geometry={routes.outTube} material={m.out} renderOrder={3} />
          <mesh geometry={routes.homeTube} material={m.home} renderOrder={3} />
          <points
            ref={comets}
            geometry={routes.packets}
            material={m.packets}
            renderOrder={4}
            frustumCulled={false}
          />
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
