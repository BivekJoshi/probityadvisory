import { useState } from 'react'
import { Stagger } from '@/components/motion'
import { team } from '@/content/team'
import { cn } from '@/lib/utils'
import { ProfileDialog } from './ProfileDialog'
import { TeamMemberCard } from './TeamMemberCard'

/** The principals as cards; each opens its profile in a dialog. */
export function TeamGrid() {
  const [open, setOpen] = useState(false)
  // kept apart from `open` so the dialog still has a person to show while it animates out
  const [index, setIndex] = useState(0)
  const twoUp = team.length <= 2

  return (
    <>
      <Stagger
        className={cn('grid gap-6', twoUp ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3')}
        step={0.1}
      >
        {team.map((person, i) => (
          <TeamMemberCard
            key={person.slug}
            person={person}
            wide={twoUp}
            onOpen={() => {
              setIndex(i)
              setOpen(true)
            }}
          />
        ))}
      </Stagger>
      <ProfileDialog
        people={team}
        index={index}
        open={open}
        onOpenChange={setOpen}
        onIndexChange={setIndex}
      />
    </>
  )
}
