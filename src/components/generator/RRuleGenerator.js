/* eslint-disable react/destructuring-assignment */
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { Col, Row } from 'react-bootstrap'

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
    handleMultipleWeekDatesSelect,
    handleSingleWeekDatesSelect,
    endMinimumDate,
    setEndMinimumDate,
    handleStartDateOnChange,
    handleEndDateOnChange,
    // formCustomValidate,
    formErrors,
    setFormErrors
  } = useContext(GeneratorContext)

  return (
    <Formik
      enableReinitialize
      initialValues={FORM_INITIAL_VALUES}
      // validationSchema={FORM_YUP_VALIDATIONS}
      // validate={values => formCustomValidate(values)}
      // onSubmit={(values, actions) => formSumbit(values, actions)}
      data-test="rrule-formik-element"
    >
      {({
        values,
        // errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        resetForm
      }) => (
        <Form onSubmit={handleSubmit} data-test="rrule-form-element">
          <div className="form-body">
            <div className="form-group">
              <label htmlFor="frequency" data-test="rrule-form-frequency-label-element">
                {RruleHelper.LABELS.FREQUENCY}{' '}
                <span className="required">*</span>
              </label>
              <CustomSelect
                id="frequency"
                name="frequency"
                className="form-control"
                options={RruleHelper.FREQUENCY}
                onChange={(name, value) => {
                  handleFrequencyOnChange(value, values, setFieldValue, resetForm)
                }}
                onBlur={setFieldTouched}
                isSearchable={false}
                placeholder=""
                setFieldValue={setFieldValue}
                value={values.frequency}
                data-test="rrule-form-frequency-select-element"
              />
              <div className="error-message">
                <ErrorMessage name="frequency" />
              </div>
            </div>

            {(selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.ONE_TIME.value ||
              selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.ONE_TIME_READ_ONLY.value) && (
              <div className="form-group position_relative">
                <label htmlFor="dueDate" data-test="rrule-form-due-date-label-element">
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
                      handleDueDateOnChange(value, values, setFieldValue)
                    }
                  }}
                  onBlur={setFieldTouched}
                  placeholderText=""
                  data-test="rrule-form-due-date-date-picker-element"
                />
                <i className="mdi mdi-calendar-blank font_22" />
                <div className="error-message">
                  <ErrorMessage name="dueDate" />
                </div>
              </div>
            )}

            {(selectedFrequencyType !== RruleHelper.FREQUENCY_VALUES.ONE_TIME.value &&
            selectedFrequencyType !== RruleHelper.FREQUENCY_VALUES.ONE_TIME_READ_ONLY.value) && (
              <div>
                {(selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.WEEKLY.value ||
                selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.BI_WEEKLY.value) && (
                  <div className="form-group">
                    <p data-test="rrule-form-weekly-label-element">
                      {RruleHelper.LABELS.WEEKLY_OPTION_TEXT}
                    </p>
                    {values.weekDays.map(item => {
                      return (
                        <ClickableWeekDays
                          key={item.value}
                          onClick={() => {
                            selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.WEEKLY.value
                            ? handleMultipleWeekDatesSelect(item.value, values, setFieldValue)
                            : handleSingleWeekDatesSelect(item.value, values, setFieldValue)

                            setFieldTouched('weekDays', true)
                            setFormErrors({})
                          }}
                          name={item.label}
                          value={item.value}
                          setFieldTouched={setFieldTouched}
                          defaultSelected={item.isSelected}
                          data-test="rrule-form-weekly-component"
                        />
                      )
                    })}
                    {values.errors.weekDays && <div className="error-message">{values.errors.weekDays}</div>}
                  </div>
                )}

                {(selectedFrequencyType === RruleHelper.FREQUENCY_VALUES.MONTHLY.value) && (
                  <>
                    <p data-test="rrule-form-monthly-label-element">
                      {RruleHelper.LABELS.MONTHLY_OPTION_TEXT}
                    </p>
                    <ClickableMonthDays
                      values={values}
                      setFieldValue={setFieldValue}
                      handleMonthDatesSelect={handleMonthDatesSelect}
                      isFrom="sop"
                      errors={values.errors}
                      data-test="rrule-form-month-component"
                    />
                  </>
                )}

                <Row>
                  <Col md={6} className="form-group position_relative">
                    <label htmlFor="startDate" data-test="rrule-form-start-date-label">
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
                          handleStartDateOnChange(value, values, setFieldValue)
                        }
                      }}
                      onBlur={setFieldTouched}
                      placeholderText=""
                      data-test="rrule-form-start-date-date-picker"
                    />
                    <i className="mdi mdi-calendar-blank font_22" />
                    <div className="error-message">
                      <ErrorMessage name="startDate" />
                    </div>
                  </Col>
                
                  <Col md={6} className="form-group position_relative">
                    <label htmlFor="endDate" data-test="rrule-form-end-date-label">
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
                          handleEndDateOnChange(value, values, setFieldValue)
                        }
                      }}
                      onBlur={setFieldTouched}
                      placeholderText=""
                      data-test="rrule-form-end-date-date-picker"
                    />
                    <i className="mdi mdi-calendar-blank font_22" />
                    <div className="error-message">
                      <ErrorMessage name="endDate" />
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}
