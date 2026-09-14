import type { MotionValue } from 'framer-motion'
import { SceneCanvas } from '../SceneCanvas'
import { Ledger } from '../objects/Ledger/Ledger'
import { useTheme } from '@/features/theme'

/** The process story's stage: ledger pages lit against the forest band. */
export default function LedgerScene({ active, stage }: { active: boolean; stage: MotionValue<number> }) {
  const { theme } = useTheme()
  // fog fades distant pages into the band's own forest
  const ground = theme === 'dark' ? '#040805' : '#0f1a10'

  return (
    <SceneCanvas active={active} camera={{ position: [0, 1.3, 7.8], fov: 38 }}>
      <fog attach="fog" args={[ground, 10, 20]} />
      <ambientLight intensity={1.2} color="#b3c8ae" />
      <directionalLight position={[2, 5, 6]} intensity={2.4} />
      <Ledger stage={stage} />
    </SceneCanvas>
  )
}
