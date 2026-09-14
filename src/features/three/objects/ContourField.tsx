import { useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { contour } from '../shaders/contour'
import { pointer, trackPointer } from '../lib/pointer'

export interface ContourFieldProps {
  /** Where the relief peaks, in canvas UV (0–1, y up). */
  focus?: [number, number]
  /** 0–1: how strongly the lines fade out under text on the left. */
  leftFade?: number
  intensity?: number
}

/** Animated topographic relief — a quiet nod to the Himalaya behind every masthead. */
export function ContourField({ focus = [0.72, 0.62], leftFade = 0.85, intensity = 1 }: ContourFieldProps) {
  const reduced = useReducedMotion()

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        ...contour,
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
