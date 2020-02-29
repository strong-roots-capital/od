import test from 'ava'

/**
 * Library under test
 */

import { add } from '../src/add'


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
    t.throws(() => add('nanosecond')(1, new Date()))
})
