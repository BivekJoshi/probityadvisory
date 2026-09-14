import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { brandEase } from '@/components/motion'
import { nav, paths } from '@/config/routes'
import { cn } from '@/lib/utils'

export function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav aria-label="Mobile" className="mt-6">
      <ul className="flex flex-col gap-1">
        {nav.map((item, i) => (
          <motion.li
            key={item.to}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: brandEase }}
          >
            {/* Radix `asChild` would overwrite NavLink's function className,
                so the sheet is closed from the link itself instead. */}
            <NavLink
              to={item.to}
              end={item.to === paths.home}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'block rounded-xl px-4 py-3 font-display text-[21px] transition-colors',
                  isActive ? 'bg-white/6 text-gold' : 'text-on-navy hover:bg-white/4',
                )
              }
            >
              {item.label}
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}
