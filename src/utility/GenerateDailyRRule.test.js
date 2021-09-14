import moment from 'moment'

import { GenerateDailyRRule } from './GenerateDailyRRule'

const frequencyInterval = 1
const startDate = moment().toDate()
const endDate = moment().add(1, 'days')

test('daily rrule string test', () => {
  expect(GenerateDailyRRule(
    startDate,
    endDate,
    frequencyInterval
  )).toEqual(expect.any(String))
})
