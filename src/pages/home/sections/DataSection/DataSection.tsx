import { Band, Container, SectionHeader } from '@/components/common'
import { DataSafeguards } from './DataSafeguards'

export function DataSection() {
  return (
    <Band tone="dark" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/4 -z-10 size-120 rounded-full bg-green/8 blur-3xl"
      />
      <Container className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <SectionHeader
          onDark
          className="lg:mb-0"
          eyebrow="Data and confidentiality"
          title="Your clients' data stays where it already is."
          lede="It is the first thing partners ask about offshore work, so it is settled in writing before an engagement starts — not after the first deadline."
        />
        <DataSafeguards />
      </Container>
    </Band>
  )
}
