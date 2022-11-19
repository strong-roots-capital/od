import test from 'node:test'
import assert from 'node:assert/strict'

/**
 * Library under test
 */

import { get } from '../../src/get'

const start = new Date(Date.UTC(2000, 1, 2, 3, 4, 5, 6))

test('should get number of milliseconds since unix epoch', () => {
  assert.equal(start.valueOf(), get('unix', start))
})

test('should get year from given date', () => {
  assert.equal(2000, get('year', start))
})

test('should get month from given date', () => {
  assert.equal(1, get('month', start))
})

test('should get day from given date', () => {
  assert.equal(start.getUTCDay(), get('day', start))
})

test('should get date of month from given date', () => {
  assert.equal(2, get('date', start))
})

test('should get hour from given date', () => {
  assert.equal(3, get('hour', start))
})

test('should get minute from given date', () => {
  assert.equal(4, get('minute', start))
})

test('should get second from given date', () => {
  assert.equal(5, get('second', start))
})

test('should get millisecond from given date', () => {
  assert.equal(6, get('millisecond', start))
})

test('should support function currying', () => {
  const getHours = get('hour')
  assert.equal(3, getHours(start))
})

test('should throw on unexpected unit', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assert.throws(() => get('nanosecond' as any)(new Date()))
})
