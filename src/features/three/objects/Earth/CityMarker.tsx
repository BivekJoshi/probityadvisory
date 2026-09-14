import { useMemo } from 'react'
import * as THREE from 'three'

export function CityMarker({
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
