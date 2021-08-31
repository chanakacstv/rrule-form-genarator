export const RruleHelper = Object.freeze({
  LABELS: {
    FREQUENCY: 'Frequency',
    DUE_DATE: 'Due Date',
    MONTHLY_OPTION_TEXT: "Select the day of the month you'd like this SOP to be assigned",
    SET_BY_DATE: 'SET BY DATE',
    SET_BY_DAY_OF_THE_MONTH: 'SET BY DAY OF THE MONTH',
    START_DATE: 'Start Date',
    END_DATE: ' End Date',
  },

  DEFAULT_FREQUENCY: [
    { label: 'One-Time', value: 0 },
    { label: 'Daily', value: 1 },
    { label: 'Weekly', value: 7 },
    { label: 'Monthly', value: 30 }
  ],

  FREQUENCY: [
    { label: 'One-Time (Read Only)', value: -1, interval: 0 },
    { label: 'One-Time', value: 0, interval: 0 },
    { label: 'Daily', value: 1, interval: 1 },
    { label: 'Weekly', value: 7, interval: 1 },
    { label: 'Monthly', value: 30, interval: 1 },
    { label: 'Bi-Monthly', value: 60, interval: 2 },
    { label: 'Quarterly', value: 90, interval: 3 },
    { label: 'Semiannual', value: 180, interval: 6 },
    { label: 'Annually', value: 365, interval: 1 },
  ],

  FREQUENCY_VALUES: {
    ONE_TIME: { label: 'One-Time', value: 0, valueString: '' },
    DAILY: { label: 'Daily', value: 1, valueString: 'DAILY' },
    WEEKLY: { label: 'Weekly', value: 7, valueString: 'WEEKLY' },
    BI_WEEKLY: { label: 'Bi-Weekly', value: 14, valueString: 'BI_WEEKLY' },
    MONTHLY: { label: 'Monthly', value: 30, valueString: 'MONTHLY' },
    BI_MONTHLY: { label: 'Bi-Monthly', value: 60, valueString: 'Bi_MONTHLY' },
    QUARTERLY: { label: 'Quarterly', value: 90, valueString: 'QUARTELY' },
    SEMI_ANNUALLY: { label: 'Semiannual', value: 180, valueString: 'SEMI_ANNUALLY' },
    ANNUALLY: { label: 'Annually', value: 365, valueString: 'ANNUALLY' },
  },

  WEEKS_TYPES: [
    { label: 'First', value: '1', id: 1 },
    { label: 'Second', value: '2', id: 2 },
    { label: 'Third', value: '3', id: 3 },
    { label: 'Fourth', value: '4', id: 4 },
    { label: 'Last', value: '-1', id: -1 }
  ],

  FULL_WEEK_DAYS: [
    { label: 'Sunday', value: 'SU' },
    { label: 'Monday', value: 'MO' },
    { label: 'Tuesday', value: 'TU' },
    { label: 'Wednesday', value: 'WE' },
    { label: 'Thursday', value: 'TH' },
    { label: 'Friday', value: 'FR' },
    { label: 'Saturday', value: 'SA' }
  ],

  WEEK_DAYS: [
    { label: 'S', value: 'Sunday' },
    { label: 'M', value: 'Monday' },
    { label: 'T', value: 'Tuesday' },
    { label: 'W', value: 'Wednesday' },
    { label: 'T', value: 'Thursday' },
    { label: 'F', value: 'Friday' },
    { label: 'S', value: 'Saturday' }
  ],

  DAYS_OF_MONTH: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    'Last Day'
  ],
})
  