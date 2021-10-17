import { testProp, fc } from 'ava-fast-check'

/**
 * Library under test
 */

import { parseNumber } from '../src/parse'

/*********************************************************************
 * Positive test cases
 ********************************************************************/

testProp(
  'should act as identity when given a number',
  [fc.oneof(fc.float(), fc.integer())],
  (t, value) => {
    t.is(value, parseNumber(value))
  },
  {
    verbose: true,
    numRuns: 1000,
  },
)

/*********************************************************************
 * Negative test cases
 ********************************************************************/

testProp(
  'should throw error when given a non-number',
  [fc.oneof(fc.string(), fc.object(), fc.boolean())],
  (t, value) => {
    t.throws(() => parseNumber(value))
  },
)
