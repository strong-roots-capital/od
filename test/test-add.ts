import test from 'ava'

/**
 * Library under test
 */

import { add } from '../src/add'

function isInteger(value: number): boolean {
    return Math.trunc(value) === value
}

const start = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0))

test('should add 1 millisecond to starting date', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 1)),
        add('millisecond', 1, start)
    )
})

test('should add 1 second to starting date', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 0, 0, 1, 0)),
        add('second', 1, start)
    )
})

test('should add 1 minute to starting date', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 0, 1, 0, 0)),
        add('minute', 1, start)
    )
})

test('should add 1 hour to starting date', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 1, 0, 0, 0)),
        add('hour', 1, start)
    )
})

test('should add 1 day to starting date', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 2, 0, 0, 0, 0)),
        add('day', 1, start)
    )
})

test('should add 1 week to starting date', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 8, 0, 0, 0, 0)),
        add('week', 1, start)
    )
})

test('should add 1 month to starting date', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0)),
        add('month', 1, start)
    )
})

test('should add 1 year to starting date', t => {
    t.deepEqual(
        new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0)),
        add('year', 1, start)
    )
})

test('should support strict function currying', t => {
    const addYear = add('year')
    t.deepEqual(
        new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0)),
        addYear(1, start)
    )
})

test('should support partial application of two arguments', t => {
    const addOneYear = add('year', 1)
    t.deepEqual(
        new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0)),
        addOneYear(start)
    )
})

test('should throw on unexpected unit', t => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t.throws(() => add('nanosecond' as any)(1, new Date()))
})

test('should not support adding fractions of a millisecond', t => {
    const date = new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))
    const milliseconds = 1.9
    const expectedIncrement = Math.trunc(milliseconds)
    t.true(isInteger(expectedIncrement))
    t.deepEqual(
        add('millisecond', expectedIncrement, date),
        add('millisecond', milliseconds, date)
    )
})

test('should support adding fractions of a second', t => {
    const date = new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))
    const seconds = 1.5
    const milliseconds = seconds * 1000
    t.true(isInteger(milliseconds))
    t.deepEqual(
        add('millisecond', milliseconds, date),
        add('second', seconds, date)
    )
})

test('should support adding fractions of a minute', t => {
    const date = new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))
    const minutes = 1.5
    const seconds = minutes * 60
    t.true(isInteger(seconds))
    t.deepEqual(
        add('second', seconds, date),
        add('minute', minutes, date)
    )
})

test('should support adding fractions of an hour', t => {
    const date = new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))
    const hours = 1.2
    const minutes = hours * 60
    t.true(isInteger(minutes))
    t.deepEqual(
        add('minute', minutes, date),
        add('hour', hours, date)
    )
})

test('should support adding fractions of a day', t => {
    const date = new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))
    const days = 1.5
    const hours = days * 24
    t.true(isInteger(hours))
    t.deepEqual(
        add('hour', hours, date),
        add('day', days, date)
    )
})

test('should support adding fractions of a week', t => {
    const date = new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))
    const weeks = 10 / 7
    const days = weeks * 7
    t.true(isInteger(days))
    t.deepEqual(
        add('day', days, date),
        add('week', weeks, date)
    )
})
