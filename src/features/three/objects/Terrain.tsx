import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import { terrain } from '../shaders/terrain'
import { pointer, trackPointer } from '../lib/pointer'

/**
 * A slow fly-over of ridged relief drawn as survey contours. The surface
 * itself is invisible but still writes depth, so near ridges hide the lines
 * behind them the way a real range does.
 */
export function Terrain({ leftFade = 0.8 }: { leftFade?: number }) {
  const reduced = useReducedMotion()
  const narrow = useThree((state) => state.size.width < 768)

  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(18, 12, narrow ? 120 : 220, narrow ? 80 : 150)
    plane.rotateX(-Math.PI / 2)
    return plane
  }, [narrow])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        ...terrain,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 1.45 },
          uBuffer: { value: new THREE.Vector2(1, 1) },
          uLeftFade: { value: leftFade },
        },
        transparent: true,
        premultipliedAlpha: true,
        depthWrite: true,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => trackPointer(), [])
  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => () => material.dispose(), [material])

  useFrame((state, delta) => {
    const u = material.uniforms
    state.gl.getDrawingBufferSize(u.uBuffer.value)
    u.uLeftFade.value = leftFade
    if (!reduced) u.uTime.value += delta

    // the camera leans gently after the pointer
    const cam = state.camera
    const ease = 1 - Math.exp(-delta * 1.5)
    cam.position.x += (pointer.x * 0.5 - cam.position.x) * ease
    cam.position.y += (2.3 + pointer.y * 0.2 - cam.position.y) * ease
    cam.lookAt(0.6, 0.35, -2.5)
  })

  return <mesh geometry={geometry} material={material} position={[1.6, -0.6, -1.5]} />
}
