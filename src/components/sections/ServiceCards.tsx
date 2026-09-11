import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion/Reveal'
import { services } from '@/data/site'

/** Home-page summary of the three services. */
export function ServiceCards() {
  const reduced = useReducedMotion()

  return (
    <Stagger className="grid gap-5 lg:grid-cols-3">
      {services.map((service) => (
        <StaggerItem key={service.slug} as="article">
          <motion.div
            whileHover={reduced ? undefined : { y: -5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex h-full flex-col gap-3 rounded-md border border-line border-t-2 border-t-gold bg-card p-6 transition-shadow duration-300 hover:shadow-lift"
          >
            <Link
              to="/services"
              className="absolute inset-0 z-10 rounded-md no-underline"
              aria-label={`${service.title} — read the full detail`}
            />
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[19px]">{service.title}</h3>
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </div>
            <p className="text-[14.5px] text-muted-foreground">{service.blurb}</p>
            <ul className="mt-1 flex list-none flex-col gap-[7px] p-0">
              {service.summary.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 text-[13.5px] text-muted-foreground before:absolute before:left-0 before:top-[0.62em] before:h-px before:w-1.5 before:bg-gold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </StaggerItem>
      ))}
    </Stagger>
  )
}
