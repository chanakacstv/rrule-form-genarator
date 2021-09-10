import RRule from 'rrule'

export const GenerateAnuallyRRule = (
  startDate,
  endDate,
  frequencyInterval
) => {
  const dailyRule = new RRule({
    freq: RRule.YEARLY,
    interval: frequencyInterval,
    wkst: RRule.SU,
    dtstart: startDate,
    until: endDate,
    tzid: Intl.DateTimeFormat().resolvedOptions().timeZone
  })

  return dailyRule.toString()
}
