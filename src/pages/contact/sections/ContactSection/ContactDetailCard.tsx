import type { ContactDetail } from './contactDetails'

/** One way to reach us; external links open in a new tab. */
export function ContactDetailCard({ detail }: { detail: ContactDetail }) {
  const { term, value, href, note, icon: Icon } = detail

  return (
    <div className="flex gap-4 rounded-2xl border border-line bg-card p-5 shadow-card">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-ink">
        <Icon className="size-4.5" />
      </span>
      <div className="min-w-0">
        <dt className="text-[13px] text-muted-foreground">{term}</dt>
        <dd className="mt-0.5 text-[15.5px] font-medium">
          {href ? (
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener"
              className="transition-colors hover:text-gold-ink"
            >
              {value}
            </a>
          ) : (
            value
          )}
          {note && (
            <span className="mt-1 block text-[13px] font-normal text-muted-foreground">{note}</span>
          )}
        </dd>
      </div>
    </div>
  )
}
