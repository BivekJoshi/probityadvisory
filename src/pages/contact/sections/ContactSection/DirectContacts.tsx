import { Reveal } from '@/components/motion'
import { ContactDetailCard } from './ContactDetailCard'
import { ContactHeading } from './ContactHeading'
import { contactDetails } from './contactDetails'

export function DirectContacts() {
  return (
    <Reveal as="section" aria-labelledby="direct">
      <ContactHeading id="direct">Direct</ContactHeading>
      <dl className="grid gap-3">
        {contactDetails.map((detail) => (
          <ContactDetailCard key={detail.term} detail={detail} />
        ))}
      </dl>
    </Reveal>
  )
}
