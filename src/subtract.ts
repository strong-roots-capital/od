import { add } from './add'
import { curry } from './curry'
import { UnitOfTime } from './unit-of-time'

const subtract = curry(
    function subtract(
        unit: UnitOfTime,
        amount: number,
        date: Date
    ): Date {
        return add(unit, -amount, date)
    }
)

export { subtract }
