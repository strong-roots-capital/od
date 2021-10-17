export const unitsOfTime = [
  'millisecond',
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year',
] as const

export type UnitOfTime = typeof unitsOfTime[number]

export const accessibleUnitsOfTime = [
  'millisecond',
  'second',
  'minute',
  'hour',
  'day',
  'date',
  'month',
  'year',
  'unix',
] as const

export type AccessibleUnitOfTime = typeof accessibleUnitsOfTime[number]

export const resetableUnitsOfTime = [
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'year',
] as const

export type ResetableUnitOfTime = typeof resetableUnitsOfTime[number]

export type Milliseconds = number

export const millisecondsPer: Record<UnitOfTime, Milliseconds> = {
  millisecond: 1,
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: NaN,
  year: NaN,
}
