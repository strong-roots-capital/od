import { testProp, fc } from 'ava-fast-check'
import { not, includedIn } from './util'
import { resetableUnitsOfTime, ResetableUnitOfTime } from '../src/unit-of-time'

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
    (date) => 0 === startOf('second', date).getUTCMilliseconds(),
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set seconds to zero after winding date back to start-of minute',
    [fc.date()],
    (date) => {
        const reset = startOf('minute', date)
        return 0 === reset.getUTCSeconds()
            && 0 === reset.getUTCMilliseconds()
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set minutes to zero after winding date back to start-of hour',
    [fc.date()],
    (date) => {
        const reset = startOf('hour', date)
        return 0 === reset.getUTCMinutes()
            && 0 === reset.getUTCSeconds()
            && 0 === reset.getUTCMilliseconds()
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set hours to zero after winding date back to start-of day',
    [fc.date()],
    (date) => {
        const reset = startOf('day', date)
        return 0 === reset.getUTCHours()
            && 0 === reset.getUTCMinutes()
            && 0 === reset.getUTCSeconds()
            && 0 === reset.getUTCMilliseconds()
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set days to zero after winding date back to start-of week',
    [fc.date()],
    (date) => {
        const reset = startOf('week', date)
        return 0 === reset.getUTCDay()
            && 0 === reset.getUTCHours()
            && 0 === reset.getUTCMinutes()
            && 0 === reset.getUTCSeconds()
            && 0 === reset.getUTCMilliseconds()
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set date to zero after winding date back to start-of month',
    [fc.date()],
    (date) => {
        const reset = startOf('month', date)
        return 1 === reset.getUTCDate()
            && 0 === reset.getUTCHours()
            && 0 === reset.getUTCMinutes()
            && 0 === reset.getUTCSeconds()
            && 0 === reset.getUTCMilliseconds()
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    'should set month to zero after winding date back to start-of year',
    [fc.date()],
    (date) => {
        const reset = startOf('year', date)
        return 0 === reset.getUTCMonth()
            && 1 === reset.getUTCDate()
            && 0 === reset.getUTCHours()
            && 0 === reset.getUTCMinutes()
            && 0 === reset.getUTCSeconds()
            && 0 === reset.getUTCMilliseconds()
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
        fc.oneof<any>(
            fc.string().filter(not(includedIn(resetableUnitsOfTime as unknown as string[]))),
            fc.date(),
            fc.object(),
            fc.float(),
            fc.integer()
        ),
        fc.date()
    ],
    (unit: any, date: Date) => {
        try {
            startOf(unit, date)
            return false
        } catch (error) {
            return true
        }
    },
    {verbose: true}
)

testProp(
    'should throw when date is not a Date',
    [
        fc.constantFrom(...resetableUnitsOfTime),
        fc.oneof<any>(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer())
    ],
    (unit: ResetableUnitOfTime, date: any) => {
        try {
            startOf(unit, date)
            return false
        } catch (error) {
            return true
        }
    },
    {verbose: true}
)
