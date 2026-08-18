import { add } from './add.js'
import { curry } from './curry.js'
import { UnitOfTime } from './unit-of-time.js'

export const subtract = curry(function subtract(
  unit: UnitOfTime,
  amount: number,
  date: Readonly<Date>,
): Date {
  return add(unit, -amount, date)
})
