import type { RefObject } from 'react'
import { HeroScene, SceneMount, TerrainScene } from '@/features/three'

type DivRef = RefObject<HTMLDivElement | null>

interface HeroBackdropProps {
  /** The live globe instead of the terrain fly-over. */
  globe: boolean
  /** The empty square the globe centres itself on. */
  anchor: DivRef
  london: DivRef
  kathmandu: DivRef
  /** How strongly the terrain fades out under the copy on the left. */
  leftFade: number
}

/** Soft glows and the WebGL scene behind the masthead copy. */
export function HeroBackdrop({ globe, anchor, london, kathmandu, leftFade }: HeroBackdropProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-20 size-130 rounded-full bg-gold/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-32 -z-20 size-110 rounded-full bg-navy/70 blur-3xl"
      />
      <SceneMount className="absolute inset-0 -z-10" fallback={<div className="bg-dots absolute inset-0" />}>
        {(active) =>
          globe ? (
            <HeroScene active={active} anchor={anchor} londonLabel={london} kathmanduLabel={kathmandu} />
          ) : (
            <TerrainScene active={active} leftFade={leftFade} />
          )
        }
      </SceneMount>
    </>
  )
}
