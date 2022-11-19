import test from 'node:test'
import assert from 'node:assert/strict'

import fc from 'fast-check'

import { not, includedIn } from './util'
import { get } from '../../src/get'
import { unitsOfTime, UnitOfTime, millisecondsPer } from '../../src/unit-of-time'
import { DATE_MIN, DATE_MAX_VALUE } from './spec'

/**
 * Library under test
 */

import { add } from '../../src/add'

function canAddUnits(unit: UnitOfTime): (amount: number, date: Date) => void {
  return function assertForUnitOfTime(amount, date) {
    const expected = Math.trunc(date.getTime() + amount * millisecondsPer[unit])

    /* Ensure test does not exceed range of valid Date */
    fc.pre(Math.abs(expected) < DATE_MAX_VALUE)

    const received = add(unit, amount, date)
    assert(new Date(expected).toISOString(), received.toISOString())
  }
}

function numberOfDaysInMonth(date: Date): number {
  const daysInMonth = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    0,
  ).getUTCDate()
  if (Number.isNaN(daysInMonth)) {
    return 31
  }
  return daysInMonth
}

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime())
}

/*********************************************************************
 * Positive test cases
 ********************************************************************/

test('should add any number of milliseconds to a given date', () => {
  fc.assert(
    fc.property(
      fc.oneof(fc.float({ noNaN: true }), fc.integer()),
      fc.date(),
      canAddUnits('millisecond'),
    ),
    { verbose: true },
  )
})

test('should add any number of seconds to a given date', () => {
  fc.assert(
    fc.property(
      fc.oneof(fc.float({ noNaN: true }), fc.integer()),
      fc.date(),
      canAddUnits('second'),
    ),
    { verbose: true },
  )
})

test('should add any number of minutes to a given date', () => {
  fc.assert(
    fc.property(
      fc.oneof(fc.float({ noNaN: true }), fc.integer()),
      fc.date(),
      canAddUnits('minute'),
    ),
    { verbose: true },
  )
})

test('should add any number of hours to a given date', () => {
  fc.assert(
    fc.property(
      fc.oneof(fc.float({ noNaN: true }), fc.integer()),
      fc.date(),
      canAddUnits('hour'),
    ),
    { verbose: true },
  )
})

test('should add any number of days to a given date', () => {
  fc.assert(
    fc.property(
      fc.oneof(fc.float({ noNaN: true }), fc.integer()),
      fc.date(),
      canAddUnits('day'),
    ),
    { verbose: true },
  )
})

test('should add any number of weeks to a given date', () => {
  fc.assert(
    fc.property(
      fc.oneof(fc.float({ noNaN: true }), fc.integer()),
      fc.date(),
      canAddUnits('week'),
    ),
    { verbose: true },
  )
})

test('should add any number of months to a given date', () => {
  fc.assert(
    fc.property(
      fc
        .tuple(fc.oneof(fc.float({ noNaN: true }), fc.integer()), fc.date())
        .filter(([monthsToAdd, d]) =>
          isValidDate(new Date(get('year', d), get('month', d) + monthsToAdd, 1)),
        ),
      ([amount, date]) => {
        // NOTE: this test is essentially testing against the
        // same implementation, I'm not sure what else to do here
        // with this underflow at the beginning of the algorithm.
        // That's not to say the test is useless, it did help me
        // iron out several bugs.
        let expected = new Date(date)
        expected.setUTCDate(1)

        // When `date` is less-than one month after the
        // earliest-representable date (October 20), we can't reset the
        // date back to the beginning of the month so we instead advance
        // to the second month before winding back to the first day of the
        // month and decrement 1 from the number of months to add.
        if (Number.isNaN(expected.getTime())) {
          expected = new Date(date)
          expected.setUTCDate(28)
          // advance by the smallest month to kick us into the next
          // month, then set the date back to 1
          expected.setUTCMonth(date.getUTCMonth() + 1)
          expected.setUTCDate(1)
          if (amount !== 0) {
            expected.setUTCMonth(expected.getUTCMonth() + amount - 1)
          }
        } else {
          expected.setUTCMonth(date.getUTCMonth() + amount)
        }

        expected.setUTCDate(Math.min(numberOfDaysInMonth(expected), date.getUTCDate()))

        const received = add('month', amount, date)
        assert.deepEqual(expected, received)
      },
    ),
    {
      verbose: true,
      numRuns: 1000,
      examples: [[[1, DATE_MIN] as [number, Date]]],
    },
  )
})

test('should add any number of years to a given date', () => {
  fc.assert(
    fc.property(
      fc
        .tuple(fc.oneof(fc.float({ noNaN: true }), fc.integer()), fc.date())
        .filter(([yearsToAdd, d]) =>
          isValidDate(new Date(get('year', d) + yearsToAdd, 0, 1)),
        ),
      ([amount, date]) => {
        const expected = new Date(date)
        expected.setUTCDate(1)
        expected.setUTCFullYear(date.getUTCFullYear() + amount)
        expected.setUTCDate(Math.min(numberOfDaysInMonth(expected), date.getUTCDate()))

        const received = add('year', amount, date)
        assert.deepEqual(expected, received)
      },
    ),
    {
      verbose: true,
      numRuns: 10000,
    },
  )
})

/*********************************************************************
 * Negative test cases
 ********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

test('should throw on unsupported unit', () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.string().filter(not(includedIn(unitsOfTime as unknown as string[]))),
        fc.date(),
        fc.object(),
        fc.float(),
        fc.integer(),
      ),
      fc.float(),
      fc.date(),
      (unit, amount, date) => {
        assert.throws(() => add(unit as any, amount, date))
      },
    ),
  )
})

test('should throw when amount is not a number', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...unitsOfTime),
      fc.oneof(fc.string(), fc.date(), fc.object(), fc.boolean()),
      fc.date(),
      (unit, amount, date) => {
        assert.throws(() => add(unit, amount as any, date))
      },
    ),
  )
})

test('should throw when date is not a Date', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...unitsOfTime),
      fc.oneof(fc.float(), fc.integer()),
      fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
      (unit, amount, date) => {
        assert.throws(() => add(unit, amount, date as any))
      },
    ),
  )
})
