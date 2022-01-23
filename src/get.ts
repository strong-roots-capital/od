import { curry } from './curry'
import { parseDate } from './parse'
import { AccessibleUnitOfTime, accessibleUnitsOfTime } from './unit-of-time'

export const get = curry(function get(
  unit: AccessibleUnitOfTime,
  date: Readonly<Date>,
): number {
  parseDate(date)

  switch (unit) {
    case 'millisecond':
      return date.getUTCMilliseconds()
    case 'second':
      return date.getUTCSeconds()
    case 'minute':
      return date.getUTCMinutes()
    case 'hour':
      return date.getUTCHours()
    case 'date':
      return date.getUTCDate()
    case 'day':
      return date.getUTCDay()
    case 'month':
      return date.getUTCMonth()
    case 'year':
      return date.getUTCFullYear()
    case 'unix':
      return date.getTime()
    default:
      throw new Error(
        `Expected argument 'unit' to be of type '${accessibleUnitsOfTime.join(' | ')}'`,
      )
  }
})
