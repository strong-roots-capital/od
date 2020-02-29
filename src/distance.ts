import { get } from './get'
import { curry, Curry } from './curry'
import { parseDate} from './parse'
import { UnitOfTime, unitsOfTime  } from './unit-of-time'

const millisecondsPer: Record<UnitOfTime, number> = {
    millisecond: 1,
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: NaN,
    year: NaN
}

const distance: Curry<
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
        a: Date,
        b: Date
    ) => number
    > = curry(
        function distance(
            unit: UnitOfTime,
            a: Date,
            b: Date
        ): number {

            parseDate(a)
            parseDate(b)

            switch(unit) {
                case 'year':
                    return get('year', b) - get('year', a)
                case 'month':
                    return (get('year', b) - get('year', a)) * 12 +
                        get('month', b) - get('month', a)

                case 'millisecond':
                case 'second':
                case 'minute':
                case 'hour':
                case 'day':
                case 'week':
                    const milliseconds = b.getTime() - a.getTime()
                    return Math.round(
                        milliseconds / millisecondsPer[unit]
                    )

                default:
                    throw new Error(`Expected argument 'unit' to be of type '${unitsOfTime.join(' | ')}'`)
            }

        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any

export { distance }

//  LocalWords:  UnitOfTime
