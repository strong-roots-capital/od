import { add } from './add'
import { curry, Curry } from './curry'
import { UnitOfTime } from './unit-of-time'

const subtract: Curry<
    (
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
    ) => Date
    > = curry(
        function subtract(
            unit: UnitOfTime,
            amount: number,
            date: Date
        ): Date {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return add(unit, -amount, date) as any
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any

export { subtract }
