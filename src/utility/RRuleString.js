import moment from 'moment'

export const RRuleString = (rrule, startDate) => {
  const firstRule = rrule.toString().replace('RRULE:', '')
  const dtsStart = ';DTSTART='.concat(
    moment.utc(startDate).format('YYYYMMDD[T]HHmmss[Z]')
  )

  return firstRule.concat(dtsStart)
}
