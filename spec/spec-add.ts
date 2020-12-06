import { ExecutionContext } from 'ava'
import { testProp, fc } from 'ava-fast-check'
import { not, includedIn } from './util'
import {
    unitsOfTime,
    UnitOfTime,
    Milliseconds,
    millisecondsPer
} from '../src/unit-of-time'

// TODO: document new `add` behavior in readme
// TODO: make a bug for this behavior and document it as fixed in the commit message
// TODO: publish as 4.0.0rc1 (or however those rc's work)

/**
 * Library under test
 */

import { add } from '../src/add'

/* http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1 */
const DATE_MAX_VALUE = 8640000000000000
const DATE_MIN = new Date(-DATE_MAX_VALUE)
const DATE_MAX = new Date(DATE_MAX_VALUE)

function assert(unit: UnitOfTime): (t: ExecutionContext, amount: number, date: Date) => void {
    return function assertForUnitOfTime(t, amount, date) {
        const expected = Math.trunc(date.getTime() + amount * millisecondsPer[unit])

        if (Math.abs(expected) > DATE_MAX_VALUE) {
            /* test is invalid -- exceeds range of valid Date */
            return t.pass()
        }

        const received = add(unit, amount, date)
        t.is(new Date(expected).toISOString(), received.toISOString())
    }
}

/* An inaccurate, over-cautious estimation */
function months(amount: number): Milliseconds {
    return millisecondsPer['week'] * 5 * amount
}

/* An inaccurate, over-cautious estimation */
function years(amount: number): Milliseconds {
    return millisecondsPer['week'] * 53 * amount
}

function numberOfDaysInMonth(date: Date): number {
    return new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getUTCDate()
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
    (t, amount, date) => {
        const expected = new Date(date)
        expected.setUTCDate(1)
        expected.setUTCMonth(date.getUTCMonth() + amount)
        expected.setUTCDate(Math.min(numberOfDaysInMonth(expected), date.getUTCDate()))

        const received = add('month', amount, date)
        t.is(expected.toISOString(), received.toISOString())
    },
    {
        verbose: true,
        numRuns: 1000
    }
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
    (t, amount, date) => {
        const expected = new Date(date)
        expected.setUTCDate(1)
        expected.setUTCFullYear(date.getUTCFullYear() + amount)
        expected.setUTCDate(Math.min(numberOfDaysInMonth(expected), date.getUTCDate()))

        const received = add('year', amount, date)
        t.is(expected.toISOString(), received.toISOString())
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

/*********************************************************************
 * Negative test cases
 ********************************************************************/

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
        fc.float(),
        fc.date()
    ],
    (t, unit, amount, date) => {
        t.throws(() => add(unit as any, amount, date))
    }
)

testProp(
    'should throw when amount is not a number',
    [
        fc.constantFrom(...unitsOfTime),
        fc.oneof(fc.string(), fc.date(), fc.object(), fc.boolean()),
        fc.date()
    ],
    (t, unit, amount, date) => {
        t.throws(() => add(unit, amount as any, date))
    }
)

testProp(
    'should throw when date is not a Date',
    [
        fc.constantFrom(...unitsOfTime),
        fc.oneof(fc.float(), fc.integer()),
        fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
    ],
    (t, unit, amount, date) => {
        t.throws(() => add(unit, amount, date as any))
    }
)
