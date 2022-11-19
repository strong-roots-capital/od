import test from 'node:test'
import assert from 'node:assert/strict'

/**
 * Library under test
 */

import { parseNumber, parseDate } from '../../src/parse'

test('parse-number should throw when given non-number', () => {
  assert.throws(() => parseNumber('horse'))
})

test('parse-date should throw when given non-date', () => {
  assert.throws(() => parseDate('horse'))
})

test('parse-date should throw when given invalid date', () => {
  assert.throws(() => parseDate(new Date('invalid')))
})
