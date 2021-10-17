import test from 'ava'

/**
 * Library under test
 */

import D from '../src/index'

const start = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0))

test('should support currying `add`', (t) => {
  const addMonth = D.add('month')
  t.deepEqual(new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0)), addMonth(1, start))
})

test('should support currying `subtract`', (t) => {
  const subtractMonth = D.subtract('month')
  t.deepEqual(new Date(Date.UTC(1999, 11, 1, 0, 0, 0, 0)), subtractMonth(1, start))
})

test('should support currying `get`', (t) => {
  const getYear = D.get('year')
  t.deepEqual(2000, getYear(start))
})
