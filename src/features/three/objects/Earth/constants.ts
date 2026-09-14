import type { RefObject } from 'react'
import * as THREE from 'three'

export type Ref = RefObject<HTMLElement | null>

export const DEG = Math.PI / 180
/* the view rests between the two cities */
export const REST_LON = 42
export const REST_LAT = 34
export const GOLD = new THREE.Color('#E0BD52')
export const PAPER = new THREE.Color('#E9F0F7')
export const STEEL = new THREE.Color('#7FA6CC')
