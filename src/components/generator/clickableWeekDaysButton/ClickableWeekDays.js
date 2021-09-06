/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

import './ClickableWeekDays.css'

export const ClickableWeekDays = props => {
  const { longItem, onClick, value, disabled, name, defaultSelected } = props

  const [widthStyles, setWIdthStyles] = useState('')

  useEffect(() => {
    if (longItem) {
      setWIdthStyles('longButton')
    }
  }, [longItem])

  return (
    <Button
      className={`clickButton ${defaultSelected ? 'clicked' : 'default'} ${widthStyles}`}
      onClick={() => onClick()}
      value={value}
      disabled={disabled}
    >
      {name}
    </Button>
  )
}

ClickableWeekDays.propTypes = {
  longItem: PropTypes.bool ,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired || PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired
}

ClickableWeekDays.defaultProps = {
  longItem: false,
  disabled: false,
}
