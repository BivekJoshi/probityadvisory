import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion'
import { pricingNote } from '@/content/process'
import { paths } from '@/config/routes'

export function PricingNote() {
  return (
    <Reveal className="mt-6 flex flex-col gap-5 rounded-2xl border border-line bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <p className="max-w-[62ch] text-[15px] leading-[1.65] text-muted-foreground">{pricingNote}</p>
      <Button asChild className="w-fit shrink-0">
        <Link to={paths.contact}>
          Ask for a quote
          <ArrowRight />
        </Link>
      </Button>
    </Reveal>
  )
}
