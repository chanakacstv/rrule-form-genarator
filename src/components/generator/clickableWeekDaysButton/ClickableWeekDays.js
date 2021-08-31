/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

import './ClickableWeekDays.css'

export const ClickableWeekDays = props => {
  const { longItem, onClick, value, disabled, name } = props
  
  const [backgroundColor, setBackgroundColor] = useState('default')
  const [widthStyles, setWIdthStyles] = useState('')

  useEffect(() => {
    if (longItem) {
      setWIdthStyles('longButton')
    }
  }, [longItem])

  const handleClick = () => {
    backgroundColor === 'default'
      ? setBackgroundColor('clicked')
      : setBackgroundColor('default')
  }

  return (
    <Button
      className={`clickButton ${backgroundColor} ${widthStyles}`}
      onClick={() => {
        handleClick()
        onClick()
      }}
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
