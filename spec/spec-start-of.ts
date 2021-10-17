import { testProp, fc } from 'ava-fast-check'
import { match } from 'ts-pattern'
import { ordDate } from 'fp-ts/Ord'
import { not, includedIn } from './util'
import { resetableUnitsOfTime } from '../src/unit-of-time'
import { get } from '../src/get'
import { add } from '../src/add'
import { DATE_MIN } from './spec'

/**
 * Library under test
 */

import { startOf } from '../src/start-of'

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime())
}

/*********************************************************************
 * Positive test cases
 ********************************************************************/

testProp(
  'should set milliseconds to zero after winding date back to start-of second',
  [fc.date()],
  (t, date) => {
    t.is(0, startOf('second', date).getUTCMilliseconds())
  },
  {
    verbose: true,
    numRuns: 1000,
  },
)

testProp(
  'should set seconds to zero after winding date back to start-of minute',
  [fc.date()],
  (t, date) => {
    const reset = startOf('minute', date)
    t.is(0, reset.getUTCSeconds())
    t.is(0, reset.getUTCMilliseconds())
  },
  {
    verbose: true,
    numRuns: 1000,
  },
)

testProp(
  'should set minutes to zero after winding date back to start-of hour',
  [fc.date()],
  (t, date) => {
    const reset = startOf('hour', date)
    t.is(0, reset.getUTCMinutes())
    t.is(0, reset.getUTCSeconds())
    t.is(0, reset.getUTCMilliseconds())
  },
  {
    verbose: true,
    numRuns: 1000,
  },
)

testProp(
  'should set hours to zero after winding date back to start-of day',
  [fc.date()],
  (t, date) => {
    const reset = startOf('day', date)
    t.is(0, reset.getUTCHours())
    t.is(0, reset.getUTCMinutes())
    t.is(0, reset.getUTCSeconds())
    t.is(0, reset.getUTCMilliseconds())
  },
  {
    verbose: true,
    numRuns: 1000,
  },
)

testProp(
  'should set days to zero after winding date back to start-of week',
  [fc.date()],
  (t, date) => {
    const reset = startOf('week', date)
    const oneWeekAfterEarliestRepresentableDate = add('week', 1, DATE_MIN)
    const order = ordDate.compare(date, oneWeekAfterEarliestRepresentableDate)
    match(order)
      // when the start of week containing our date is before the
      // earliest-representable date, the start of week should be
      // 'Invalid Date'
      .with(-1, () => {
        t.false(isValidDate(reset))
      })
      .otherwise(() => {
        t.is(0, reset.getUTCDay())
        t.is(0, reset.getUTCHours())
        t.is(0, reset.getUTCMinutes())
        t.is(0, reset.getUTCSeconds())
        t.is(0, reset.getUTCMilliseconds())
      })
  },
  {
    verbose: true,
    numRuns: 1000,
    examples: [[add('week', 1, DATE_MIN)]],
  },
)

testProp(
  'should set date to zero after winding date back to start-of month',
  [fc.date().filter((d) => isValidDate(startOf('month', d)))],
  (t, date) => {
    const reset = startOf('month', date)
    const oneMonthAfterEarliestRepresenableDate = add('month', 1, DATE_MIN)
    const order = ordDate.compare(date, oneMonthAfterEarliestRepresenableDate)
    match(order)
      // when the start of month containing our date is before the
      // earliest-representable date, the start of the month should be
      // 'Invalid Date'
      .with(-1, () => {
        t.false(isValidDate(reset))
      })
      .otherwise(() => {
        t.is(1, reset.getUTCDate())
        t.is(0, reset.getUTCHours())
        t.is(0, reset.getUTCMinutes())
        t.is(0, reset.getUTCSeconds())
        t.is(0, reset.getUTCMilliseconds())
      })
  },
  {
    verbose: true,
    numRuns: 1000,
    endOnFailure: true,
    examples: [[add('month', 1, DATE_MIN)]],
  },
)

testProp(
  'should set month to zero after winding date back to start-of year',
  [fc.date().filter((d) => get('year', d) !== get('year', DATE_MIN))],
  (t, date) => {
    const reset = startOf('year', date)
    t.is(0, reset.getUTCMonth())
    t.is(1, reset.getUTCDate())
    t.is(0, reset.getUTCHours())
    t.is(0, reset.getUTCMinutes())
    t.is(0, reset.getUTCSeconds())
    t.is(0, reset.getUTCMilliseconds())
  },
  {
    verbose: true,
    numRuns: 1000,
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
      fc.string().filter(not(includedIn(resetableUnitsOfTime as unknown as string[]))),
      fc.date(),
      fc.object(),
      fc.float(),
      fc.integer(),
    ),
    fc.date(),
  ],
  (t, unit, date) => {
    t.throws(() => startOf(unit as any, date))
  },
  { verbose: true },
)

testProp(
  'should throw when date is not a Date',
  [
    fc.constantFrom(...resetableUnitsOfTime),
    fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
  ],
  (t, unit, date) => {
    t.throws(() => startOf(unit, date as any))
  },
  { verbose: true },
)
