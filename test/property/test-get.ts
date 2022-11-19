import test from 'node:test'
import assert from 'node:assert/strict'

import fc from 'fast-check'

import { not, includedIn } from './util'
import { unitsOfTime, accessibleUnitsOfTime } from '../../src/unit-of-time'

/**
 * Library under test
 */

import { get } from '../../src/get'

/*********************************************************************
 * Negative test cases
 ********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

test('should throw on unsupported unit', () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.string().filter(not(includedIn(unitsOfTime as unknown as string[]))),
        fc.date(),
        fc.object(),
        fc.float(),
        fc.integer(),
      ),
      fc.date(),
      (unit, date) => {
        assert.throws(() => get(unit as any, date))
      },
    ),
    { verbose: true },
  )
})

test('should throw when date is not a Date', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...accessibleUnitsOfTime),
      fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
      (unit, date) => {
        assert.throws(() => get(unit, date as any))
      },
    ),
    { verbose: true },
  )
})
