import RRule from 'rrule'

export const GenerateMonthlyRRule = (
  startDate,
  endDate,
  selectedDatesMonthly,
  setBy,
  weekType,
  days,
  frequencyInterval
) => {
  const selectedDatesMonthlyArray = selectedDatesMonthly.map(month => month.value)
  const weekDay = []

  if (days.value === 'SU') {
    weekDay.push(RRule.SU)
  } else if (days.value === 'MO') {
    weekDay.push(RRule.MO)
  } else if (days.value === 'TU') {
    weekDay.push(RRule.TU)
  } else if (days.value === 'WE') {
    weekDay.push(RRule.WE)
  } else if (days.value === 'TH') {
    weekDay.push(RRule.TH)
  } else if (days.value === 'FR') {
    weekDay.push(RRule.FR)
  } else if (days.value === 'SA') {
    weekDay.push(RRule.SA)
  }

  const monthlyRule = new RRule({
    freq: RRule.MONTHLY,
    interval: frequencyInterval,
    ...(setBy !== 'day' && { wkst: RRule.SU }),
    ...(setBy !== 'day' && { bymonthday: selectedDatesMonthlyArray }),
    ...(setBy === 'day' && { bysetpos: parseInt(weekType.value) }),
    ...(setBy === 'day' && { byweekday: weekDay }),
    dtstart: startDate,
    until: endDate
  })

  return monthlyRule.toString()
  // return RRuleString(monthlyRule, startDate)
}