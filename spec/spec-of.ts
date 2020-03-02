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
    (date) => {
        return isDatestringInFormatISO(date.toISOString())
    },
    {
        verbose: true,
        numRuns: 1000
    }
)

testProp(
    `should treat all generated ISO strings without milliseconds strings as valid`,
    [fc.date()],
    (date) => {
        return isDatestringInFormatISOWithoutMilliseconds(
            date.toISOString().slice(0, -5)
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
    (date) => {
        return isDatestringInFormatISOWithoutTime(
            date.toISOString().slice(0, -14)
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
    (date) => {
        const descriptor = asDateDescriptor(date)
        return date.getTime() === of(descriptor).getTime()
    },
    {
        verbose: true,
        numRuns: 2500
    }
)

testProp(
    `should reconstruct any date from its corresponding ISO string`,
    [fc.date()],
    (date) => {
        return date.getTime() === of(date.toISOString()).getTime()
    },
    {
        verbose: true,
        numRuns: 2500
    }
)

testProp(
    `should reconstruct any date from its corresponding milliseconds-since-epoch`,
    [fc.date()],
    (date) => {
        return date.getTime() === of(date.getTime()).getTime()
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
        fc.oneof<any>(
            fc.boolean(),
            fc.date(),
            fc.emailAddress(),
            fc.object().filter(not(isDateDescriptor))
        )
    ],
    (input) => {
        try {
            of(input)
            return false
        } catch (error) {
            return true
        }
    },
    {
        verbose: true,
        numRuns: 1000
    }
)
