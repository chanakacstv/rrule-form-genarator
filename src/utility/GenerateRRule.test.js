import moment from 'moment'

import { RruleHelper } from '../helpers/RruleHelper';
import { GenerateAnuallyRRule } from './GenerateAnuallyRRule'

const values = {
  frequency: RruleHelper.FREQUENCY[2],
  startDate: moment().toDate(),
  endDate: moment().add(1, 'days'),
}
const selectedWeekDays = []
const selectedDatesMonthly = [];

test('generated rrule string test', () => {
  // expect(GenerateAnuallyRRule(
  //   values,
  //   selectedWeekDays,
  //   selectedDatesMonthly
  // )).toEqual(expect.any(String))
})
