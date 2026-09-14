import * as THREE from 'three'
import { arcCurve, landPoints } from '../../lib/geo'
import { GOLD, STEEL } from './constants'

export function createLandGeometry(narrow: boolean) {
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
}

export function createRoutes(cities: { london: THREE.Vector3; kathmandu: THREE.Vector3 }) {
  const home = arcCurve(cities.kathmandu, cities.london, 1, 0.3)
  const out = arcCurve(cities.london, cities.kathmandu, 1, 0.17)
  const packets = new THREE.BufferGeometry()
  packets.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3))
  packets.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(4), 1))
  packets.setAttribute(
    'aColor',
    new THREE.BufferAttribute(
      new Float32Array([...GOLD.toArray(), ...GOLD.toArray(), ...STEEL.toArray(), ...STEEL.toArray()]),
      3,
    ),
  )
  return {
    home,
    out,
    homeTube: new THREE.TubeGeometry(home, 160, 0.0048, 8),
    outTube: new THREE.TubeGeometry(out, 160, 0.0034, 8),
    packets,
  }
}

export type Routes = ReturnType<typeof createRoutes>

export function disposeRoutes(routes: Routes) {
  routes.homeTube.dispose()
  routes.outTube.dispose()
  routes.packets.dispose()
}
