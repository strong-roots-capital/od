import { get } from './get.js'
import { curry } from './curry.js'
import { parseDate } from './parse.js'
import { UnitOfTime, unitsOfTime, millisecondsPer } from './unit-of-time.js'

export const distance = curry(function distance(
  unit: UnitOfTime,
  a: Readonly<Date>,
  b: Readonly<Date>,
): number {
  parseDate(a)
  parseDate(b)

  switch (unit) {
    case 'year':
      return get('year', b) - get('year', a)

    case 'month':
      return (get('year', b) - get('year', a)) * 12 + get('month', b) - get('month', a)

    case 'millisecond':
    case 'second':
    case 'minute':
    case 'hour':
    case 'day':
    case 'week':
      const milliseconds = b.getTime() - a.getTime()
      return Math.round(milliseconds / millisecondsPer[unit])

    default:
      throw new Error(
        `Expected argument 'unit' to be of type '${unitsOfTime.join(' | ')}'`,
      )
  }
  /* c8 ignore start */
})
