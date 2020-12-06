import { testProp, fc } from 'ava-fast-check'
import { not, includedIn } from './util'
import { resetableUnitsOfTime } from '../src/unit-of-time'

/**
 * Library under test
 */

import { startOf } from '../src/start-of'

/*********************************************************************
 * Positive test cases
 ********************************************************************/

testProp(
    'should set milliseconds to zero after winding date back to start-of second',
    [fc.date()],
    (t, date) => {
        t.is(0, startOf('second', date).getUTCMilliseconds())
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set seconds to zero after winding date back to start-of minute',
    [fc.date()],
    (t, date) => {
        const reset = startOf('minute', date)
        t.is(0, reset.getUTCSeconds())
        t.is(0, reset.getUTCMilliseconds())
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set minutes to zero after winding date back to start-of hour',
    [fc.date()],
    (t, date) => {
        const reset = startOf('hour', date)
        t.is(0, reset.getUTCMinutes())
        t.is(0, reset.getUTCSeconds())
        t.is(0, reset.getUTCMilliseconds())
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set hours to zero after winding date back to start-of day',
    [fc.date()],
    (t, date) => {
        const reset = startOf('day', date)
        t.is(0, reset.getUTCHours())
        t.is(0, reset.getUTCMinutes())
        t.is(0, reset.getUTCSeconds())
        t.is(0, reset.getUTCMilliseconds())
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set days to zero after winding date back to start-of week',
    [fc.date()],
    (t, date) => {
        const reset = startOf('week', date)
        t.is(0, reset.getUTCDay())
        t.is(0, reset.getUTCHours())
        t.is(0, reset.getUTCMinutes())
        t.is(0, reset.getUTCSeconds())
        t.is(0, reset.getUTCMilliseconds())
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set date to zero after winding date back to start-of month',
    [fc.date()],
    (t, date) => {
        const reset = startOf('month', date)
        t.is(1, reset.getUTCDate())
        t.is(0, reset.getUTCHours())
        t.is(0, reset.getUTCMinutes())
        t.is(0, reset.getUTCSeconds())
        t.is(0, reset.getUTCMilliseconds())
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set month to zero after winding date back to start-of year',
    [fc.date()],
    (t, date) => {
        const reset = startOf('year', date)
        t.is(0, reset.getUTCMonth())
        t.is(1, reset.getUTCDate())
        t.is(0, reset.getUTCHours())
        t.is(0, reset.getUTCMinutes())
        t.is(0, reset.getUTCSeconds())
        t.is(0, reset.getUTCMilliseconds())
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

/*********************************************************************
 * Negative test cases
 ********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

testProp(
    'should throw on unsupported unit',
    [
        fc.oneof(
            fc.string().filter(not(includedIn(resetableUnitsOfTime as unknown as string[]))),
            fc.date(),
            fc.object(),
            fc.float(),
            fc.integer()
        ),
        fc.date()
    ],
    (t, unit, date) => {
        t.throws(() => startOf(unit as any, date))
    },
    {verbose: true}
)

testProp(
    'should throw when date is not a Date',
    [
        fc.constantFrom(...resetableUnitsOfTime),
        fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer())
    ],
    (t, unit, date) => {
        t.throws(() => startOf(unit, date as any))
    },
    {verbose: true}
)
