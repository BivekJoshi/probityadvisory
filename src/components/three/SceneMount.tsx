import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { hasWebGL } from './support'

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

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
  const [near, setNear] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || !supported) return

    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        nearby.disconnect()
      },
      { rootMargin: '100% 0px' },
    )
    const visible = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting))

    nearby.observe(node)
    visible.observe(node)
    return () => {
      nearby.disconnect()
      visible.disconnect()
    }
  }, [supported])

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
