import test from 'node:test'
import assert from 'node:assert/strict'

/**
 * Library under test
 */

import D from '../../src/index'

const start = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0))

test('should support currying `add`', () => {
  const addMonth = D.add('month')
  assert.deepEqual(new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0)), addMonth(1, start))
})

test('should support currying `subtract`', () => {
  const subtractMonth = D.subtract('month')
  assert.deepEqual(new Date(Date.UTC(1999, 11, 1, 0, 0, 0, 0)), subtractMonth(1, start))
})

test('should support currying `get`', () => {
  const getYear = D.get('year')
  assert.deepEqual(2000, getYear(start))
})
