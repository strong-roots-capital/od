import { add } from './add'
import { curry } from './curry'
import { UnitOfTime } from './unit-of-time'

export const subtract = curry(
    function subtract(
        unit: UnitOfTime,
        amount: number,
        date: Readonly<Date>
    ): Date {
        return add(unit, -amount, date)
    }
)
