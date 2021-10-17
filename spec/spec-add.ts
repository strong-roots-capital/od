import { ExecutionContext } from 'ava'
import { testProp, fc } from 'ava-fast-check'
import { not, includedIn } from './util'
import { get } from '../src/get'
import { unitsOfTime, UnitOfTime, millisecondsPer } from '../src/unit-of-time'
import { DATE_MIN, DATE_MAX_VALUE } from './spec'

/**
 * Library under test
 */

import { add } from '../src/add'

function assert(
  unit: UnitOfTime,
): (t: ExecutionContext, amount: number, date: Date) => void {
  return function assertForUnitOfTime(t, amount, date) {
    const expected = Math.trunc(date.getTime() + amount * millisecondsPer[unit])

    if (Math.abs(expected) > DATE_MAX_VALUE) {
      /* test is invalid -- exceeds range of valid Date */
      return t.pass()
    }

    const received = add(unit, amount, date)
    t.is(new Date(expected).toISOString(), received.toISOString())
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

testProp(
  'should add any number of milliseconds to a given date',
  [fc.oneof(fc.float(), fc.integer()), fc.date()],
  assert('millisecond'),
  { verbose: true },
)

testProp(
  'should add any number of seconds to a given date',
  [fc.oneof(fc.float(), fc.integer()), fc.date()],
  assert('second'),
  { verbose: true },
)

testProp(
  'should add any number of minutes to a given date',
  [fc.oneof(fc.float(), fc.integer()), fc.date()],
  assert('minute'),
  { verbose: true },
)

testProp(
  'should add any number of hours to a given date',
  [fc.oneof(fc.float(), fc.integer()), fc.date()],
  assert('hour'),
  { verbose: true },
)

testProp(
  'should add any number of days to a given date',
  [fc.oneof(fc.float(), fc.integer()), fc.date()],
  assert('day'),
  { verbose: true },
)

testProp(
  'should add any number of weeks to a given date',
  [fc.oneof(fc.float(), fc.integer()), fc.date()],
  assert('week'),
  { verbose: true },
)

testProp(
  'should add any number of months to a given date',
  [
    fc
      .tuple(fc.oneof(fc.float(), fc.integer()), fc.date())
      .filter(([monthsToAdd, d]) =>
        isValidDate(new Date(get('year', d), get('month', d) + monthsToAdd, 1)),
      ),
  ],
  (t, [amount, date]) => {
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
    t.deepEqual(expected, received)
  },
  {
    verbose: true,
    numRuns: 1000,
    examples: [[[1, DATE_MIN] as [number, Date]]],
  },
)

testProp(
  'should add any number of years to a given date',
  [
    fc
      .tuple(fc.oneof(fc.float(), fc.integer()), fc.date())
      .filter(([yearsToAdd, d]) =>
        isValidDate(new Date(get('year', d) + yearsToAdd, 0, 1)),
      ),
  ],
  (t, [amount, date]) => {
    const expected = new Date(date)
    expected.setUTCDate(1)
    expected.setUTCFullYear(date.getUTCFullYear() + amount)
    expected.setUTCDate(Math.min(numberOfDaysInMonth(expected), date.getUTCDate()))

    const received = add('year', amount, date)
    t.deepEqual(expected, received)
  },
  {
    verbose: true,
    numRuns: 10000,
  },
)

/*********************************************************************
 * Negative test cases
 ********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

testProp(
  'should throw on unsupported unit',
  [
    fc.oneof(
      fc.string().filter(not(includedIn(unitsOfTime as unknown as string[]))),
      fc.date(),
      fc.object(),
      fc.float(),
      fc.integer(),
    ),
    fc.float(),
    fc.date(),
  ],
  (t, unit, amount, date) => {
    t.throws(() => add(unit as any, amount, date))
  },
)

testProp(
  'should throw when amount is not a number',
  [
    fc.constantFrom(...unitsOfTime),
    fc.oneof(fc.string(), fc.date(), fc.object(), fc.boolean()),
    fc.date(),
  ],
  (t, unit, amount, date) => {
    t.throws(() => add(unit, amount as any, date))
  },
)

testProp(
  'should throw when date is not a Date',
  [
    fc.constantFrom(...unitsOfTime),
    fc.oneof(fc.float(), fc.integer()),
    fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
  ],
  (t, unit, amount, date) => {
    t.throws(() => add(unit, amount, date as any))
  },
)
