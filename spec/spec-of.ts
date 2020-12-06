import { testProp, fc } from 'ava-fast-check'
import { not, asDateDescriptor } from './util'
import { isDateDescriptor } from '../src/date-descriptor'

/**
 * Library under test
 */

import {
    of,
    isDatestringInFormatISO,
    isDatestringInFormatISOWithoutMilliseconds,
    isDatestringInFormatISOWithoutTime
} from '../src/of'

/*********************************************************************
 * Positive test cases
 ********************************************************************/

testProp(
    `should treat all generated ISO strings as valid`,
    [fc.date()],
    (t, date) => {
        t.true(isDatestringInFormatISO(date.toISOString()))
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    `should treat all generated ISO strings without milliseconds strings as valid`,
    [fc.date()],
    (t, date) => {
        t.true(
            isDatestringInFormatISOWithoutMilliseconds(
                date.toISOString().slice(0, -5)
            )
        )
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    `should treat all generated ISO strings without time strings as valid`,
    [fc.date()],
    (t, date) => {
        t.true(
            isDatestringInFormatISOWithoutTime(
                date.toISOString().slice(0, -14)
            )
        )
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    `should reconstruct any date from its corresponding date-descriptor`,
    [fc.date()],
    (t, date) => {
        const descriptor = asDateDescriptor(date)
        t.is(date.toISOString(), of(descriptor).toISOString())
    },
    {
        verbose: true,
        numRuns: 2500
    }
)

testProp(
    `should reconstruct any date from its corresponding ISO string`,
    [fc.date()],
    (t, date) => {
        t.is(date.toISOString(), of(date.toISOString()).toISOString())
    },
    {
        verbose: true,
        numRuns: 2500
    }
)

testProp(
    `should reconstruct any date from its corresponding milliseconds-since-epoch`,
    [fc.date()],
    (t, date) => {
        t.is(date.toISOString(), of(date.getTime()).toISOString())
    },
    {
        verbose: true,
        numRuns: 2500
    }
)

/*********************************************************************
 * Negative test cases
 ********************************************************************/

testProp(
    `should throw error when given non-number, non-string, non-descriptor`,
    [
        fc.oneof(
            fc.boolean(),
            fc.date(),
            fc.emailAddress(),
            fc.object().filter(not(isDateDescriptor))
        )
    ],
    (t, input) => {
        t.throws(() => of(input as any))
    },
    {
        verbose: true,
        numRuns: 1000
    }
)
