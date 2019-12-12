import test from 'ava'

/**
 * Library under test
 */

import {
    parseNumber,
    parseDate,
    parseUnitOfTime,
    parseAccessibleUnitOfTime,
    parseResetableUnitOfTime
} from '../src/parse'


test('parse-number should throw when given non-number', t => {
    t.throws(() => parseNumber('horse'))
})

test('parse-date should throw when given non-date', t => {
    t.throws(() => parseDate('horse'))
})

test('parse-date should throw when given invalid date', t => {
    t.throws(() => parseDate(new Date('invalid')))
})

test('parse-unit-of-time should throw when given non-string', t => {
    t.throws(() => parseUnitOfTime(1))
})

test('parse-unit-of-time should throw when given undefined unit of time', t => {
    t.throws(() => parseUnitOfTime('nanosecond'))
})

test('parse-accessible-unit-of-time should throw when given non-string', t => {
    t.throws(() => parseAccessibleUnitOfTime(1))
})

test('parse-accessible-unit-of-time should throw when given undefined unit of time', t => {
    t.throws(() => parseAccessibleUnitOfTime('nanosecond'))
})

test('parse-resetable-unit-of-time should throw when given non-string', t => {
    t.throws(() => parseResetableUnitOfTime(1))
})

test('parse-resetable-unit-of-time should throw when given undefined unit of time', t => {
    t.throws(() => parseResetableUnitOfTime('nanosecond'))
})
