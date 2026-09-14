import type { ReactNode } from 'react'

export const footerLinkClass = 'text-[14px] text-on-forest-muted transition-colors duration-150 hover:text-white'

/** A titled list of footer links; pass the `<li>` items as children. */
export function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-sans text-[12.5px] font-semibold uppercase tracking-[0.14em] text-green">
        {title}
      </h2>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  )
}
