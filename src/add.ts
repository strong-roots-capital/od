import { curry, Curry } from './curry'
import { UnitOfTime } from './unit-of-time'
import { parseNumber, parseDate, parseUnitOfTime } from './parse'

const steps: Record<UnitOfTime, number> = {
    millisecond: 1,
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: NaN,
    year: NaN
}

function _addMonth(amount: number, date: Date): Date {
    const clone = new Date(date)
    clone.setUTCMonth(date.getUTCMonth() + amount)
    return clone
}

function _addYear(amount: number, date: Date): Date {
    const clone = new Date(date)
    clone.setUTCFullYear(date.getUTCFullYear() + amount)
    return clone
}

const add: Curry<
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
        function add(
            unit: UnitOfTime,
            amount: number,
            date: Date
        ): Date {

            parseUnitOfTime(unit)
            parseNumber(amount)
            parseDate(date)

            switch (unit) {
                case 'month':
                    return _addMonth(amount, date)
                case 'year':
                    return _addYear(amount, date)
                default:
                    return new Date(steps[unit] * amount + date.getTime())
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any

export { add }
