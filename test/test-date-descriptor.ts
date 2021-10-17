import test from 'ava'

/**
 * Library under test
 */

import { isDateDescriptor, dateStringAsDate } from '../src/date-descriptor'

test('should not consider non-objects to be dates', (t) => {
  t.false(isDateDescriptor(1))
})

test('should consider date-descriptor with year to be valid', (t) => {
  t.true(
    isDateDescriptor({
      year: 2000,
    }),
  )
})

test('should throw on non-date-string input', (t) => {
  t.throws(() => dateStringAsDate('horse'))
})
