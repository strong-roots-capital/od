import { curry } from './curry.js'
import { parseDate } from './parse.js'
import { ResetableUnitOfTime, resetableUnitsOfTime } from './unit-of-time.js'

export const startOf = curry(function startOf(
  unit: ResetableUnitOfTime,
  date: Readonly<Date>,
): Date {
  parseDate(date)

  const clone = new Date(date.getTime())

  switch (unit) {
    case 'second':
      clone.setUTCMilliseconds(0)
      return clone
    case 'minute':
      clone.setUTCSeconds(0, 0)
      return clone
    case 'hour':
      clone.setUTCMinutes(0, 0, 0)
      return clone
    case 'day':
      clone.setUTCHours(0, 0, 0, 0)
      return clone
    case 'week':
      clone.setUTCHours(0, 0, 0, 0)
      clone.setUTCDate(date.getUTCDate() - date.getUTCDay())
      return clone
    case 'month':
      clone.setUTCHours(0, 0, 0, 0)
      clone.setUTCDate(1)
      return clone
    case 'year':
      clone.setUTCHours(0, 0, 0, 0)
      clone.setUTCMonth(0, 1)
      return clone
    default:
      throw new Error(
        `Expected argument 'unit' to be of type '${resetableUnitsOfTime.join(' | ')}'`,
      )
  }
})
