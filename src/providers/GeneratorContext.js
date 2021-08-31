import React, { createContext, useEffect, useState } from 'react'
import moment from 'moment'
import * as yup from 'yup'
import { RRule, RRuleSet, rrulestr } from 'rrule'
import { DateTime } from "luxon"

import { RruleHelper } from '../helpers/RruleHelper'
import { GenerateRRule } from '../utility/GenerateRRule'

export const GeneratorContext = createContext()

const GeneratorProvider = ({ children, componentProps }) => {
  const { setRruleFormValue, rruleFormValue } = componentProps

  const [selectedFrequencyType, setSelectedFrequencyType] = useState(
    RruleHelper.FREQUENCY_VALUES.ONE_TIME.value
  )
  const [selectedDatesOfMonth, setSelectedDatesOfMonth] = useState([])
  const [selectedDatesOfWeek, setSelectedDatesOfWeek] = useState([])
  const [endMinimumDate, setEndMinimumDate] = useState(
    new Date(new Date()).setDate(new Date(new Date()).getDate() + 1)
  )

  const FORM_INITIAL_VALUES = rruleFormValue

  const FORM_YUP_VALIDATIONS = yup.object().shape({ })

  // const rule = new RRule({
  //   freq: RRule.WEEKLY,
  //   interval: 2,
  //   byweekday: [RRule.MO, RRule.FR],
  //   dtstart: new Date(Date.UTC(2020, 8, 1, 10, 30)),
  //   until: new Date(Date.UTC(2020, 8, 31))
  // })
  // console.log(rule.all())
  // console.log('customsssss', rrulestr('DTSTART:20120201T023000Z\nRRULE:FREQ=MONTHLY;COUNT=5'))

  // const rule = RRule.fromString(
  //   "DTSTART;TZID=America/Denver:20181101T190000;\n"
  //   + "RRULE:FREQ=WEEKLY;BYDAY=MO,WE,TH;INTERVAL=1;COUNT=3"
  // )
  // console.log('Local time', rule.all())

  // console.log(
  //   'UTC time',
  //   rule.all().map(date =>
  //     DateTime.fromJSDate(date)
  //       .toUTC()
  //       .setZone('local', { keepLocalTime: true })
  //       .toJSDate()
  //     )
  // )

  // const rule = new RRule({
  //   dtstart: new Date(Date.UTC(2018, 1, 1, 10, 30)),
  //   count: 1,
  //   tzid: 'Asia/Tokyo'
  // }).all()

  // console.log('hello', rule)


  useEffect(() => {
    setRruleFormValue({
      ...FORM_INITIAL_VALUES,
      rrule: GenerateRRule(FORM_INITIAL_VALUES, selectedDatesOfWeek, selectedDatesOfMonth)
    })
  }, [])

  const formSumbit = (values, actions) => {}

  const handleFrequencyOnChange = (
    selectedValue,
    formValues
   ) => {
    const { value } = selectedValue
    const updatedFormValues = {
      ...formValues,
      frequency: selectedValue,
    }
    setSelectedFrequencyType(value)
    setRruleFormValue({
      ...updatedFormValues,
      rrule: GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    })
  }

  const handleDueDateOnChange = (
    selectedValue,
    formValues
   ) => {
    const updatedFormValues = {
      ...formValues,
      dueDate: selectedValue,
    }
    setRruleFormValue({
      ...updatedFormValues,
      rrule: GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    })
   }

  const handleStartDateOnChange = (
    selectedValue,
    formValues
   ) => {
    const updatedFormValues = {
      ...formValues,
      startDate: selectedValue,
    }
    setRruleFormValue({
      ...updatedFormValues,
      rrule: GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    })
   }

  const handleEndDateOnChange = (
    selectedValue,
    formValues
   ) => {
    const updatedFormValues = {
      ...formValues,
      endDate: selectedValue,
    }
    setRruleFormValue({
      ...updatedFormValues,
      rrule: GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    })
  }

  const clearRRuleStates = () => {
    setSelectedDatesOfWeek([])
    setSelectedDatesOfMonth([])
  }

  const handleWeekDatesSelect = (
    value,
    formValues
   ) => {
    const cloneArrWeekDays = [...selectedDatesOfWeek]
    if (cloneArrWeekDays.includes(value)) {
      const filtered = cloneArrWeekDays.filter(element => element !== value)
      setSelectedDatesOfWeek(filtered)
      setRruleFormValue({
        ...formValues, 
        rrule: GenerateRRule(formValues, filtered, selectedDatesOfMonth)
      })
    } else {
      cloneArrWeekDays.push(value)
      setSelectedDatesOfWeek(cloneArrWeekDays)
      setRruleFormValue({
        ...formValues, 
        rrule: GenerateRRule(formValues, cloneArrWeekDays, selectedDatesOfMonth)
      })
    }
  }

  const handleMonthDatesSelect = (
    value,
    formValues
   ) => {
    const cloneDatesOfMonth = [...selectedDatesOfMonth]
    if (cloneDatesOfMonth.includes(typeof value === 'string' ? -1 : value)) {
      const filtered = cloneDatesOfMonth.filter(element =>
        value !== 'Last Day' ? element !== value : element !== -1
      )
      setSelectedDatesOfMonth(filtered)
      setRruleFormValue({
        ...formValues, 
        rrule: GenerateRRule(formValues, selectedDatesOfWeek, filtered)
      })
    } else {
      cloneDatesOfMonth.push(value === 'Last Day' ? -1 : value)
      setSelectedDatesOfMonth(cloneDatesOfMonth)
      setRruleFormValue({
        ...formValues, 
        rrule: GenerateRRule(formValues, selectedDatesOfWeek, cloneDatesOfMonth)
      })
    }
  }

  const handleSetByOnChange = (
    event,
    formValues
   ) => {
    const { value } = event.target
    const updatedFormValues = {
      ...formValues,
      setBy: value,
    }
    setRruleFormValue({
      ...updatedFormValues,
      rrule: GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    })
  }

  const handleWeekTypeOnChange = (
    selectedValue,
    formValues
  ) => {
    const updatedFormValues = {
      ...formValues,
      weekType: selectedValue,
    }
    setRruleFormValue({
      ...updatedFormValues,
      rrule: GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    })
  }

  const handleDaysTypeOnChange = (
    selectedValue,
    formValues
  ) => {
    const updatedFormValues = {
      ...formValues,
      days: selectedValue,
    }
    setRruleFormValue({
      ...updatedFormValues,
      rrule: GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    })
  }

  return (
    <GeneratorContext.Provider
      value={{
        selectedFrequencyType,
        setSelectedFrequencyType,
        FORM_INITIAL_VALUES,
        FORM_YUP_VALIDATIONS,
        formSumbit,
        handleFrequencyOnChange,
        handleDueDateOnChange,
        handleMonthDatesSelect,
        selectedDatesOfMonth,
        handleWeekDatesSelect,
        endMinimumDate,
        setEndMinimumDate,
        handleStartDateOnChange,
        handleEndDateOnChange,
        handleSetByOnChange,
        handleWeekTypeOnChange,
        handleDaysTypeOnChange,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  )
}

export default GeneratorProvider
