import { Stagger } from '@/components/motion'
import { team } from '@/content/team'
import { cn } from '@/lib/utils'
import { TeamMemberCard } from './TeamMemberCard'

/** The principals as cards; each links through to that principal's portfolio page. */
export function TeamGrid() {
  const twoUp = team.length <= 2

  return (
    <Stagger
      className={cn('grid gap-6', twoUp ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3')}
      step={0.1}
    >
      {team.map((person) => (
        <TeamMemberCard key={person.slug} person={person} wide={twoUp} />
      ))}
    </Stagger>
  )
}
