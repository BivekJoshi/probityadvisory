import type { RefObject } from 'react'
import { SceneCanvas } from '../SceneCanvas'
import { ContourField } from '../objects/ContourField'
import { Earth } from '../objects/Earth'

type Ref = RefObject<HTMLElement | null>

interface HeroSceneProps {
  active: boolean
  anchor: Ref
  londonLabel: Ref
  kathmanduLabel: Ref
}

/** Home masthead: contour relief across the whole band, the live Earth in its slot. */
export default function HeroScene({ active, anchor, londonLabel, kathmanduLabel }: HeroSceneProps) {
  return (
    <SceneCanvas active={active} camera={{ position: [0, 0, 10], fov: 30 }}>
      <ContourField focus={[0.8, 0.55]} leftFade={0.9} intensity={0.85} />
      <Earth anchor={anchor} labels={{ london: londonLabel, kathmandu: kathmanduLabel }} />
    </SceneCanvas>
  )
}
