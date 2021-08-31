import React, { useContext } from 'react'
import { Field } from 'formik'
import PropTypes from 'prop-types'

import { RruleHelper } from '../../../helpers/RruleHelper'
import { CustomSelect } from '../../common/CustomSelect'
import { ClickableWeekDays } from '../clickableWeekDaysButton/ClickableWeekDays'
import { GeneratorContext } from '../../../providers/GeneratorContext'

import './ClickableMonthDays.css'

export const ClickableMonthDays = prop => {
  const {
    handleMonthDatesSelect,
    isFrom,
    values,
    setFieldValue,
    setFieldTouched
  } = prop

  const {
    handleSetByOnChange,
    handleWeekTypeOnChange,
    handleDaysTypeOnChange,
  } = useContext(GeneratorContext)

  return (
    <>
      {isFrom === 'sop' && (
        <p>{RruleHelper.LABELS.MONTHLY_OPTION_TEXT}</p>
      )}

      <label className="checbox-label-wrp">
        <Field
          className="mr_5"
          name="setBy"
          type="radio"
          checked={values.setBy === 'date'}
          onChange={e => {
            const { name, value } = e.target
            setFieldValue(name, value)
            handleSetByOnChange(e, values)
          }}
          value="date"
        />
        {RruleHelper.LABELS.SET_BY_DATE}{' '}
      </label>

      <div className="form-group">
        {RruleHelper.DAYS_OF_MONTH.map(item => {
          return (
            <ClickableWeekDays
              key={item.value}
              name={item}
              value={item}
              onClick={() => handleMonthDatesSelect(item, values)}
              longItem={item === 'Last Day'}
              disabled={values.setBy === 'day'}
            />
          )
        })}

        <label className="checbox-label-wrp font_12">
          <Field
            className="mr_5"
            name="setBy"
            type="radio"
            checked={values.setBy === 'day'}
            onChange={e => {
              const { name, value } = e.target
              setFieldValue(name, value)
              handleSetByOnChange(e, values)
            }}
            value="day"
          />
          {RruleHelper.LABELS.SET_BY_DAY_OF_THE_MONTH}{' '}
        </label>

        <div className="form-group ">
          <CustomSelect
            id="weekType"
            name="weekType"
            className="form-control"
            options={RruleHelper.WEEKS_TYPES}
            onChange={(name, value) => {
              setFieldValue(name, value)
              handleWeekTypeOnChange(value, values)
            }}
            onBlur={setFieldTouched}
            isSearchable={false}
            placeholder=""
            setFieldValue={setFieldValue}
            value={values.weekType}
            isDisabled={values.setBy === 'date'}
          />
        </div>

        <div className="form-group">
          <CustomSelect
            id="days"
            name="days"
            className="form-control col-sm-10"
            options={RruleHelper.FULL_WEEK_DAYS}
            onChange={(name, value) => {
              setFieldValue(name, value)
              handleDaysTypeOnChange(value, values)
            }}
            onBlur={setFieldTouched}
            isSearchable={false}
            placeholder=""
            setFieldValue={setFieldValue}
            value={values.days}
            isDisabled={values.setBy === 'date'}
          />
        </div>
      </div>
    </>
  )
}


ClickableMonthDays.propTypes = {
  handleMonthDatesSelect: PropTypes.func.isRequired,
  isFrom: PropTypes.string,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func.isRequired
}

ClickableMonthDays.defaultProps = {
  isFrom: '',
}
