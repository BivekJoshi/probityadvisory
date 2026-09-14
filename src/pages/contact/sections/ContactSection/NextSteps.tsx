import { Reveal } from '@/components/motion'
import { nextSteps } from '@/content/process'
import { ContactHeading } from './ContactHeading'

/** The three steps between sending an enquiry and a pilot batch. */
export function NextSteps() {
  return (
    <Reveal as="section" aria-labelledby="next" delay={0.08}>
      <ContactHeading id="next">What happens next</ContactHeading>
      <ol className="divide-y divide-line-soft rounded-2xl border border-line bg-card shadow-card">
        {nextSteps.map((step) => (
          <li key={step.n} className="grid grid-cols-[32px_minmax(0,1fr)] gap-4 p-5">
            <span className="grid size-8 place-items-center rounded-full bg-navy-deep font-mono text-[12px] text-gold">
              {step.n}
            </span>
            <p className="text-[15px] leading-[1.6]">
              <b className="font-semibold">{step.lead}</b>{' '}
              <span className="text-muted-foreground">{step.rest}</span>
            </p>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
