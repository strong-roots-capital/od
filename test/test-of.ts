import test from 'ava'

/**
 * Library under test
 */

import D from '../src/index'


test('one numeric-argument should create date of specified unix-time', t => {
    t.deepEqual(
        new Date(0),
        D.of(0)
    )
})

test('map-argument should create specified date', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 12, 34, 5, 60)),
        D.of({year: 2000, month: 0, date: 1, hour: 12, minute: 34, second: 5, millisecond: 60})
    )
})

test('map-argument should create specified date with unspecified fields set to 0', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)),
        D.of({year: 2000, month: 0, date: 1})
    )
})

test('map-argument should set default-date to 1', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)),
        D.of({year: 2000})
    )
})

test('one string-argument should create a UTC date of specified ISO date', t => {
    t.deepEqual(
        new Date(Date.UTC(2001, 0, 4)),
        D.of('2001-01-04')
    )
})

test('one string-argument should create a UTC date of specified ISO date-time with milliseconds', t => {
    t.deepEqual(
        new Date(Date.UTC(2001, 0, 4, 10, 20, 30, 400)),
        D.of('2001-01-04T10:20:30.400Z')
    )
})

test('one string-argument should create a UTC date of specified ISO date-time without milliseconds', t => {
    t.deepEqual(
        new Date(Date.UTC(2001, 0, 4, 10, 20, 30)),
        D.of('2001-01-04T10:20:30')
    )
})

test('should throw when given invalid date-descriptor', t => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t.throws(() => D.of({second: 4} as any))
})

test('should throw when given something other than number, string, or date-descriptor', t => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t.throws(() => D.of([1] as any))
})

test('should throw when given date-string in non-UTC and non-ISO format', t => {
    t.throws(() => D.of('horse'))
})
