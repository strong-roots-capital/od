import { testProp, fc } from 'ava-fast-check'

/**
 * Library under test
 */

import { parseDate } from '../src/parse'

/*********************************************************************
 * Positive test cases
 ********************************************************************/

testProp(
    'should act as identity when given a Date',
    [
        fc.date()
    ],
    (t, value) => {
        t.is(parseDate(value).getTime(), value.getTime())
    },
    {
        numRuns: 1000
    }
)

/*********************************************************************
 * Negative test cases
 ********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

testProp(
    'should throw error when given a non-Date',
    [
        fc.oneof<any>(fc.string(), fc.object(), fc.boolean(), fc.float())
    ],
    (t, value) => {
        t.throws(() => parseDate(value))
    }
)
