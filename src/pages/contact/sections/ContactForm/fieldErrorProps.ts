/** Marks a control invalid and points it at the message `Field` renders as `${id}-error`. */
export const errorProps = (id: string, error?: string) => ({
  'aria-invalid': Boolean(error),
  'aria-describedby': error ? `${id}-error` : undefined,
})
