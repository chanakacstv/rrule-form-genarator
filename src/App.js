import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { RRule, RRuleSet, rrulestr } from 'rrule'

import RRuleGeneratorContainer from './containers/RRuleGeneratorContainer'
import { RruleHelper } from './helpers/RruleHelper'

import './style/style.css'

function App(props) {
  const DEFAULT_INIT_VALUES = {
    frequency: RruleHelper.FREQUENCY[0],
    dueDate: moment().toDate(),
    startDate: moment().toDate(),
    endDate: moment().add(1, 'days'),
    weekType: RruleHelper.WEEKS_TYPES[0],
    weekDays: RruleHelper.WEEK_DAYS,
    monthDays: RruleHelper.MONTH_DAYS,
    days: RruleHelper.FULL_WEEK_DAYS[0],
    rrule: '',
    setBy: 'date',
    errors: {}
  }
  const [rruleFormValue, setRruleFormValue] = useState(DEFAULT_INIT_VALUES)
  
  useEffect(() => {
    console.log('rruleFormValue from app', rruleFormValue.rrule)
    console.log('rruleFormValue from app', rrulestr('DTSTART:20210909T115047Z\nRRULE:FREQ=MONTHLY;INTERVAL=1;WKST=SU;BYMONTHDAY=1,2,3,4,5,6,7,8,27,28,29,30,31,-1;UNTIL=20210910T115047Z'))
  }, [rruleFormValue])

  return (
    <div className="App container mt-5">
      <RRuleGeneratorContainer rruleFormValue={rruleFormValue} setRruleFormValue={setRruleFormValue} />
    </div>
  )
}

export default App
