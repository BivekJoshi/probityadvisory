import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reveal } from '@/components/motion'
import { partnerQuestions } from '@/content/faq'

interface PartnerQuestionsProps {
  /** Defaults to the four partner objections; the home page adds a few more. */
  items?: readonly { q: string; a: string }[]
}

/** Questions as an accordion, one card each. */
export function PartnerQuestions({ items = partnerQuestions }: PartnerQuestionsProps) {
  return (
    <Reveal>
      <Accordion type="single" collapsible defaultValue="q-0" className="flex flex-col gap-3">
        {items.map((item, i) => (
          <AccordionItem
            key={item.q}
            value={`q-${i}`}
            className="rounded-2xl border border-line bg-card px-6 transition-[border-color,box-shadow] duration-300 data-[state=open]:border-gold/50 data-[state=open]:shadow-card sm:px-7"
          >
            <AccordionTrigger>“{item.q}”</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  )
}
