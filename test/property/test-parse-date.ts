import test from 'node:test'
import assert from 'node:assert/strict'

import fc from 'fast-check'

/**
 * Library under test
 */

import { parseDate } from '../../src/parse'

/*********************************************************************
 * Positive test cases
 ********************************************************************/

test('should act as identity when given a Date', () => {
  fc.assert(
    fc.property(fc.date(), (value) => {
      assert.equal(value.toISOString(), parseDate(value).toISOString())
    }),
    {
      numRuns: 1000,
    },
  )
})

/*********************************************************************
 * Negative test cases
 ********************************************************************/

test('should throw error when given a non-Date', () => {
  fc.assert(
    fc.property(
      fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float()),
      (value) => {
        assert.throws(() => parseDate(value))
      },
    ),
  )
})
