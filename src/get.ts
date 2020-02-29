import { curry, Curry } from './curry'
import { parseDate} from './parse'
import { AccessibleUnitOfTime, accessibleUnitsOfTime  } from './unit-of-time'

const get: Curry<
    (
        unit:
            | 'millisecond'
            | 'second'
            | 'minute'
            | 'hour'
            | 'day'
            | 'date'
            | 'month'
            | 'year'
            | 'unix',
        date: Date
    ) => number
    > = curry(
        function get(
            unit: AccessibleUnitOfTime,
            date: Date
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
                    throw new Error(`Expected argument 'unit' to be of type '${accessibleUnitsOfTime.join(' | ')}'`)
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any

export { get }

//  LocalWords:  AccessibleUnitOfTime
