import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import moment from 'moment'
import { act } from 'react-dom/test-utils'

import { ClickableWeekDays } from './ClickableWeekDays'
import { findByTestAttr } from '../../../utility/TestUtility'

const defaultProps = {
  longItem: undefined,
  onClick: jest.fn(),
  value: 'Sunday',
  disabled: undefined,
  name: 'S',
  defaultSelected: false
}

/**
 * Factory function to create a ShallowWrapper for the SOP Template Details component.
 * @function setup
 * @param { object } testValues - Context values specific to this setup.
 * @return { mount }
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }

  return mount(
    <Router>
      <ClickableWeekDays {...setupProps} />
    </Router>
  )
}

describe('clikable week days component test', () => {
  let wrapper

  beforeEach(() => {
    wrapper = setup(defaultProps)
  })

  test('render clikable week days component without error', () => {
    const component = findByTestAttr(wrapper, 'week-day-element')
    expect(component.first().length).toBe(1)
    expect(component.first().text()).toBe('S')

    component.first().props().onClick()
    setTimeout(() => {
      expect(defaultProps.onClick).toHaveBeenCalledWith()
      }, 0)
  })
})
