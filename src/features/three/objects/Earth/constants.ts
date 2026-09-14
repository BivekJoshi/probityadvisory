import type { RefObject } from 'react'
import * as THREE from 'three'

export type Ref = RefObject<HTMLElement | null>

export const DEG = Math.PI / 180
/* the view rests between the two cities */
export const REST_LON = 42
export const REST_LAT = 34
export const GREEN = new THREE.Color('#74C44C')
export const PAPER = new THREE.Color('#E9F0E6')
export const SAGE = new THREE.Color('#8DB59A')
