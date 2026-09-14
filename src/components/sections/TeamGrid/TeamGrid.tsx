import { Stagger } from '@/components/motion'
import { team } from '@/content/team'
import { TeamMemberCard } from './TeamMemberCard'

/** The three principals: short cards, or full profiles with `full`. */
export function TeamGrid({ full = false }: { full?: boolean }) {
  return (
    <Stagger className="grid gap-6 md:grid-cols-3" step={0.1}>
      {team.map((person) => (
        <TeamMemberCard key={person.name} person={person} full={full} />
      ))}
    </Stagger>
  )
}
