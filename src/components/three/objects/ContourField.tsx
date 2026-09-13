import { useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { noiseGlsl } from '../shaders/noise'
import { pointer, trackPointer } from '../support'

export interface ContourFieldProps {
  /** Where the relief peaks, in canvas UV (0–1, y up). */
  focus?: [number, number]
  /** 0–1: how strongly the lines fade out under text on the left. */
  leftFade?: number
  intensity?: number
}

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  // a screen-filling quad: the camera never touches it
  gl_Position = vec4(position.xy, 0.999, 1.0);
}
`

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec2 uFocus;
uniform float uLeftFade;
uniform float uIntensity;
varying vec2 vUv;

${noiseGlsl}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
  vec2 focus = (uFocus - 0.5) * vec2(aspect, 1.0);
  float t = uTime * 0.025;

  // domain-warped relief, with a massif rising around the focus point
  vec2 warp = vec2(snoise(vec3(p * 0.8, t)), snoise(vec3(p * 0.8 + 4.3, t)));
  float d = length(p - focus);
  float height = fbm(vec3(p * 1.35 + warp * 0.45, t * 0.6)) + 0.9 * exp(-d * d * 1.6);

  // contour lines, anti-aliased in screen space; every fifth is an index contour
  float bands = height * 16.0;
  float dist = abs(fract(bands + 0.5) - 0.5);
  float line = 1.0 - smoothstep(0.0, fwidth(bands) * 1.4, dist);
  float major = 1.0 - step(0.5, mod(floor(bands + 0.5), 5.0));

  // the pointer warms the lines it passes over
  vec2 pp = (uPointer - 0.5) * vec2(aspect, 1.0);
  float glow = exp(-pow(length(p - pp) * 2.4, 2.0));

  float mask = mix(1.0, smoothstep(0.12, 0.72, vUv.x), uLeftFade);
  mask *= smoothstep(1.9, 0.2, d) * 0.85 + 0.15;

  vec3 minor = vec3(0.31, 0.47, 0.64);
  vec3 gold = vec3(0.84, 0.68, 0.25);
  vec3 col = mix(mix(minor, gold, major), gold * 1.15, glow * 0.6);

  float alpha = line * mix(0.16, 0.5, major) * mask;
  alpha += line * glow * 0.45;
  alpha += smoothstep(0.4, 1.3, height) * 0.035 * mask;
  alpha *= uIntensity;

  gl_FragColor = vec4(col * alpha, alpha);
}
`

/** Animated topographic relief — a quiet nod to the Himalaya behind every masthead. */
export function ContourField({ focus = [0.72, 0.62], leftFade = 0.85, intensity = 1 }: ContourFieldProps) {
  const reduced = useReducedMotion()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 40 + Math.random() * 20 },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uPointer: { value: new THREE.Vector2(-4, -4) },
          uFocus: { value: new THREE.Vector2(...focus) },
          uLeftFade: { value: leftFade },
          uIntensity: { value: intensity },
        },
        transparent: true,
        premultipliedAlpha: true,
        depthTest: false,
        depthWrite: false,
      }),
    // the props are fixed per placement; uniforms below keep them current anyway
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => trackPointer(), [])
  useEffect(() => () => material.dispose(), [material])

  useFrame((state, delta) => {
    const u = material.uniforms
    const rect = state.gl.domElement.getBoundingClientRect()
    const tx = (pointer.clientX - rect.left) / rect.width
    const ty = 1 - (pointer.clientY - rect.top) / rect.height
    const ease = 1 - Math.exp(-delta * 3)
    const current = u.uPointer.value as THREE.Vector2
    // jump straight to the first real position instead of sweeping in from off-canvas
    if (current.x < -2) current.set(tx, ty)
    else current.set(current.x + (tx - current.x) * ease, current.y + (ty - current.y) * ease)

    u.uResolution.value.set(state.size.width, state.size.height)
    u.uFocus.value.set(...focus)
    u.uLeftFade.value = leftFade
    u.uIntensity.value = intensity
    if (!reduced) u.uTime.value += delta
  })

  return (
    <mesh frustumCulled={false} renderOrder={-1} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}
