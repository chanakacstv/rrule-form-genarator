import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { enUS } from 'date-fns/locale'
import PropTypes from 'prop-types'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

export const CustomDatePicker = props => {
  const {
    readOnly,
    inline,
    value,
    name,
    maxDate,
    minDate,
    className,
    dateFormat,
    disabled,
    isClearable,
    customInput,
    placeholderText,
    onKeyDown,
    onChangeRaw,
    showMonthYearPicker,
    onChange
  } = props

  registerLocale('enUS', enUS)

  return (
    <DatePicker
      readOnly={readOnly}
      inline={inline}
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val)
      }}
      maxDate={maxDate}
      minDate={minDate}
      className={className}
      dateFormat={dateFormat}
      disabled={disabled}
      isClearable={isClearable}
      customInput={customInput}
      placeholderText={placeholderText}
      onKeyDown={onKeyDown}
      onChangeRaw={onChangeRaw}
      showMonthYearPicker={showMonthYearPicker ? true : undefined}
      locale="enUS"
    />
  )
}

CustomDatePicker.propTypes = {
  readOnly: PropTypes.bool,
  inline: PropTypes.bool,
  value: PropTypes.object,
  name: PropTypes.string,
  // maxDate: PropTypes.instanceOf(Date),
  // minDate: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  customInput: PropTypes.bool,
  placeholderText: PropTypes.string,
  onKeyDown: PropTypes.func,
  onChangeRaw: PropTypes.func,
  showMonthYearPicker: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

CustomDatePicker.defaultProps = {
  readOnly: false,
  inline: false,
  value: {},
  name: '',
  // maxDate: '',
  // minDate: '',
  className: '',
  dateFormat: '',
  disabled: false,
  isClearable: false,
  customInput: false,
  placeholderText: '',
  onKeyDown: undefined,
  onChangeRaw: undefined,
  showMonthYearPicker: false,
}

