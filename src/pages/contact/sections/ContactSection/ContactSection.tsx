import { Band, Container } from '@/components/common'
import { Reveal } from '@/components/motion'
import { ContactForm } from '../ContactForm/ContactForm'
import { ContactHeading } from './ContactHeading'
import { DirectContacts } from './DirectContacts'
import { NextSteps } from './NextSteps'

/** Direct numbers and what happens next on the left; the enquiry form on the right. */
export function ContactSection() {
  return (
    <Band>
      <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div className="flex flex-col gap-12">
          <DirectContacts />
          <NextSteps />
        </div>

        <Reveal as="section" aria-labelledby="enquiry" delay={0.12}>
          <ContactHeading id="enquiry">Send an enquiry</ContactHeading>
          <ContactForm />
        </Reveal>
      </Container>
    </Band>
  )
}
