import React, { createContext, useEffect, useState } from 'react'
import moment, { weekdays } from 'moment'
import * as yup from 'yup'
import { RRule, RRuleSet, rrulestr } from 'rrule'
import { DateTime } from "luxon"

import { RruleHelper } from '../helpers/RruleHelper'
import { GenerateRRule } from '../utility/GenerateRRule'

export const GeneratorContext = createContext()

const GeneratorProvider = ({ children, componentProps }) => {
  const { setRruleFormValue, rruleFormValue } = componentProps

  const [selectedFrequencyType, setSelectedFrequencyType] = useState(
    RruleHelper.FREQUENCY_VALUES.ONE_TIME_READ_ONLY.value
  )
  const [selectedDatesOfMonth, setSelectedDatesOfMonth] = useState([])
  const [selectedDatesOfWeek, setSelectedDatesOfWeek] = useState([])
  const [endMinimumDate, setEndMinimumDate] = useState(
    new Date(new Date()).setDate(new Date(new Date()).getDate() + 1)
  )

  const FORM_INITIAL_VALUES = rruleFormValue

  const FORM_YUP_VALIDATIONS = yup.object().shape({ })

  // const now = DateTime.now();
  // const dt = DateTime.fromObject({day: 22, hour: 12 }, { zone: 'America/Los_Angeles', numberingSystem: 'beng'})
  // console.log('aneeee', DateTime.now().setZone("America/Los_Angeles"))

  // const a = now.plus({ hours: 3, minutes: 2 });
  // const b = now.minus({ days: 7 });

  // console.log('hey', a.zoneName, b.toLocaleString())

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
    setSelectedDatesOfWeek(
      rruleFormValue.weekDays.filter(weekDays => weekDays.isSelected)
    )
  }, [])

  const formSumbit = (values, actions) => {}

  const handleFrequencyOnChange = (
    selectedValue,
    formValues,
    setFieldValue,
    resetForm,
   ) => {
    const { value } = selectedValue
    const updatedFormValues = {
      ...formValues,
      frequency: selectedValue,
    }
    const rrule = GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    setSelectedFrequencyType(value)
    setRruleFormValue({
      ...updatedFormValues,
      rrule
    })
    setFieldValue('rrule', rrule)
    // resetFormikForm(
    //   resetForm,
    //   selectedValue,
    // )
  }

  const handleDueDateOnChange = (
    selectedValue,
    formValues,
    setFieldValue
   ) => {
    const updatedFormValues = {
      ...formValues,
      dueDate: selectedValue,
    }
    const rrule = GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    setRruleFormValue({
      ...updatedFormValues,
      rrule
    })
    setFieldValue('rrule', rrule)
   }

  const handleStartDateOnChange = (
    selectedValue,
    formValues,
    setFieldValue
   ) => {
    const updatedFormValues = {
      ...formValues,
      startDate: selectedValue,
    }
    const rrule = GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    setRruleFormValue({
      ...updatedFormValues,
      rrule
    })
    setFieldValue('rrule', rrule)
   }

  const handleEndDateOnChange = (
    selectedValue,
    formValues,
    setFieldValue
   ) => {
    const updatedFormValues = {
      ...formValues,
      endDate: selectedValue,
    }
    const rrule = GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    setRruleFormValue({
      ...updatedFormValues,
      rrule
    })
    setFieldValue('rrule', rrule)
  }

  const clearRRuleStates = () => {
    setSelectedDatesOfWeek([])
    setSelectedDatesOfMonth([])
  }

  console.log('formik selectedDatesOfWeek', selectedDatesOfWeek)

  const handleMultipleWeekDatesSelect = (
    value,
    formValues,
    setFieldValue
   ) => {
    const selectedWeekDays = formValues.weekDays.map(weekDays => {
      if (value === weekDays.value) {
        weekDays.isSelected = !weekDays.isSelected
      }

      return weekDays
    })
    
    const selectedWeekDaysArray = selectedWeekDays.filter(weekDays => {
      if (weekDays.isSelected) {
        return weekDays.value
      }
    })
    const rrule = GenerateRRule(formValues, selectedWeekDaysArray, selectedDatesOfMonth)

    setSelectedDatesOfWeek(selectedWeekDays)
    setRruleFormValue({
      ...formValues, 
      rrule
    })
    setFieldValue(
      'weekDays',
      selectedWeekDays
    )
    setFieldValue('rrule', rrule)
  }

  const handleSingleWeekDatesSelect = (
    value,
    formValues,
    setFieldValue
   ) => {
    const selectedWeekDays = formValues.weekDays.map(weekDays => {
      if (value === weekDays.value) {
        weekDays.isSelected = !weekDays.isSelected
      } else {
        weekDays.isSelected = false
      }

      return weekDays
    })
    
    const selectedWeekDaysArray = selectedWeekDays.filter(weekDays => {
      if (weekDays.isSelected) {
        return weekDays.value
      }
    })
    const rrule = GenerateRRule(formValues, selectedWeekDaysArray, selectedDatesOfMonth)

    setSelectedDatesOfWeek(selectedWeekDays)
    setRruleFormValue({
      ...formValues, 
      rrule
    })
    setFieldValue(
      'weekDays',
      selectedWeekDays
    )
    setFieldValue('rrule', rrule)
  }

  const handleMonthDatesSelect = (
    value,
    formValues,
    setFieldValue
   ) => {
    let rrule;
    const cloneDatesOfMonth = [...selectedDatesOfMonth]
    
    if (cloneDatesOfMonth.includes(typeof value === 'string' ? -1 : value)) {
      const filtered = cloneDatesOfMonth.filter(element =>
        value !== 'Last Day' ? element !== value : element !== -1
        )
      rrule = GenerateRRule(formValues, selectedDatesOfWeek, filtered)
      setSelectedDatesOfMonth(filtered)
      setRruleFormValue({
        ...formValues, 
        rrule
      })
      setFieldValue('rrule', rrule)
    } else {
      cloneDatesOfMonth.push(value === 'Last Day' ? -1 : value)
      rrule = GenerateRRule(formValues, selectedDatesOfWeek, cloneDatesOfMonth)
      setSelectedDatesOfMonth(cloneDatesOfMonth)
      setRruleFormValue({
        ...formValues, 
        rrule
      })
      setFieldValue('rrule', rrule)
    }
  }

  const handleSetByOnChange = (
    event,
    formValues,
    setFieldValue
   ) => {
    const { value } = event.target
    const updatedFormValues = {
      ...formValues,
      setBy: value,
    }
    const rrule = GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    setRruleFormValue({
      ...updatedFormValues,
      rrule
    })
    setFieldValue('rrule', rrule)
  }

  const handleWeekTypeOnChange = (
    selectedValue,
    formValues,
    setFieldValue
  ) => {
    const updatedFormValues = {
      ...formValues,
      weekType: selectedValue,
    }
    const rrule = GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    setRruleFormValue({
      ...updatedFormValues,
      rrule
    })
    setFieldValue('rrule', rrule)
  }

  const handleDaysTypeOnChange = (
    selectedValue,
    formValues,
    setFieldValue
  ) => {
    const updatedFormValues = {
      ...formValues,
      days: selectedValue,
    }
    const rrule = GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)
    setRruleFormValue({
      ...updatedFormValues,
      rrule
    })
    setFieldValue('rrule', rrule)
  }

  // const resetFormikForm = (
  //   resetForm,
  //   frequency,
  // ) => {
  //   values.
  // };

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
        handleMultipleWeekDatesSelect,
        handleSingleWeekDatesSelect,
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
