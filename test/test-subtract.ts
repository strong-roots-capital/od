import test from 'ava'

/**
 * Library under test
 */

import { subtract } from '../src/subtract'

const start = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0))

test('should subtract 1 millisecond to starting date', (t) => {
  t.deepEqual(
    start,
    subtract('millisecond', 1, new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 1))),
  )
})

test('should subtract 1 second to starting date', (t) => {
  t.deepEqual(start, subtract('second', 1, new Date(Date.UTC(2000, 0, 1, 0, 0, 1, 0))))
})

test('should subtract 1 minute to starting date', (t) => {
  t.deepEqual(start, subtract('minute', 1, new Date(Date.UTC(2000, 0, 1, 0, 1, 0, 0))))
})

test('should subtract 1 hour to starting date', (t) => {
  t.deepEqual(start, subtract('hour', 1, new Date(Date.UTC(2000, 0, 1, 1, 0, 0, 0))))
})

test('should subtract 1 day to starting date', (t) => {
  t.deepEqual(start, subtract('day', 1, new Date(Date.UTC(2000, 0, 2, 0, 0, 0, 0))))
})

test('should subtract 1 week to starting date', (t) => {
  t.deepEqual(start, subtract('week', 1, new Date(Date.UTC(2000, 0, 8, 0, 0, 0, 0))))
})

test('should subtract 1 month to starting date', (t) => {
  t.deepEqual(start, subtract('month', 1, new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0))))
})

test('should subtract 1 year to starting date', (t) => {
  t.deepEqual(start, subtract('year', 1, new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))))
})

test('should support strict function currying', (t) => {
  const subtractYear = subtract('year')
  t.deepEqual(start, subtractYear(1, new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))))
})

test('should support partial application of two arguments', (t) => {
  const subtractOneYear = subtract('year', 1)
  t.deepEqual(start, subtractOneYear(new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))))
})
