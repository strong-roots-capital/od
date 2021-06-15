import { ExecutionContext } from 'ava'
import { testProp, fc } from 'ava-fast-check'
import { not, includedIn } from './util'
import { add } from '../src/add'
import { startOf } from '../src/start-of'
import {
    unitsOfTime,
    UnitOfTime,
    millisecondsPer
} from '../src/unit-of-time'

/**
 * Library under test
 */

import { distance } from '../src/distance'

function assert(unit: UnitOfTime): (t: ExecutionContext, a: Date, b: Date) => void {
    return function assertForUnitOfTime(t, a, b) {
        const expected = Math.round(
            (b.getTime() - a.getTime()) / millisecondsPer[unit]
        )
        t.is(expected, distance(unit, a, b))
    }
}

function isValidDate(date: Date): boolean {
    return !Number.isNaN(date.getTime())
}

/*********************************************************************
 * Positive test cases
 ********************************************************************/

testProp(
    'should calculate distance in milliseconds between any two dates',
    [fc.date(), fc.date()],
    assert('millisecond'),
    {verbose: true}
)

testProp(
    'should calculate distance in seconds between any two dates',
    [fc.date(), fc.date()],
    assert('second'),
    {verbose: true}
)

testProp(
    'should calculate distance in minutes between any two dates',
    [fc.date(), fc.date()],
    assert('minute'),
    {verbose: true}
)

testProp(
    'should calculate distance in hours between any two dates',
    [fc.date(), fc.date()],
    assert('hour'),
    {verbose: true}
)

testProp(
    'should calculate distance in days between any two dates',
    [fc.date(), fc.date()],
    assert('day'),
    {verbose: true}
)

testProp(
    'should calculate distance in weeks between any two dates',
    [fc.date(), fc.date()],
    assert('week'),
    {verbose: true}
)

testProp(
    'should calculate distance in months between any two dates',
    [
        fc.date().filter(d => isValidDate(startOf('month', d))),
        fc.date().filter(d => isValidDate(startOf('month', d)) && isValidDate(add('month', 1, d)))
    ],
    (t, a, b) => {
        const months = distance('month', a, b)
        const startOfA = startOf('month', a)

        // may land in the middle of the month due to leap seconds/minutes/days
        const expectedLowerBoundMonth = add('month', months, startOfA)
        const expectedUpperBoundMonth = add('month', months + 1, startOfA)

        const expectedLowerBound = startOf('month', expectedLowerBoundMonth)
        const expectedUpperBound = startOf('month', expectedUpperBoundMonth)

        t.true(expectedLowerBound.getTime() <= b.getTime() && b.getTime() <= expectedUpperBound.getTime())
    },
    {verbose: true}
)

testProp(
    'should calculate distance in years between any two dates',
    [
        fc.date().filter(d => isValidDate(startOf('year', d))),
        fc.date().filter(d => isValidDate(startOf('year', d)) && isValidDate(add('year', 1, d)))
    ],
    (t, a, b)=> {
        const years = distance('year', a, b)
        const startOfA = startOf('year', a)

        // may land in the middle of the year due to leap seconds/minutes/days
        const expectedLowerBoundYear = add('year', years, startOfA)
        const expectedUpperBoundYear = add('year', years + 1, startOfA)

        const expectedLowerBound = startOf('year', expectedLowerBoundYear)
        const expectedUpperBound = startOf('year', expectedUpperBoundYear)

        t.true(expectedLowerBound.getTime() <= b.getTime() && b.getTime() <= expectedUpperBound.getTime())
    },
    {verbose: true}
)

/*********************************************************************
 * Negative test cases
 ********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

testProp(
    'should throw on unsupported unit',
    [
        fc.oneof(
            fc.string().filter(not(includedIn(unitsOfTime as unknown as string[]))),
            fc.date(),
            fc.object(),
            fc.float(),
            fc.integer()
        ),
        fc.date(),
        fc.date()
    ],
    (t, unit, a, b) => {
        t.throws(() => distance(unit as any, a, b))
    }
)

testProp(
    'should throw when a is not a Date',
    [
        fc.constantFrom(...unitsOfTime),
        fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
        fc.date()
    ],
    (t, unit, amount, date) => {
        t.throws(() => distance(unit, amount as any, date))
    }
)

testProp(
    'should throw when b is not a Date',
    [
        fc.constantFrom(...unitsOfTime),
        fc.date(),
        fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
    ],
    (t, unit, a, b) => {
        t.throws(() => distance(unit, a, b as any))
    }
)
