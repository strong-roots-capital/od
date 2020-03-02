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

function assert(unit: UnitOfTime): (a: Date, b: Date) => boolean {
    return function assertForUnitOfTime(a, b) {
        const expected = Math.round(
            (b.getTime() - a.getTime()) / millisecondsPer[unit]
        )
        return expected === distance(unit, a, b)
    }
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
    [fc.date(), fc.date()],
    (a: Date, b: Date) => {
        const months = distance('month', a, b)
        const expectedLowerBound = add('month', months, startOf('month', a)).getTime()
        const expectedUpperBound = add('month', months + 1, startOf('month', a)).getTime()
        return expectedLowerBound <= b.getTime() && b.getTime() <= expectedUpperBound
    },
    {verbose: true}
)

testProp(
    'should calculate distance in years between any two dates',
    [fc.date(), fc.date()],
    (a: Date, b: Date)=> {
        const years = distance('year', a, b)
        const expectedLowerBound = add('year', years, startOf('year', a)).getTime()
        const expectedUpperBound = add('year', years + 1, startOf('year', a)).getTime()
        return expectedLowerBound <= b.getTime() && b.getTime() <= expectedUpperBound
    },
    {verbose: true}
)

/*********************************************************************
 * Negative test cases
 ********************************************************************/

testProp(
    'should throw on unsupported unit',
    [
        fc.oneof<any>(
            fc.string().filter(not(includedIn(unitsOfTime as unknown as string[]))),
            fc.date(),
            fc.object(),
            fc.float(),
            fc.integer()
        ),
        fc.date(),
        fc.date()
    ],
    (unit: any, a: Date, b: Date) => {
        try {
            distance(unit, a, b)
            return false
        } catch (error) {
            return true
        }
    }
)

testProp(
    'should throw when a is not a Date',
    [
        fc.constantFrom(...unitsOfTime),
        fc.oneof<any>(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
        fc.date()
    ],
    (unit: UnitOfTime, amount: any, date: Date) => {
        try {
            distance(unit, amount, date)
            return false
        } catch (error) {
            return true
        }
    }
)

testProp(
    'should throw when b is not a Date',
    [
        fc.constantFrom(...unitsOfTime),
        fc.date(),
        fc.oneof<any>(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
    ],
    (unit: UnitOfTime, a: Date, b: any) => {
        try {
            distance(unit, a, b)
            return false
        } catch (error) {
            return true
        }
    }
)
