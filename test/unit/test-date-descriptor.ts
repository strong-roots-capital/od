import test from 'node:test'
import assert from 'node:assert/strict'

/**
 * Library under test
 */

import { isDateDescriptor, dateStringAsDate } from '../../src/date-descriptor'

test('should not consider non-objects to be dates', () => {
  assert.ok(!isDateDescriptor(1))
})

test('should consider date-descriptor with year to be valid', () => {
  assert(
    isDateDescriptor({
      year: 2000,
    }),
  )
})

test('should throw on non-date-string input', () => {
  assert.throws(() => dateStringAsDate('horse'))
})
