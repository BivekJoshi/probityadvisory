import { Link } from 'react-router-dom'
import { ProbityMark } from '@/components/icons'
import { paths } from '@/config/routes'
import { site } from '@/config/site'

export function FooterBrand() {
  return (
    <div className="sm:col-span-2 lg:col-span-1">
      <Link to={paths.home} className="flex w-fit items-center gap-2.5">
        <ProbityMark className="h-8 w-auto text-green" />
        <span className="font-display text-[19px] font-semibold text-white">{site.name}</span>
      </Link>
      <p className="mt-4 max-w-[42ch] text-[14.5px] leading-[1.65] text-on-forest-muted">
        {site.description}
      </p>
    </div>
  )
}
