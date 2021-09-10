import { RruleHelper } from "../helpers/RruleHelper"
import { GenerateAnuallyRRule } from "./GenerateAnuallyRRule"
import { GenerateDailyRRule } from "./GenerateDailyRRule"
import { GenerateMonthlyRRule } from "./GenerateMonthlyRRule"
import { GenerateWeeklyRRule } from "./GenerateWeeklyRRule"

export const GenerateRRule = (
  values,
  selectedWeekDays,
  selectedDatesMonthly
) => {
  const {
    startDate,
    endDate,
    setBy,
    weekType,
    days,
    frequency: {
      value: frequencyValue,
      interval: frequencyInterval
    }
  } = values

  switch (frequencyValue) {
    case RruleHelper.FREQUENCY_VALUES.DAILY.value:
      return GenerateDailyRRule(
        startDate,
        endDate,
        frequencyInterval
      )
    case RruleHelper.FREQUENCY_VALUES.WEEKLY.value:
      return GenerateWeeklyRRule(
        startDate,
        endDate,
        selectedWeekDays,
        frequencyInterval
      )
    case RruleHelper.FREQUENCY_VALUES.BI_WEEKLY.value:
      return GenerateWeeklyRRule(
        startDate,
        endDate,
        selectedWeekDays,
        frequencyInterval
      )
    case RruleHelper.FREQUENCY_VALUES.MONTHLY.value:
      return GenerateMonthlyRRule(
        startDate,
        endDate,
        selectedDatesMonthly,
        setBy,
        weekType,
        days,
        frequencyInterval
      )
    case RruleHelper.FREQUENCY_VALUES.BI_MONTHLY.value:
      return GenerateMonthlyRRule(
        startDate,
        endDate,
        selectedDatesMonthly,
        setBy,
        weekType,
        days,
        frequencyInterval
      )
    case RruleHelper.FREQUENCY_VALUES.QUARTERLY.value:
      return GenerateMonthlyRRule(
        startDate,
        endDate,
        selectedDatesMonthly,
        setBy,
        weekType,
        days,
        frequencyInterval
      )
    case RruleHelper.FREQUENCY_VALUES.SEMI_ANNUALLY.value:
      return GenerateMonthlyRRule(
        startDate,
        endDate,
        selectedDatesMonthly,
        setBy,
        weekType,
        days,
        frequencyInterval
      )
    case RruleHelper.FREQUENCY_VALUES.ANNUALLY.value:
      return GenerateAnuallyRRule(
        startDate,
        endDate,
        frequencyInterval
      )
    default:
      return ''
  }
}
