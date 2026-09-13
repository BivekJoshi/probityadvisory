import type { MotionValue } from 'framer-motion'
import { SceneCanvas } from '../SceneCanvas'
import { Ledger } from '../objects/Ledger'
import { useTheme } from '@/hooks/useTheme'

/** The process story's stage: ledger pages lit warm against the navy band. */
export default function LedgerScene({ active, stage }: { active: boolean; stage: MotionValue<number> }) {
  const { theme } = useTheme()
  // fog fades distant pages into the band's own navy
  const ground = theme === 'dark' ? '#050d17' : '#071a2e'

  return (
    <SceneCanvas active={active} camera={{ position: [0, 1.3, 7.8], fov: 38 }}>
      <fog attach="fog" args={[ground, 8, 17]} />
      <ambientLight intensity={1.2} color="#9fb6cc" />
      <directionalLight position={[2, 5, 6]} intensity={2.4} />
      <Ledger stage={stage} />
    </SceneCanvas>
  )
}
