import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import moment from 'moment'
import { act } from 'react-dom/test-utils';

import { GeneratorContext } from '../../providers/GeneratorContext'
import { ReactRRuleGenerator } from './RRuleGenerator'
import { UnitTestHelper } from '../../helpers/UnitTestHelper'
import { findByTestAttr } from '../../utility/TestUtility'
import { RruleHelper } from '../../helpers/RruleHelper'

const DEFAULT_INIT_VALUES = {
  frequency: RruleHelper.FREQUENCY[0],
  dueDate: moment().toDate(),
  startDate: moment().toDate(),
  endDate: moment().add(1, 'days'),
  weekType: RruleHelper.WEEKS_TYPES[0],
  weekDays: RruleHelper.WEEK_DAYS,
  monthDays: RruleHelper.MONTH_DAYS,
  days: RruleHelper.FULL_WEEK_DAYS[0],
  rrule: '',
  setBy: 'date',
  errors: {}
}

const formikFields = {
  setFieldValue: jest.fn()
}

const defaultProps = {}
const defaultContextValues = {
  FORM_INITIAL_VALUES: DEFAULT_INIT_VALUES,
  handleFrequencyOnChange: jest.fn(),
  handleDueDateOnChange: jest.fn(),
  handleMultipleWeekDatesSelect: jest.fn(),
  setFormErrors: jest.fn(),
  handleStartDateOnChange: jest.fn(),
  handleEndDateOnChange: jest.fn(),
  setEndMinimumDate: jest.fn()
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
        <ReactRRuleGenerator {...setupProps} />
      </GeneratorContext.Provider>
    </Router>
  )
}

describe('Rrule Generator component test', () => {
  let wrapper
  const customContext = {}

  beforeEach(() => {
    wrapper = setup(defaultProps, customContext)
  })

  test('render rrule generator component without error', () => {
    const component = findByTestAttr(wrapper, 'rrule-formik-element')
    expect(component.first().length).toBe(1)
  })
})

describe('Rrule form elements test for `one-time`', () => {
  let wrapper
  const customContext = {
    selectedFrequencyType: 0
  }

  beforeEach(() => {
    wrapper = setup(defaultProps, customContext)
  })

  test('rrule form frequency element test', () => {
    const component = findByTestAttr(wrapper, 'rrule-form-element')
    expect(component.first().length).toBe(1)
  })

  test('rrule form frequency element', () => {
    const label = findByTestAttr(wrapper, 'rrule-form-frequency-label-element')
    expect(label.first().length).toBe(1)
    expect(label.first().text()).toBe('Frequency *')

    const select = findByTestAttr(wrapper, 'rrule-form-frequency-select-element')
    expect(select.first().length).toBe(1)
    // select
    //   .first()
    //   .simulate('change')
    select.first().props().onChange('frequency', RruleHelper.FREQUENCY[0])
    setTimeout(() => {
      expect(defaultContextValues.handleFrequencyOnChange).toHaveBeenCalledWith()
    }, 0)
  })
})

describe('Rrule form due-date element test for `one-time`', () => {
  let wrapper
  const customContext = {
    selectedFrequencyType: 0
  }

  beforeEach(() => {
    wrapper = setup(defaultProps, customContext)
  })

  test('rrule form due date picker element', () => {
    const label = findByTestAttr(wrapper, 'rrule-form-due-date-label-element')
    expect(label.first().length).toBe(1)
    expect(label.first().text()).toBe('Due Date *')

    const datePicker = findByTestAttr(wrapper, 'rrule-form-due-date-date-picker-element')
    expect(datePicker.first().length).toBe(1)
    // datePicker
    //   .first()
    //   .simulate('change')
    datePicker.first().props().onChange('dueDate', moment().toDate())
    setTimeout(() => {
      expect(defaultContextValues.handleDueDateOnChange).toHaveBeenCalledWith(
        moment().toDate(), DEFAULT_INIT_VALUES, jest.fn()
      )
      expect(formikFields.setFieldValue).toHaveBeenCalledWith(
        'dueDate', moment().toDate()
      )
    }, 0)
  })
})

