import { useState } from 'react'
import { Canvas, type CanvasProps } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SceneCanvasProps extends CanvasProps {
  /** On screen right now; off-screen canvases stop rendering entirely. */
  active: boolean
}

/**
 * The one way the site creates a WebGL canvas: transparent over its CSS
 * ground, decorative (no pointer events, hidden from assistive tech), capped
 * device-pixel ratio, faded in once the first frame exists. With reduced
 * motion it renders on demand only, so scenes hold still.
 */
export function SceneCanvas({ active, className, children, ...props }: SceneCanvasProps) {
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)

  return (
    <Canvas
      aria-hidden="true"
      className={cn(
        'pointer-events-none! transition-opacity duration-1000 ease-out',
        ready ? 'opacity-100' : 'opacity-0',
        className,
      )}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        requestAnimationFrame(() => setReady(true))
      }}
      {...props}
    >
      {children}
    </Canvas>
  )
}
