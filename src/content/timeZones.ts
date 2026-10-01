/** Minutes after midnight, so the working-day chart can place them on a 24-hour track. */
const at = (hours: number, minutes = 0) => hours * 60 + minutes

/** A UK practice's day, on London time. */
export const ukDay = { start: at(9), end: at(17, 30) }

/** Our standard day, on Kathmandu time — the overnight run. */
export const nepalDay = { start: at(9), end: at(18) }

export const globeCaption =''
  // 'Lit as the world is right now. Records travel out to Kathmandu; finished work comes home before London opens.'
