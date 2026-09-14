import * as THREE from 'three'
import * as shaders from '../../shaders/earth'
import { GREEN, PAPER, SAGE } from './constants'

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
      uColor: { value: GREEN },
    }),
    out: shader(shaders.arc, {
      uTime: shared.uTime,
      uSpeed: { value: 0.16 },
      uBase: { value: 0.08 },
      uColor: { value: SAGE },
    }),
    packets: shader(shaders.packets, { uSize: { value: 120 } }),
    ringGreen: shader(shaders.ring, { uTime: shared.uTime, uColor: { value: GREEN } }, { side: THREE.DoubleSide }),
    ringPaper: shader(shaders.ring, { uTime: shared.uTime, uColor: { value: PAPER } }, { side: THREE.DoubleSide }),
    beamGreen: shader(shaders.beam, { uColor: { value: GREEN } }),
    beamPaper: shader(shaders.beam, { uColor: { value: PAPER } }),
  }
}
