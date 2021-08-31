import RRule from 'rrule'

import { RRuleString } from './RRuleString'

export const GenerateDailyRRule = (startDate, endDate, frequencyInterval) => {
  const dailyRule = new RRule({
    freq: RRule.DAILY,
    interval: frequencyInterval,
    wkst: RRule.SU,
    dtstart: startDate,
    until: endDate,
    tzid: Intl.DateTimeFormat().resolvedOptions().timeZone
  })

  return dailyRule.toString()
  // return RRuleString(dailyRule, startDate)
}
