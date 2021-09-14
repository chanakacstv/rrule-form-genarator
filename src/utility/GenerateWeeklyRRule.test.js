import moment from 'moment'

import { GenerateAnuallyRRule } from './GenerateAnuallyRRule'

const frequencyInterval = 1
const startDate = moment().toDate()
const endDate = moment().add(1, 'days')
const selectedWeekDays = []

test('weekly rrule string test', () => {
  expect(GenerateAnuallyRRule(
    startDate, endDate, selectedWeekDays, frequencyInterval
  )).toEqual(expect.any(String))
})
