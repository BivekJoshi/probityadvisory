import { SceneCanvas } from '../SceneCanvas'
import { ContourField, type ContourFieldProps } from '../objects/ContourField'

/** The contour field on its own canvas, for cards and bands. */
export default function ContourScene({ active, ...field }: ContourFieldProps & { active: boolean }) {
  return (
    <SceneCanvas active={active} dpr={[1, 1.25]}>
      <ContourField {...field} />
    </SceneCanvas>
  )
}
