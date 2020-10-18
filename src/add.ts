import { curry } from './curry'
import { parseNumber, parseDate} from './parse'
import { UnitOfTime, unitsOfTime, millisecondsPer } from './unit-of-time'

function numberOfDaysInMonth(date: Date): number {
    return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getUTCDate()
}

function _addMonth(amount: number, date: Readonly<Date>): Date {
    // DOCUMENT: in docstring that final months with fewer days
    // than the given month will be change to the last day in the
    // final month
    const clone = new Date(date.getTime())
    clone.setUTCDate(1)
    clone.setUTCMonth(date.getUTCMonth() + amount)
    clone.setUTCDate(Math.min(numberOfDaysInMonth(clone), date.getUTCDate()))
    return clone
}

function _addYear(amount: number, date: Readonly<Date>): Date {
    // DOCUMENT: in docstring that final months with fewer days
    // than the given month will be change to the last day in the
    // final month
    const clone = new Date(date.getTime())
    clone.setUTCDate(1)
    clone.setUTCFullYear(date.getUTCFullYear() + amount)
    clone.setUTCDate(Math.min(numberOfDaysInMonth(clone), date.getUTCDate()))
    return clone
}

export const add = curry(
    function add(
        unit: UnitOfTime,
        amount: number,
        date: Readonly<Date>
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

//  LocalWords:  unitOfTime
