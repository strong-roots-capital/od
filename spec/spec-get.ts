import { testProp, fc } from 'ava-fast-check'
import { not, includedIn } from './util'
import { unitsOfTime, UnitOfTime } from '../src/unit-of-time'

/**
 * Library under test
 */

import { get } from '../src/get'

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
        fc.date()
    ],
    (unit: any, date: Date) => {
        try {
            get(unit, date)
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
        fc.constantFrom(...unitsOfTime),
        fc.oneof<any>(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer())
    ],
    (unit: UnitOfTime, date: any) => {
        try {
            get(unit, date)
            return false
        } catch (error) {
            return true
        }
    },
    {verbose: true}
)