describe('Rrule form week date picker element test for `weekly or bi-weekly`', () => {
  let wrapper
  const customContext = {
    selectedFrequencyType: 7 || 14
  }

  beforeEach(() => {
    wrapper = setup(defaultProps, customContext)
  })

  test('rrule form week date picker element', () => {
    const label = findByTestAttr(wrapper, 'rrule-form-weekly-label-element')
    expect(label.first().length).toBe(1)
    expect(label.first().text()).toBe(`Select the days of the week you'd like this SOP to be assigned`)

    const weeklyElement = findByTestAttr(wrapper, 'rrule-form-weekly-component')
    expect(weeklyElement.first().length).toBe(1)
    // act(() => {
    //   weeklyElement.first().simulate('click');
    // });
    // wrapper.update();
    // weeklyElement
    //   .first()
    //   .simulate('click')
    // setTimeout(() => {
    //   expect(defaultContextValues.handleMultipleWeekDatesSelect).toHaveBeenCalledWith()
    // }, 0)

    weeklyElement.first().props().onClick()
    setTimeout(() => {
    expect(defaultContextValues.handleMultipleWeekDatesSelect).toHaveBeenCalledWith(
        "Sunday",
        DEFAULT_INIT_VALUES,
        formikFields.setFieldValue
      )
    }, 0)
  })
})

describe('Rrule form month date picker element test for `Monthly`', () => {
  let wrapper
  const customContext = {
    selectedFrequencyType: 30
  }

  beforeEach(() => {
    wrapper = setup(defaultProps, customContext)
  })

  test('rrule form month date picker element', () => {
    const label = findByTestAttr(wrapper, 'rrule-form-monthly-label-element')
    expect(label.first().length).toBe(1)
    expect(label.first().text()).toBe(`Select the days of the month you'd like this SOP to be assigned`)
  })
})

describe('Rrule form start date picker element test for `Monthly`', () => {
  let wrapper
  const customContext = {
    selectedFrequencyType: 30
  }

  beforeEach(() => {
    wrapper = setup(defaultProps, customContext)
  })

  test('rrule form start date picker element', () => {
    const label = findByTestAttr(wrapper, 'rrule-form-start-date-label')
    expect(label.first().length).toBe(1)
    expect(label.first().text()).toBe(`Start Date *`)

    const datePicker = findByTestAttr(wrapper, 'rrule-form-start-date-date-picker')
    expect(datePicker.first().length).toBe(1)
    // datePicker
    //   .first()
    //   .simulate('change')
    // setTimeout(() => {
    //   expect(defaultContextValues.handleStartDateOnChange).toHaveBeenCalledWith()
    // }, 0)
    datePicker.first().props().onChange('startDate', moment().toDate())
    setTimeout(() => {
      expect(defaultContextValues.handleStartDateOnChange).toHaveBeenCalledWith(
        moment().toDate(), DEFAULT_INIT_VALUES, formikFields.setFieldValue
      )
      expect(defaultContextValues.setEndMinimumDate).toHaveBeenCalledWith(
        moment().toDate()
      )
    }, 0)
  })
})

describe('Rrule form end date picker element test for `Monthly`', () => {
  let wrapper
  const customContext = {
    selectedFrequencyType: 30
  }

  beforeEach(() => {
    wrapper = setup(defaultProps, customContext)
  })

  test('rrule form start date picker element', () => {
    const label = findByTestAttr(wrapper, 'rrule-form-end-date-label')
    expect(label.first().length).toBe(1)
    expect(label.first().text()).toBe(`End Date *`)

    const datePicker = findByTestAttr(wrapper, 'rrule-form-end-date-date-picker')
    // expect(datePicker.first().length).toBe(1)
    // datePicker
    //   .first()
    //   .simulate('change')
    // setTimeout(() => {
    //   expect(defaultContextValues.handleEndDateOnChange).toHaveBeenCalledWith()
    // }, 0)
    datePicker.first().props().onChange('endDate', moment().toDate())
    setTimeout(() => {
      expect(defaultContextValues.handleStartDateOnChange).toHaveBeenCalledWith(
        moment().toDate(), DEFAULT_INIT_VALUES, formikFields.setFieldValue
      )
    }, 0)
  })
})
