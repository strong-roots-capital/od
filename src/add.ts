import { curry } from './curry.js'
import { parseNumber, parseDate } from './parse.js'
import { UnitOfTime, unitsOfTime, millisecondsPer } from './unit-of-time.js'

/**
 * Returns `NaN` when `date` is in the last-representable month,
 * +275760-09-O1T00:00:00.000Z (October -- months are zero-indexed).
 */
function numberOfDaysInMonth(date: Date): number {
  const daysInMonth = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    0,
  ).getUTCDate()
  // happens when `date` is in the last-representable month,
  // +275760-09-20T00:00:00.000Z (October -- months are zero-indexed)
  if (Number.isNaN(daysInMonth)) {
    return 31
  }
  return daysInMonth
}

function _addMonth(amount: number, date: Readonly<Date>): Date {
  // The plan: set the date to the beginning of the month,
  // advance the month counter, and reset the date to either
  // the start-date or the end of the month, whichever is earlier.
  //
  // This avoids the case where we land on day 31 of a month with
  // only 30 days, which then rolls over to the next month and
  // means we advanced by 1-too-many months.
  let clone = new Date(date.getTime())
  clone.setUTCDate(1)
  // When `date` is less-than one month after the
  // earliest-representable date (October 20), we can't reset the
  // date back to the beginning of the month so we instead advance
  // to the second month before winding back to the first day of the
  // month and decrement 1 from the number of months to add.
  if (Number.isNaN(clone.getTime()) && 0 < amount) {
    clone = new Date(date.getTime())
    // a date inside the first- and second- representable month
    clone.setUTCDate(28)
    clone.setUTCMonth(clone.getUTCMonth() + 1)
    clone.setUTCDate(1)
    amount -= 1
  }
  clone.setUTCMonth(clone.getUTCMonth() + amount)
  clone.setUTCDate(Math.min(numberOfDaysInMonth(clone), date.getUTCDate()))
  return clone
}

function _addYear(amount: number, date: Readonly<Date>): Date {
  const clone = new Date(date.getTime())
  clone.setUTCDate(1)
  clone.setUTCFullYear(date.getUTCFullYear() + amount)
  clone.setUTCDate(Math.min(numberOfDaysInMonth(clone), date.getUTCDate()))
  return clone
}

export const add = curry(function add(
  unit: UnitOfTime,
  amount: number,
  date: Readonly<Date>,
): Date {
  parseNumber(amount)
  parseDate(date)

  switch (unit) {
    case 'month':
      return _addMonth(amount, date)

    case 'year':
      return _addYear(amount, date)

    case 'millisecond':
    case 'second':
    case 'minute':
    case 'hour':
    case 'day':
    case 'week':
      return new Date(millisecondsPer[unit] * amount + date.getTime())

    default:
      throw new Error(
        `Expected argument 'unit' to be of type '${unitsOfTime.join(' | ')}'`,
      )
  }
})
