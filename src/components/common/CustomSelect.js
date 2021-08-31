/* eslint-disable react/destructuring-assignment */
import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export const CustomSelect = props => {
  const {
    onChange,
    onBlur,
    name,
    customCassName,
    styles,
    isClearable,
    isSearchable,
    isDisabled,
    options,
    value,
    placeholder,
    defaultValue,
    noOptionMessage,
    isLoading
  } = props

  const handleChange = value => {
    onChange(name, value)
  }

  const handleBlur = () => {
    if (onBlur) {
      onBlur(name, true)
    }
  }

  return (
    <Select
      className={customCassName !== undefined ? customCassName : ''}
      styles={styles !== undefined ? styles : ''}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      id={name}
      options={options}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue !== undefined ? defaultValue : ''}
      noOptionsMessage={() =>
        noOptionMessage !== undefined
          ? noOptionMessage
          : 'No Options'
      }
      isLoading={isLoading}
    />
  )
}

CustomSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  customCassName: PropTypes.string,
  styles: PropTypes.string,
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.object,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.object,
  noOptionMessage: PropTypes.string,
  isLoading: PropTypes.bool,
}

CustomSelect.defaultProps = {
  customCassName: '',
  styles: '',
  isClearable: false,
  isSearchable: false,
  isDisabled: false,
  options: [],
  value: {},
  placeholder: '',
  defaultValue: {},
  noOptionMessage: '',
  isLoading: false
}
