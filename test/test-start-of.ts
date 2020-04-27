import test from 'ava'

/**
 * Library under test
 */

import { startOf } from '../src/start-of'


test('should calculate date representing start of second', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 12, 34, 5, 0)),
        startOf('second', new Date(Date.UTC(2000, 0, 1, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of minute', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 12, 34, 0, 0)),
        startOf('minute', new Date(Date.UTC(2000, 0, 1, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of hour', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 12, 0, 0, 0)),
        startOf('hour', new Date(Date.UTC(2000, 0, 1, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of day', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 2, 0, 0, 0, 0)),
        startOf('day', new Date(Date.UTC(2000, 1, 2, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of month', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 1, 0, 0, 0, 0)),
        startOf('month', new Date(Date.UTC(2000, 1, 2, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of year', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)),
        startOf('year', new Date(Date.UTC(2000, 2, 2, 12, 34, 5, 60)))
    )
})

// Feb 6 is Sunday (start-of-week) for year 2000
test('should calculate date representing start of week (Sunday) when date is Sunday', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 6, 0, 0, 0, 0)),
        startOf('week', new Date(Date.UTC(2000, 1, 6, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of week (Sunday) when date is Monday', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 6, 0, 0, 0, 0)),
        startOf('week', new Date(Date.UTC(2000, 1, 7, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of week (Sunday) when date is Tuesday', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 6, 0, 0, 0, 0)),
        startOf('week', new Date(Date.UTC(2000, 1, 8, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of week (Sunday) when date is Wednesday', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 6, 0, 0, 0, 0)),
        startOf('week', new Date(Date.UTC(2000, 1, 9, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of week (Sunday) when date is Thursday', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 6, 0, 0, 0, 0)),
        startOf('week', new Date(Date.UTC(2000, 1, 10, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of week (Sunday) when date is Friday', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 6, 0, 0, 0, 0)),
        startOf('week', new Date(Date.UTC(2000, 1, 11, 12, 34, 5, 60)))
    )
})

test('should calculate date representing start of week (Sunday) when date is Saturday', t => {
    t.deepEqual(
        new Date(Date.UTC(2000, 1, 6, 0, 0, 0, 0)),
        startOf('week', new Date(Date.UTC(2000, 1, 12, 12, 34, 5, 60)))
    )
})

test('should throw on unexpected unit', t => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t.throws(() => startOf('nanosecond' as any)(new Date(Date.UTC(2000, 1, 12, 12, 34, 5, 60))))
})
