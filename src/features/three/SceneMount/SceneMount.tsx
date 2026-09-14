import { Suspense, useRef, useState, type ReactNode } from 'react'
import { hasWebGL } from '../lib/webgl'
import { SceneBoundary } from './SceneBoundary'
import { useSceneVisibility } from './useSceneVisibility'

interface SceneMountProps {
  /** Receives whether the frame is on screen; return a lazily imported scene. */
  children: (active: boolean) => ReactNode
  /** Shown without WebGL, if the scene throws, and while its chunk loads. */
  fallback?: ReactNode
  className?: string
}

/**
 * Keeps three.js out of first paint. The scene's chunk is fetched once the
 * frame comes within a screen of the viewport, and the canvas is told when it
 * scrolls out of view so it can stop drawing.
 */
export function SceneMount({ children, fallback = null, className }: SceneMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [supported] = useState(hasWebGL)
  const { near, active } = useSceneVisibility(ref, supported)

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {supported && near ? (
        <SceneBoundary fallback={fallback}>
          <Suspense fallback={fallback}>{children(active)}</Suspense>
        </SceneBoundary>
      ) : (
        fallback
      )}
    </div>
  )
}
