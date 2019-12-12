import {
    UnitOfTime,
    AccessibleUnitOfTime,
    ResetableUnitOfTime
} from './unit-of-time'

export function parseNumber(value: unknown): number {
    if (typeof value === 'number') {
        return value
    }
    throw new Error(`Expected argument to be of type number`)
}

export function parseDate(value: unknown): Date {
    if (
        Object.prototype.toString.call(value) === '[object Date]'
            && (value as Date).getTime !== undefined
            && !Number.isNaN((value as Date).getTime())
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return value as unknown as Date
    }
    throw new Error(`Expected argument to be of type Date`)
}

export function parseUnitOfTime(value: unknown): UnitOfTime {
    const unitsOfTime = [
        'millisecond',
        'second',
        'minute',
        'hour',
        'day',
        'week',
        'month',
        'year'
    ]

    if (typeof value !== 'string') {
        throw new Error(`Expected argument to be of type '${unitsOfTime.join(' | ')}'`)
    }

    if (unitsOfTime.includes(value)) {
        return value as UnitOfTime
    }

    throw new Error(`Expected argument to be of type '${unitsOfTime.join(' | ')}'`)
}

export function parseAccessibleUnitOfTime(value: unknown): AccessibleUnitOfTime {
    const accessibleUnitsOfTime = [
        'millisecond',
        'second',
        'minute',
        'hour',
        'day',
        'date',
        'month',
        'year',
        'unix'
    ]

    if (typeof value !== 'string') {
        throw new Error(`Expected argument to be of type '${accessibleUnitsOfTime.join(' | ')}'`)
    }

    if (accessibleUnitsOfTime.includes(value)) {
        return value as AccessibleUnitOfTime
    }

    throw new Error(`Expected argument to be of type '${accessibleUnitsOfTime.join(' | ')}'`)
}

export function parseResetableUnitOfTime(value: unknown): ResetableUnitOfTime {
    const resetableUnitsOfTime = [
        'second',
        'minute',
        'hour',
        'day',
        'week',
        'month',
        'year'
    ]

    if (typeof value !== 'string') {
        throw new Error(`Expected argument to be of type '${resetableUnitsOfTime.join(' | ')}'`)
    }

    if (resetableUnitsOfTime.includes(value)) {
        return value as ResetableUnitOfTime
    }

    throw new Error(`Expected argument to be of type '${resetableUnitsOfTime.join(' | ')}'`)
}
