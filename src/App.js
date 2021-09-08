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
    setBy: 'date'
  }
  const [rruleFormValue, setRruleFormValue] = useState(DEFAULT_INIT_VALUES)

  // console.log('Local time', rrulestr('DTSTART:20210830T122229Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;WKST=SU;BYDAY=SU,MO;UNTIL=20210831T122229Z'))

  useEffect(() => {
    console.log('rruleFormValue from app', rruleFormValue)
  }, [rruleFormValue])

  return (
    <div className="App container mt-5">
      <RRuleGeneratorContainer rruleFormValue={rruleFormValue} setRruleFormValue={setRruleFormValue} />
    </div>
  )
}

export default App
