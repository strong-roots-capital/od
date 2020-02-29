import test from 'ava'

/**
 * Library under test
 */

import { get } from '../src/get'


const start = new Date(Date.UTC(2000, 1, 2, 3, 4, 5, 6))


test('should get number of milliseconds since unix epoch', t => {
    t.is(
        start.valueOf(),
        get('unix', start)
    )
})

test('should get year from given date', t => {
    t.is(
        2000,
        get('year', start)
    )
})

test('should get month from given date', t => {
    t.is(
        1,
        get('month', start)
    )
})

test('should get day from given date', t => {
    t.is(
        start.getUTCDay(),
        get('day', start)
    )
})

test('should get date of month from given date', t => {
    t.is(
        2,
        get('date', start)
    )
})

test('should get hour from given date', t => {
    t.is(
        3,
        get('hour', start)
    )
})

test('should get minute from given date', t => {
    t.is(
        4,
        get('minute', start)
    )
})

test('should get second from given date', t => {
    t.is(
        5,
        get('second', start)
    )
})

test('should get millisecond from given date', t => {
    t.is(
        6,
        get('millisecond', start)
    )
})

test('should support function currying', t => {
    const getHours = get('hour')
    t.is(
        3,
        getHours(start)
    )
})

test('should throw on unexpected unit', t => {
    t.throws(() => get('nanosecond')(new Date()))
})
