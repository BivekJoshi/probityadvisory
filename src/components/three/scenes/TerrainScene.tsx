import { SceneCanvas } from '../SceneCanvas'
import { Terrain } from '../objects/Terrain'

/** Interior mastheads: the range flying slowly toward you behind the title. */
export default function TerrainScene({ active, leftFade }: { active: boolean; leftFade?: number }) {
  return (
    <SceneCanvas active={active} dpr={[1, 1.5]} camera={{ position: [0, 2.3, 6.5], fov: 45 }}>
      <Terrain leftFade={leftFade} />
    </SceneCanvas>
  )
}
