import { formatDifference } from '@/lib/time'

interface ClockNoteProps {
  now: Date
  /** The live time difference, instead of the general note about working hours. */
  showDifference: boolean
}

export function ClockNote({ now, showDifference }: ClockNoteProps) {
  return (
    <p className="border-t border-on-navy-line bg-gold/7 px-5 py-3.5 text-[13px] leading-[1.55] text-on-navy-muted">
      {showDifference ? (
        <>
          Right now the difference is{' '}
          <b className="font-medium text-gold">
            {formatDifference('Europe/London', 'Asia/Kathmandu', now)}
          </b>
          .
        </>
      ) : (
        <>
          Nepal runs at <b className="font-mono font-medium text-gold">UTC+05:45</b>, and we set
          our hours to suit yours — an overnight run that lands before you open, or a team sitting
          alongside you through your whole working day.
        </>
      )}
    </p>
  )
}
