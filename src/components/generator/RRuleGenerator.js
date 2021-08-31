/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Formik, Form, ErrorMessage, Field } from 'formik'

import { RruleHelper } from '../../helpers/RruleHelper'
import { CustomSelect } from '../common/CustomSelect'
import { GeneratorContext } from '../../providers/GeneratorContext'
import { CustomDatePicker } from '../common/CustomDatePicker'
import { ClickableWeekDays } from './clickableWeekDaysButton/ClickableWeekDays'
import { ClickableMonthDays } from './clickableMonthDaysButton/ClickableMonthDays'

export const ReactRRuleGenerator = props => {
  const {
    FORM_INITIAL_VALUES,
    FORM_YUP_VALIDATIONS,
    formSumbit,
    handleFrequencyOnChange,
    handleDueDateOnChange,
    selectedFrequencyType,
    handleMonthDatesSelect,
    handleWeekDatesSelect,
    endMinimumDate,
    setEndMinimumDate,
    handleStartDateOnChange,
    handleEndDateOnChange,
  } = useContext(GeneratorContext)

  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={FORM_YUP_VALIDATIONS}
      onSubmit={(values, actions) => formSumbit(values, actions)}
      render={
      ({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched
      }) => (
        <Form onSubmit={handleSubmit}>
          <div className="form-body">
            <div className="form-group">
              <label htmlFor="frequency">
                {RruleHelper.LABELS.FREQUENCY}
                <span className="required">*</span>
              </label>
              <CustomSelect
                id="frequency"
                name="frequency"
                className="form-control"
                options={RruleHelper.FREQUENCY}
                onChange={(name, value) => {
                  setFieldValue(name, value)
                  handleFrequencyOnChange(value, values)
                }}
                onBlur={setFieldTouched}
                isSearchable={false}
                placeholder=""
                setFieldValue={setFieldValue}
                value={values.frequency}
              />
              <div className="error-message">
                <ErrorMessage name="frequency" />
              </div>
            </div>

            {selectedFrequencyType ===
              RruleHelper.FREQUENCY_VALUES.ONE_TIME.value && (
              <div className="form-group position_relative">
                <label htmlFor="dueDate">
                  {RruleHelper.LABELS.DUE_DATE}{' '}
                  <span className="required red">*</span>
                </label>
                <CustomDatePicker
                  name="dueDate"
                  id="dueDate"
                  className="form-control"
                  minDate={moment().toDate()}
                  value={values.dueDate}
                  dateFormat="MM/dd/yyyy"
                  onChange={(name, value) => {
                    if (value !== null) {
                      setFieldValue('dueDate', value)
                      handleDueDateOnChange(value, values)
                    }
                  }}
                  onBlur={setFieldTouched}
                  placeholderText=""
                />
                <i className="mdi mdi-calendar-blank font_22" />
                <div className="error-message">
                  <ErrorMessage name="dueDate" />
                </div>
              </div>
            )}

            {selectedFrequencyType !== RruleHelper.FREQUENCY_VALUES.ONE_TIME.value && (
              <div>
                {(selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.WEEKLY.value ||
                selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.BI_WEEKLY.value) && (
                  <div className="form-group">
                    <p>
                      {RruleHelper.LABELS.WEEKLY_OPTION_TEXT}
                    </p>
                    {RruleHelper.WEEK_DAYS.map(item => {
                      return (
                        <ClickableWeekDays
                          key={item.value}
                          onClick={() => handleWeekDatesSelect(item.value, values)}
                          name={item.label}
                          value={item.value}
                          setFieldTouched={setFieldTouched}
                        />
                      )
                    })}
                  </div>
                )}

                {(selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.MONTHLY.value ||
                selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.BI_MONTHLY.value ||
                selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.QUARTERLY.value ||
                selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.SEMI_ANNUALLY.value) && (
                  <ClickableMonthDays
                    values={values}
                    setFieldValue={setFieldValue}
                    handleMonthDatesSelect={handleMonthDatesSelect}
                    isFrom="sop"
                  />
                )}

                <div className="form-group position_relative">
                  <label htmlFor="startDate">
                    {RruleHelper.LABELS.START_DATE}{' '}
                    <span className="required red">*</span>
                  </label>
                  <CustomDatePicker
                    name="startDate"
                    id="startDate"
                    className="form-control"
                    minDate={moment().toDate()}
                    value={values.startDate}
                    dateFormat="MM/dd/yyyy"
                    onChange={(name, value) => {
                      if (value !== null) {
                        setEndMinimumDate(
                          new Date(value).setDate(
                            new Date(value).getDate() + 1
                          )
                        )
                        setFieldValue('startDate', value)
                        setFieldValue(
                          'endDate',
                          moment(value, 'MM/DD/YYYY').add(1, 'days')
                        )
                        handleStartDateOnChange(value, values)
                      }
                    }}
                    onBlur={setFieldTouched}
                    placeholderText=""
                  />
                  <i className="mdi mdi-calendar-blank font_22" />
                  <div className="error-message">
                    <ErrorMessage name="startDate" />
                  </div>
                </div>

                <div className="form-group position_relative">
                  <label htmlFor="endDate">
                    {RruleHelper.LABELS.END_DATE}{' '}
                    <span className="required red">*</span>
                  </label>
                  <CustomDatePicker
                    name="endDate"
                    id="endDate"
                    className="form-control"
                    minDate={endMinimumDate}
                    value={values.endDate}
                    dateFormat="MM/dd/yyyy"
                    onChange={(name, value) => {
                      if (value !== null) {
                        setFieldValue('endDate', value)
                        handleEndDateOnChange(value, values)
                      }
                    }}
                    onBlur={setFieldTouched}
                    placeholderText=""
                  />
                  <i className="mdi mdi-calendar-blank font_22" />
                  <div className="error-message">
                    <ErrorMessage name="endDate" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Form>
      )}
    />
  )
}

ReactRRuleGenerator.propTypes = {
  isLoading: PropTypes.bool
}

ReactRRuleGenerator.defaultProps = {
  isLoading: false
}
