import test from 'node:test'
import assert from 'node:assert/strict'

import fc from 'fast-check'

/**
 * Library under test
 */

import { parseNumber } from '../../src/parse'

/*********************************************************************
 * Positive test cases
 ********************************************************************/

test('should act as identity when given a number', () => {
  fc.assert(
    fc.property(fc.oneof(fc.float(), fc.integer()), (value) => {
      assert.equal(value, parseNumber(value))
    }),
    {
      verbose: true,
      numRuns: 1000,
    },
  )
})

/*********************************************************************
 * Negative test cases
 ********************************************************************/

test('should throw error when given a non-number', () => {
  fc.assert(
    fc.property(fc.oneof(fc.string(), fc.object(), fc.boolean()), (value) => {
      assert.throws(() => parseNumber(value))
    }),
  )
})
