import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { nav, paths } from '@/config/routes'
import { cn } from '@/lib/utils'

/** The pill navigation on wide screens; the active page's pill slides between links. */
export function DesktopNav() {
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/3 p-1">
        {nav.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === paths.home}
              className={({ isActive }) =>
                cn(
                  'relative block rounded-full px-4 py-1.5 text-[14px] transition-colors duration-200',
                  isActive ? 'text-white' : 'text-on-forest-muted hover:text-white',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
