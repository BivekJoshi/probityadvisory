import { BookOpenCheck, FileCheck2, Wallet, type LucideIcon } from 'lucide-react'
import type { services } from '@/content/services'

type Slug = (typeof services)[number]['slug']

/** One glyph per service, shared by the home cards and the services page. */
export const serviceIcons: Record<Slug, LucideIcon> = {
  'bookkeeping-vat-mtd': BookOpenCheck,
  'year-end-corporation-tax': FileCheck2,
  'payroll-cis-pensions': Wallet,
}
