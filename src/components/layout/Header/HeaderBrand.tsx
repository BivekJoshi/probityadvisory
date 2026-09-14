import { Link } from 'react-router-dom'
import { ProbityMark } from '@/components/icons'
import { paths } from '@/config/routes'
import { site } from '@/config/site'

/** Monogram, name and tagline, linking home. */
export function HeaderBrand() {
  return (
    <Link to={paths.home} className="flex shrink-0 items-center gap-2.5" aria-label={`${site.name} — home`}>
      <ProbityMark className="size-8" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[18px] font-semibold text-white">{site.name}</span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
          {site.tagline}
        </span>
      </span>
    </Link>
  )
}
