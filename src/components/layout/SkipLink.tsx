/** Hidden until focused: lets keyboard users jump straight past the header. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-100 focus:rounded-full focus:bg-green focus:px-5 focus:py-2.5 focus:text-[14px] focus:font-medium focus:text-primary-foreground"
    >
      Skip to content
    </a>
  )
}
