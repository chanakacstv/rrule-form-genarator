import React, { createContext, useEffect, useState } from 'react'
import moment, { weekdays } from 'moment'
import * as yup from 'yup'
import { RRule, RRuleSet, rrulestr } from 'rrule'
import { DateTime } from "luxon"
import isNull from 'lodash/isNull'

import { RruleHelper } from '../helpers/RruleHelper'
import { GenerateRRule } from '../utility/GenerateRRule'

export const GeneratorContext = createContext()

const GeneratorProvider = ({ children, componentProps }) => {
  const { setRruleFormValue, rruleFormValue } = componentProps

  const FREQUENCY_FORM_INIT_VALUES = {
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

  const [selectedFrequencyType, setSelectedFrequencyType] = useState(
    RruleHelper.FREQUENCY_VALUES.ONE_TIME_READ_ONLY.value
  )
  const [selectedDatesOfMonth, setSelectedDatesOfMonth] = useState([])
  const [selectedDatesOfWeek, setSelectedDatesOfWeek] = useState([])
  const [endMinimumDate, setEndMinimumDate] = useState(
    new Date(new Date()).setDate(new Date(new Date()).getDate() + 1)
  )
  const [selectedFrequency, setSelectedFrequency] = useState(FREQUENCY_FORM_INIT_VALUES.frequency)

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
    setSelectedDatesOfMonth(
      rruleFormValue.monthDays.filter(monthDays => monthDays.isSelected)
    )
  }, [])

  // Form validation
  const formCustomValidate = values => {
    const errors = {}
    const { weekDays, monthDays, setBy } = values

    switch (selectedFrequency.value) {
      case RruleHelper.FREQUENCY_VALUES.WEEKLY.value:
        if (!weekDays.some(weekDay => weekDay.isSelected)) {
          errors.weekDays = 'Please select a day'
        } else {
          errors.weekDays = ''
        }
        break
      case RruleHelper.FREQUENCY_VALUES.BI_WEEKLY.value:
        if (!weekDays.some(weekDay => weekDay.isSelected)) {
          errors.weekDays = 'Please select a day'
        } else {
          errors.weekDays = ''
        }
        break
      case RruleHelper.FREQUENCY_VALUES.MONTHLY.value:
        if (setBy === 'date') {
          if (!monthDays.some(monthDay => monthDay.isSelected)) {
            errors.monthDays = 'Please select a day'
          } else {
            errors.monthDays = ''
          }
        }
        break
      default:
        console.log(`Something went wrong!.`);
    }

    return errors
  }

  const formSumbit = (values, actions) => {}

  const handleFrequencyOnChange = (
    selectedValue,
    formValues,
    setFieldValue,
    resetForm,
   ) => {
    const { value } = selectedValue

    FREQUENCY_FORM_INIT_VALUES.weekDays.map(weekDays => {
      weekDays.isSelected = false
      return weekDays 
    })

    FREQUENCY_FORM_INIT_VALUES.monthDays.map(monthDays => {
      monthDays.isSelected = false
      return monthDays 
    })

    setSelectedFrequency(selectedValue)

    setFieldValue('frequency', selectedValue)
    setFieldValue('dueDate', FREQUENCY_FORM_INIT_VALUES.dueDate)
    setFieldValue('startDate', FREQUENCY_FORM_INIT_VALUES.startDate)
    setFieldValue('endDate', FREQUENCY_FORM_INIT_VALUES.endDate)
    setFieldValue('weekType', FREQUENCY_FORM_INIT_VALUES.weekType)
    setFieldValue('weekDays', FREQUENCY_FORM_INIT_VALUES.weekDays)
    setFieldValue('monthDays', FREQUENCY_FORM_INIT_VALUES.monthDays)
    setFieldValue('days', FREQUENCY_FORM_INIT_VALUES.days)
    setFieldValue('setBy', 'date')

    setEndMinimumDate(FREQUENCY_FORM_INIT_VALUES.startDate)

    const updatedFormValues = {
      ...FREQUENCY_FORM_INIT_VALUES,
      frequency: selectedValue,
    }
    const rrule = GenerateRRule(updatedFormValues, selectedDatesOfWeek, selectedDatesOfMonth)

    setFieldValue('rrule', rrule)

    clearRRuleStates()

    setSelectedFrequencyType(value)
    setRruleFormValue({
      ...updatedFormValues,
      rrule
    })
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
      endDate: moment(selectedValue, 'MM/DD/YYYY').add(1, 'days'),
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
    const selectedMonthDays = formValues.monthDays.map(monthDays => {
      if (value === monthDays.value) {
        monthDays.isSelected = !monthDays.isSelected
      }

      return monthDays
    })
    
    const selectedMonthDaysArray = selectedMonthDays.filter(monthDays => {
      if (monthDays.isSelected) {
        return monthDays
      }
    })
    const rrule = GenerateRRule(formValues, selectedDatesOfWeek, selectedMonthDaysArray)

    setSelectedDatesOfMonth(selectedMonthDaysArray)
    setRruleFormValue({
      ...formValues, 
      rrule
    })
    setFieldValue(
      'monthDays',
      selectedMonthDays
    )
    setFieldValue('rrule', rrule)
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

  const resetFormikForm = (
    resetForm,
    values,
    selectedFrequencyValue
  ) => {
    // resetForm({
    //   frequency: selectedFrequencyValue,
    //   dueDate: moment().toDate(),
    //   startDate: moment().toDate(),
    //   endDate: moment().add(1, 'days'),
    //   weekType: RruleHelper.WEEKS_TYPES[0],
    //   weekDays: RruleHelper.WEEK_DAYS,
    //   monthDays: RruleHelper.MONTH_DAYS,
    //   days: RruleHelper.FULL_WEEK_DAYS[0],
    //   rrule: '',
    //   setBy: 'date',
    // })

    // values.frequency = selectedFrequencyValue
    // values.dueDate = moment().toDate()
    // values.startDate = moment().toDate()
    // values.endDate = moment().add(1, 'days')
    // values.weekType = RruleHelper.WEEKS_TYPES[0]
    // values.weekDays = RruleHelper.WEEK_DAYS
    // values.monthDays = RruleHelper.MONTH_DAYS
    // values.days = RruleHelper.FULL_WEEK_DAYS[0]
    // values.rrule = ''
    // values.setBy = 'date'
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
        handleMultipleWeekDatesSelect,
        handleSingleWeekDatesSelect,
        endMinimumDate,
        setEndMinimumDate,
        handleStartDateOnChange,
        handleEndDateOnChange,
        handleSetByOnChange,
        handleWeekTypeOnChange,
        handleDaysTypeOnChange,
        formCustomValidate
      }}
    >
      {children}
    </GeneratorContext.Provider>
  )
}

export default GeneratorProvider
