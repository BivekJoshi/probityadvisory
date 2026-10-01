import { site } from '@/config/site'

/*
 * A plain account of what this website does with personal data, written from
 * what the code actually does. It stands in until the firm's own privacy notice
 * arrives: replace these sections with that text, word for word.
 */
export const privacyNotice = [
  {
    heading: 'Who we are',
    body: [
      `${site.name}, ${site.address}. For anything about your personal data, email ${site.email}.`,
    ],
  },
  {
    heading: 'What we collect',
    body: [
      'When you send an enquiry through the contact form: your name and email address, your firm and phone number if you give them, which kind of enquirer you are, the services you tick, and your message.',
      'If you email us, call, or message us on WhatsApp, we receive whatever you send that way.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'To reply to your enquiry and, if you go ahead, to arrange the work you ask about. We do not add you to a mailing list, and we do not sell or pass your details to anyone else.',
    ],
  },
  {
    heading: 'Where it goes',
    body: [
      "The contact form is sent by our web host's mail server to our own mailbox, where it is read by our principals in Nepal. WhatsApp messages are handled under WhatsApp's own terms.",
    ],
  },
  {
    heading: 'What this website stores',
    body: [
      'No cookies and no analytics. If you switch between light and dark mode, that choice is saved in your own browser so the site remembers it; it is never sent to us.',
      "The site's fonts are loaded from Google Fonts, so your browser connects to Google's servers to fetch them.",
    ],
  },
  {
    heading: 'Your rights',
    body: [
      `You can ask what we hold about you, have it corrected or deleted, or object to how we use it, by emailing ${site.email}. If you are not happy with our answer, you can complain to the Information Commissioner's Office at ico.org.uk.`,
    ],
  },
] as const
