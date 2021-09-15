import moment from 'moment'

import { GenerateAnuallyRRule } from './GenerateAnuallyRRule'

const frequencyInterval = 1
const startDate = moment().toDate()
const endDate = moment().add(1, 'days')
const selectedDatesMonthly = [{rruleIndexNo: 2, label: "2", value: 2, isSelected: true}]
const setBy = 'date'
const weekType = { label: 'First', value: '1', id: 1 }
const days = { label: 'Sunday', value: 'SU' }

test('manthly rrule string test', () => {
  expect(GenerateAnuallyRRule(
    startDate,
    endDate,
    selectedDatesMonthly,
    setBy,
    weekType,
    days,
    frequencyInterval
  )).toEqual(expect.any(String))
})
