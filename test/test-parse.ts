import test from 'ava'

/**
 * Library under test
 */

import { parseNumber, parseDate } from '../src/parse'

test('parse-number should throw when given non-number', (t) => {
  t.throws(() => parseNumber('horse'))
})

test('parse-date should throw when given non-date', (t) => {
  t.throws(() => parseDate('horse'))
})

test('parse-date should throw when given invalid date', (t) => {
  t.throws(() => parseDate(new Date('invalid')))
})
