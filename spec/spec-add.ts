import { testProp, fc } from 'ava-fast-check'

/**
 * Library under test
 */

import { add } from '../src/add'

const unitsOfTime = [
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
] as const

type UnitOfTime = (typeof unitsOfTime)[number];
type Milliseconds = number

const steps: Record<UnitOfTime, Milliseconds> = {
    millisecond: 1,
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: NaN,
    year: NaN
}

/* http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1 */
const DATE_MAX_VALUE = 8640000000000000
const DATE_MIN = new Date(-DATE_MAX_VALUE)
const DATE_MAX = new Date(DATE_MAX_VALUE)

function assert(unit: UnitOfTime): (amount: number, date: Date) => boolean {
    return function assertUnitOfTime(amount, date) {
        const expected = Math.trunc(date.getTime() + amount * steps[unit])

        if (Math.abs(expected) > DATE_MAX_VALUE) {
            /* test is invalid -- exceeds range of valid Date */
            return true
        }

        const received = add(unit, amount, date)
        return expected === received.getTime()
    }
}

/* An inaccurate, over-cautious estimation */
function months(amount: number): Milliseconds {
    return steps['week'] * 5 * amount
}

/* An inaccurate, over-cautious estimation */
function years(amount: number): Milliseconds {
    return steps['week'] * 53 * amount
}

/*********************************************************************
 * Positive test cases
 ********************************************************************/

testProp(
    'should add any number of milliseconds to a given date',
    [fc.oneof(fc.float(), fc.integer()), fc.date()],
    assert('millisecond'),
    {verbose: true}
)

testProp(
    'should add any number of seconds to a given date',
    [fc.oneof(fc.float(), fc.integer()), fc.date()],
    assert('second'),
    {verbose: true}
)

testProp(
    'should add any number of minutes to a given date',
    [fc.oneof(fc.float(), fc.integer()), fc.date()],
    assert('minute'),
    {verbose: true}
)

testProp(
    'should add any number of hours to a given date',
    [fc.oneof(fc.float(), fc.integer()), fc.date()],
    assert('hour'),
    {verbose: true}
)

testProp(
    'should add any number of days to a given date',
    [fc.oneof(fc.float(), fc.integer()), fc.date()],
    assert('day'),
    {verbose: true}
)

testProp(
    'should add any number of weeks to a given date',
    [fc.oneof(fc.float(), fc.integer()), fc.date()],
    assert('week'),
    {verbose: true}
)

testProp(
    'should add any number of months to a given date',
    [
        fc.oneof(fc.float(), fc.integer(-3000, 3000)),
        fc.date({
            min: new Date(DATE_MIN.getTime() + months(3001)),
            max: new Date(DATE_MAX.getTime() - months(3001))
        })
    ],
    (amount: number, date: Date) => {
        const expected = new Date(date)
        expected.setUTCMonth(date.getUTCMonth() + amount)

        const received = add('month', amount, date)
        return expected.getTime() === received.getTime()
    },
    {verbose: true}
)

testProp(
    'should add any number of years to a given date',
    [
        fc.oneof(fc.float(), fc.integer(-3000, 3000)),
        fc.date({
            min: new Date(DATE_MIN.getTime() + years(3001)),
            max: new Date(DATE_MAX.getTime() - years(3001))
        })
    ],
    (amount: number, date: Date) => {
        const expected = new Date(date)
        expected.setUTCFullYear(date.getUTCFullYear() + amount)

        const received = add('year', amount, date)
        return expected.getTime() === received.getTime()
    },
    {verbose: true}
)

/*********************************************************************
 * Negative test cases
 ********************************************************************/

function not<F extends (...args: any[]) => boolean>(f: F): F {
    return function inverted(...args: Parameters<F>) {
        return !f(...args)
    } as F
}

function includedIn<T>(list: T[]): (value: T) => boolean {
    return function testIsIncludedIn(value) {
        return list.includes(value)
    }
}

testProp(
    'should throw on unsupported unit',
    [
        fc.oneof<any>(
            fc.string().filter(not(includedIn(unitsOfTime as unknown as string[]))),
            fc.date(),
            fc.object()
        ),
        fc.float(),
        fc.date()
    ],
    (unit: any, amount: number, date: Date) => {
        try {
            add(unit, amount, date)
            return false
        } catch (error) {
            return true
        }
    }
)

testProp(
    'should throw when amount is not a number',
    [
        fc.constantFrom(...unitsOfTime),
        fc.oneof<any>(fc.string(), fc.date(), fc.object(), fc.boolean()),
        fc.date()
    ],
    (unit: UnitOfTime, amount: any, date: Date) => {
        try {
            add(unit, amount, date)
            return false
        } catch (error) {
            return true
        }
    }
)

testProp(
    'should throw when date is not a Date',
    [
        fc.constantFrom(...unitsOfTime),
        fc.oneof(fc.float(), fc.integer()),
        fc.oneof<any>(fc.string(), fc.float(), fc.object(), fc.boolean()),
    ],
    (unit: UnitOfTime, amount: number, date: any) => {
        try {
            add(unit, amount, date)
            return false
        } catch (error) {
            return true
        }
    }
)
