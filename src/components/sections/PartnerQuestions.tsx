import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reveal } from '@/components/motion/Reveal'
import { partnerQuestions } from '@/data/site'

/** The four objections partners actually raise, as an accordion. */
export function PartnerQuestions() {
  return (
    <Reveal className="rounded-md border border-line bg-card px-6 sm:px-8">
      <Accordion type="single" collapsible defaultValue="q-0" className="w-full">
        {partnerQuestions.map((item, i) => (
          <AccordionItem key={item.q} value={`q-${i}`} className="last:border-b-0">
            <AccordionTrigger>“{item.q}”</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  )
}
