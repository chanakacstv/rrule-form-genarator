import moment from 'moment'

import { GenerateAnuallyRRule } from './GenerateAnuallyRRule'

const frequencyInterval = 1
const startDate = moment().toDate()
const endDate = moment().add(1, 'days')

test('anual rrule string test', () => {
  expect(GenerateAnuallyRRule(
    startDate,
    endDate,
    frequencyInterval
  )).toEqual(expect.any(String))
})
