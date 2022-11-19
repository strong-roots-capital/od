import test from 'node:test'
import assert from 'node:assert/strict'

/**
 * Library under test
 */

import { subtract } from '../../src/subtract'

const start = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0))

test('should subtract 1 millisecond to starting date', () => {
  assert.deepEqual(
    start,
    subtract('millisecond', 1, new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 1))),
  )
})

test('should subtract 1 second to starting date', () => {
  assert.deepEqual(
    start,
    subtract('second', 1, new Date(Date.UTC(2000, 0, 1, 0, 0, 1, 0))),
  )
})

test('should subtract 1 minute to starting date', () => {
  assert.deepEqual(
    start,
    subtract('minute', 1, new Date(Date.UTC(2000, 0, 1, 0, 1, 0, 0))),
  )
})

test('should subtract 1 hour to starting date', () => {
  assert.deepEqual(
    start,
    subtract('hour', 1, new Date(Date.UTC(2000, 0, 1, 1, 0, 0, 0))),
  )
})

test('should subtract 1 day to starting date', () => {
  assert.deepEqual(
    start,
    subtract('day', 1, new Date(Date.UTC(2000, 0, 2, 0, 0, 0, 0))),
  )
})

test('should subtract 1 week to starting date', () => {
  assert.deepEqual(
    start,
    subtract('week', 1, new Date(Date.UTC(2000, 0, 8, 0, 0, 0, 0))),
  )
})

test('should subtract 1 month to starting date', () => {
  assert.deepEqual(
    start,
    subtract('month', 1, new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0))),
  )
})

test('should subtract 1 year to starting date', () => {
  assert.deepEqual(
    start,
    subtract('year', 1, new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))),
  )
})

test('should support strict function currying', () => {
  const subtractYear = subtract('year')
  assert.deepEqual(start, subtractYear(1, new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))))
})

test('should support partial application of two arguments', () => {
  const subtractOneYear = subtract('year', 1)
  assert.deepEqual(start, subtractOneYear(new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))))
})
