import { ProbityMark } from '@/components/icons'
import type { Principal } from '@/content/team'

/** The portrait for the masthead: an offset green keyline behind, and the credentials pinned to its corner. */
export function PortraitFrame({ person }: { person: Principal }) {
  return (
    <figure className="relative mx-auto w-full max-w-95 pb-8 pr-4">
      <div aria-hidden="true" className="absolute -inset-8 rounded-[48px] bg-green/10 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bottom-4 left-4 right-0 top-4 rounded-3xl border border-green/40"
      />

      <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/10 bg-forest shadow-lift">
        <img
          src={person.photo}
          alt={person.name}
          width={480}
          height={600}
          fetchPriority="high"
          className="size-full object-cover object-[center_22%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-forest-deep/85 to-transparent"
        />
        <ProbityMark className="absolute right-5 top-5 h-5 w-auto text-white/85 drop-shadow" />
      </div>

      <figcaption className="absolute bottom-0 -left-3 max-w-[calc(100%-8px)] rounded-2xl border border-white/12 bg-forest-deep/80 p-4 shadow-lift backdrop-blur-xl sm:-left-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-on-forest-muted">
          Chartered with
        </p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {person.creds.split(' · ').map((cred) => (
            <li
              key={cred}
              className="rounded-full border border-green/30 bg-green/12 px-2.5 py-1 font-mono text-[11.5px] text-on-forest"
            >
              {cred}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}
