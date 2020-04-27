import { curry } from './curry'
import { parseNumber, parseDate} from './parse'
import { UnitOfTime, unitsOfTime, millisecondsPer } from './unit-of-time'

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

const add = curry(
    function add(
        unit: UnitOfTime,
        amount: number,
        date: Date
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
                throw new Error(`Expected argument 'unit' to be of type '${unitsOfTime.join(' | ')}'`)
        }
    }
)

export { add }

//  LocalWords:  unitOfTime
