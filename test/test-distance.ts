import test from 'ava'
import { add } from '../src/add'

/**
 * Library under test
 */

import { distance } from '../src/distance'


const start = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0))


test('should find distance in years', t => {
    const expected = 7
    const end = add('year', expected, start)
    t.is(
        expected,
        distance('year', start, end)
    )
})

test('should find distance in months', t => {
    const expected = 14
    const end = add('month', expected, start)
    t.is(
        expected,
        distance('month', start, end)
    )
})

test('should find distance in weeks', t => {
    const expected = 7
    const end = add('week', expected, start)
    t.is(
        expected,
        distance('week', start, end)
    )
})

test('should find distance in days', t => {
    const expected = 9
    const end = add('day', expected, start)
    t.is(
        expected,
        distance('day', start, end)
    )
})

test('should find distance in hours', t => {
    const expected = 36
    const end = add('hour', expected, start)
    t.is(
        expected,
        distance('hour', start, end)
    )
})

test('should find distance in minutes', t => {
    const expected = 99
    const end = add('minute', expected, start)
    t.is(
        expected,
        distance('minute', start, end)
    )
})

test('should find distance in seconds', t => {
    const expected = 180
    const end = add('second', expected, start)
    t.is(
        expected,
        distance('second', start, end)
    )
})

test('should find distance in milliseconds', t => {
    const expected = 3600
    const end = add('millisecond', expected, start)
    t.is(
        expected,
        distance('millisecond', start, end)
    )
})

test('should throw on unexpected unit', t => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t.throws(() => distance('nanosecond' as any)(new Date(), new Date()))
})
