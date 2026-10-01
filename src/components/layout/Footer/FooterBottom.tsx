import { Link } from 'react-router-dom'
import { paths } from '@/config/routes'
import { site } from '@/config/site'
import { useMinute } from '@/hooks/useMinute'
import { formatTime } from '@/lib/time'

/** Copyright line, the privacy notice and the two live clocks along the foot of the page. */
export function FooterBottom() {
  const now = useMinute()

  return (
    <div className="mt-14 flex flex-col gap-3 border-t border-on-forest-line pt-6 text-[13px] text-on-forest-muted sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {now.getFullYear()} {site.name}. All rights reserved.
        <span aria-hidden="true" className="mx-2.5 text-on-forest-muted/50">·</span>
        <Link to={paths.privacy} className="transition-colors duration-150 hover:text-white">
          Privacy notice
        </Link>
      </p>
      <p className="tabular font-mono text-[12.5px]">
        London {formatTime('Europe/London', now)} · Kathmandu{' '}
        {formatTime('Asia/Kathmandu', now)}
      </p>
    </div>
  )
}
