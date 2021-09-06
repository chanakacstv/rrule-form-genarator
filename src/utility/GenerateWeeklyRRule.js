import RRule from 'rrule'

import { RRuleString } from './RRuleString'

export const GenerateWeeklyRRule = (startDate, endDate, selectedWeekDays, frequencyInterval) => {
  const selectedWeekArray = [];
  for (let index = 0; index < selectedWeekDays.length; index++) {
    if (selectedWeekDays[index].value === 'Monday') {
      selectedWeekArray[index] = RRule.MO
    } else if (selectedWeekDays[index].value === 'Tuesday') {
      selectedWeekArray[index] = RRule.TU
    } else if (selectedWeekDays[index].value === 'Wednesday') {
      selectedWeekArray[index] = RRule.WE
    } else if (selectedWeekDays[index].value === 'Thursday') {
      selectedWeekArray[index] = RRule.TH
    } else if (selectedWeekDays[index].value === 'Friday') {
      selectedWeekArray[index] = RRule.FR
    } else if (selectedWeekDays[index].value === 'Saturday') {
      selectedWeekArray[index] = RRule.SA
    } else {
      selectedWeekArray[index] = RRule.SU
    }
  }

  const weeklyRule = new RRule({
    freq: RRule.WEEKLY,
    interval: frequencyInterval,
    wkst: RRule.SU,
    byweekday: selectedWeekArray,
    dtstart: startDate,
    until: endDate
  })
  
  return weeklyRule.toString()
  // return RRuleString(weeklyRule, startDate)
}