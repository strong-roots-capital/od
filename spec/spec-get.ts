import { testProp, fc } from 'ava-fast-check'
import { not, includedIn } from './util'
import { unitsOfTime, accessibleUnitsOfTime } from '../src/unit-of-time'

/**
 * Library under test
 */

import { get } from '../src/get'

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
        fc.date()
    ],
    (t, unit, date) => {
        t.throws(() => get(unit as any, date))
    },
    {verbose: true}
)

testProp(
    'should throw when date is not a Date',
    [
        fc.constantFrom(...accessibleUnitsOfTime),
        fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer())
    ],
    (t, unit, date) => {
        t.throws(() => get(unit, date as any))
    },
    {verbose: true}
)
