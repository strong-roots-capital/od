export const unitsOfTime = [
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year'
] as const

export type UnitOfTime = (typeof unitsOfTime)[number]

export const accessibleUnitsOfTime = [
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'date',
    'month',
    'year',
    'unix'
] as const

export type AccessibleUnitOfTime = (typeof accessibleUnitsOfTime)[number]

export const resetableUnitsOfTime = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year'
] as const

export type ResetableUnitOfTime = (typeof resetableUnitsOfTime)[number]
