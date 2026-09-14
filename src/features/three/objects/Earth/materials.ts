import * as THREE from 'three'
import * as shaders from '../../shaders/earth'
import { GOLD, PAPER, STEEL } from './constants'

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

export function createEarthMaterials() {
  // one time and one sun uniform, shared by reference across every material
  const shared = { uTime: { value: 0 }, uSun: { value: new THREE.Vector3(1, 0, 0) } }
  return {
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
}
