import RRule from 'rrule'

import { RRuleString } from './RRuleString'

export const GenerateWeeklyRRule = (startDate, endDate, selectedWeekDays, frequencyInterval) => {
  for (let index = 0; index < selectedWeekDays.length; index++) {
    if (selectedWeekDays[index] === 'Monday') {
      selectedWeekDays[index] = RRule.MO
    } else if (selectedWeekDays[index] === 'Tuesday') {
      selectedWeekDays[index] = RRule.TU
    } else if (selectedWeekDays[index] === 'Wednesday') {
      selectedWeekDays[index] = RRule.WE
    } else if (selectedWeekDays[index] === 'Thursday') {
      selectedWeekDays[index] = RRule.TH
    } else if (selectedWeekDays[index] === 'Friday') {
      selectedWeekDays[index] = RRule.FR
    } else if (selectedWeekDays[index] === 'Saturday') {
      selectedWeekDays[index] = RRule.SA
    } else {
      selectedWeekDays[index] = RRule.SU
    }
  }
  
  const weeklyRule = new RRule({
    freq: RRule.WEEKLY,
    interval: frequencyInterval,
    wkst: RRule.SU,
    byweekday: selectedWeekDays,
    dtstart: startDate,
    until: endDate
  })
  
  return weeklyRule.toString()
  // return RRuleString(weeklyRule, startDate)
}