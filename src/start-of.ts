import { curry, Curry } from './curry'
import { ResetableUnitOfTime } from './unit-of-time'
import { parseDate, parseResetableUnitOfTime } from './parse'

const startOf: Curry<
    (
        unit:
            | 'second'
            | 'minute'
            | 'hour'
            | 'day'
            | 'week'
            | 'month'
            | 'year',
        date: Date
    ) => Date
    > = curry(
        function startOf(
            unit: ResetableUnitOfTime,
            date: Date
        ): Date {

            parseResetableUnitOfTime(unit)
            parseDate(date)

            const clone = new Date(date)

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
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any

export { startOf }
