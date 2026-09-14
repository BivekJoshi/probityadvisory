import {
  Building2,
  CalendarRange,
  FilePen,
  HardHat,
  House,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import type { Audience } from '@/content/audiences'

/* one glyph per point, in the same order as each audience's points */
export const audienceIcons: Record<Audience['key'], readonly LucideIcon[]> = {
  practices: [CalendarRange, FilePen, UsersRound, ShieldCheck],
  businesses: [Building2, HardHat, House, UsersRound],
}
