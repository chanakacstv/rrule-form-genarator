import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import moment from 'moment'
import { act } from 'react-dom/test-utils'
import { useField } from 'formik'

import { ClickableMonthDays } from './ClickableMonthDays'
import { findByTestAttr } from '../../../utility/TestUtility'
import { UnitTestHelper } from '../../../helpers/UnitTestHelper'
import { GeneratorContext } from '../../../providers/GeneratorContext'
import { RruleHelper } from '../../../helpers/RruleHelper'

jest.mock('formik')

const formValues = {
  frequency: RruleHelper.FREQUENCY[0],
  dueDate: moment().toDate(),
  startDate: moment().toDate(),
  endDate: moment().add(1, 'days'),
  weekType: RruleHelper.WEEKS_TYPES[0],
  weekDays: RruleHelper.WEEK_DAYS,
  monthDays: [{ rruleIndexNo: 1, label: '1', value: '1', isSelected: false }],
  days: RruleHelper.FULL_WEEK_DAYS[0],
  rrule: '',
  setBy: 'date',
  errors: {}
}

const defaultProps = {
  handleMonthDatesSelect: jest.fn(),
  isFrom: undefined,
  values: formValues,
  setFieldValue: jest.fn(),
  setFieldTouched: jest.fn(),
  errors: {}
}
const defaultContextValues = {
  handleSetByOnChange: jest.fn(),
  handleWeekTypeOnChange: jest.fn(),
  handleDaysTypeOnChange: jest.fn()
}

/**
 * Factory function to create a ShallowWrapper for the SOP Template Details component.
 * @function setup
 * @param { object } testValues - Context values specific to this setup.
 * @return { mount }
 */
const setup = (props = {}, values = {}) => {
  const setupProps = { ...defaultProps, ...props }
  const setupContextValue = { ...defaultContextValues, ...values }

  return mount(
    <Router>
      <GeneratorContext.Provider
        componentProps={UnitTestHelper.rRuleGenerator.defaultProviderProps}
        value={setupContextValue}
      >
        <ClickableMonthDays {...setupProps} />
      </GeneratorContext.Provider>
    </Router>
  )
}

describe('clikable month days component test', () => {
  let wrapper
  const customContext = {}

  const mockMeta = {
    touched: false,
    error: "",
    initialError: "",
    initialTouched: false,
    initialValue: "",
    value: "",
  }
  const mockField = {
    value: "",
    checked: false,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    multiple: undefined,
    name: "setBy",
  };

  beforeEach(() => {
    useField.mockReturnValue([mockField, mockMeta])
    wrapper = setup(defaultProps, customContext)
  })

  test('set by date field test', () => {
    // const component = findByTestAttr(wrapper, 'set-by-date-field')
    // expect(component.first().length).toBe(1)
    // expect(component.first().text()).toBe('Set by Date')

    // component.first().props().onClick()
    // setTimeout(() => {
    //   expect(defaultProps.onClick).toHaveBeenCalledWith()
    //   }, 0)
  })
})
