import type { ReactNode } from 'react'

/** The heading over each block of the contact band; `id` is what its section is labelled by. */
export function ContactHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mb-4 text-[22px]">
      {children}
    </h2>
  )
}
