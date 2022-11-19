import test from 'node:test'
import assert from 'node:assert/strict'

import { add } from '../../src/add'

/**
 * Library under test
 */

import { distance } from '../../src/distance'

const start = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0))

test('should find distance in years', () => {
  const expected = 7
  const end = add('year', expected, start)
  assert.equal(expected, distance('year', start, end))
})

test('should find distance in months', () => {
  const expected = 14
  const end = add('month', expected, start)
  assert.equal(expected, distance('month', start, end))
})

test('should find distance in weeks', () => {
  const expected = 7
  const end = add('week', expected, start)
  assert.equal(expected, distance('week', start, end))
})

test('should find distance in days', () => {
  const expected = 9
  const end = add('day', expected, start)
  assert.equal(expected, distance('day', start, end))
})

test('should find distance in hours', () => {
  const expected = 36
  const end = add('hour', expected, start)
  assert.equal(expected, distance('hour', start, end))
})

test('should find distance in minutes', () => {
  const expected = 99
  const end = add('minute', expected, start)
  assert.equal(expected, distance('minute', start, end))
})

test('should find distance in seconds', () => {
  const expected = 180
  const end = add('second', expected, start)
  assert.equal(expected, distance('second', start, end))
})

test('should find distance in milliseconds', () => {
  const expected = 3600
  const end = add('millisecond', expected, start)
  assert.equal(expected, distance('millisecond', start, end))
})

test('should throw on unexpected unit', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assert.throws(() => distance('nanosecond' as any)(new Date(), new Date()))
})
