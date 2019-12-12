import { add } from './add'
import { curry } from './curry'

const subtract = curry(
    function subtract(
        unit:
            | 'millisecond'
            | 'second'
            | 'minute'
            | 'hour'
            | 'day'
            | 'week'
            | 'month'
            | 'year',
        amount: number,
        date: Date
    ): Date {
        return add(unit, -amount, date)
    }
)

export { subtract }
