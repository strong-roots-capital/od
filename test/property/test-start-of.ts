import test from 'node:test'
import assert from 'node:assert/strict'

import fc from 'fast-check'
import { match } from 'ts-pattern'
import { Ord as ordDate } from 'fp-ts/Date'

import { not, includedIn } from './util'
import { resetableUnitsOfTime } from '../../src/unit-of-time'
import { get } from '../../src/get'
import { add } from '../../src/add'
import { DATE_MIN } from './spec'

/**
 * Library under test
 */

import { startOf } from '../../src/start-of'

function isValidDate(date: Date): boolean {
  return !Number.isNaN(date.getTime())
}

/*********************************************************************
 * Positive test cases
 ********************************************************************/

test('should set milliseconds to zero after winding date back to start-of second', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      assert.equal(0, startOf('second', date).getUTCMilliseconds())
    }),
    {
      verbose: true,
      numRuns: 1000,
    },
  )
})

test('should set seconds to zero after winding date back to start-of minute', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      const reset = startOf('minute', date)
      assert.equal(0, reset.getUTCSeconds())
      assert.equal(0, reset.getUTCMilliseconds())
    }),
    {
      verbose: true,
      numRuns: 1000,
    },
  )
})

test('should set minutes to zero after winding date back to start-of hour', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      const reset = startOf('hour', date)
      assert.equal(0, reset.getUTCMinutes())
      assert.equal(0, reset.getUTCSeconds())
      assert.equal(0, reset.getUTCMilliseconds())
    }),
    {
      verbose: true,
      numRuns: 1000,
    },
  )
})

test('should set hours to zero after winding date back to start-of day', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      const reset = startOf('day', date)
      assert.equal(0, reset.getUTCHours())
      assert.equal(0, reset.getUTCMinutes())
      assert.equal(0, reset.getUTCSeconds())
      assert.equal(0, reset.getUTCMilliseconds())
    }),
    {
      verbose: true,
      numRuns: 1000,
    },
  )
})

test('should set days to zero after winding date back to start-of week', () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      const reset = startOf('week', date)
      const oneWeekAfterEarliestRepresentableDate = add('week', 1, DATE_MIN)
      const order = ordDate.compare(date, oneWeekAfterEarliestRepresentableDate)
      match(order)
        // when the start of week containing our date is before the
        // earliest-representable date, the start of week should be
        // 'Invalid Date'
        .with(-1, () => {
          assert.ok(!isValidDate(reset))
        })
        .otherwise(() => {
          assert.equal(0, reset.getUTCDay())
          assert.equal(0, reset.getUTCHours())
          assert.equal(0, reset.getUTCMinutes())
          assert.equal(0, reset.getUTCSeconds())
          assert.equal(0, reset.getUTCMilliseconds())
        })
    }),
    {
      verbose: true,
      numRuns: 1000,
      examples: [[add('week', 1, DATE_MIN)]],
    },
  )
})

test('should set date to zero after winding date back to start-of month', () => {
  fc.assert(
    fc.property(
      fc.date().filter((d) => isValidDate(startOf('month', d))),
      (date) => {
        const reset = startOf('month', date)
        const oneMonthAfterEarliestRepresenableDate = add('month', 1, DATE_MIN)
        const order = ordDate.compare(date, oneMonthAfterEarliestRepresenableDate)
        match(order)
          // when the start of month containing our date is before the
          // earliest-representable date, the start of the month should be
          // 'Invalid Date'
          .with(-1, () => {
            assert.ok(!isValidDate(reset))
          })
          .otherwise(() => {
            assert.equal(1, reset.getUTCDate())
            assert.equal(0, reset.getUTCHours())
            assert.equal(0, reset.getUTCMinutes())
            assert.equal(0, reset.getUTCSeconds())
            assert.equal(0, reset.getUTCMilliseconds())
          })
      },
    ),
    {
      verbose: true,
      numRuns: 1000,
      endOnFailure: true,
      examples: [[add('month', 1, DATE_MIN)]],
    },
  )
})

test('should set month to zero after winding date back to start-of year', () => {
  fc.assert(
    fc.property(
      fc.date().filter((d) => get('year', d) !== get('year', DATE_MIN)),
      (date) => {
        const reset = startOf('year', date)
        assert.equal(0, reset.getUTCMonth())
        assert.equal(1, reset.getUTCDate())
        assert.equal(0, reset.getUTCHours())
        assert.equal(0, reset.getUTCMinutes())
        assert.equal(0, reset.getUTCSeconds())
        assert.equal(0, reset.getUTCMilliseconds())
      },
    ),
    {
      verbose: true,
      numRuns: 1000,
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
        fc
          .string()
          .filter(not(includedIn(resetableUnitsOfTime as unknown as string[]))),
        fc.date(),
        fc.object(),
        fc.float(),
        fc.integer(),
      ),
      fc.date(),
      (unit, date) => {
        assert.throws(() => startOf(unit as any, date))
      },
    ),
    { verbose: true },
  )
})

test('should throw when date is not a Date', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...resetableUnitsOfTime),
      fc.oneof(fc.string(), fc.object(), fc.boolean(), fc.float(), fc.integer()),
      (unit, date) => {
        assert.throws(() => startOf(unit, date as any))
      },
    ),
    { verbose: true },
  )
})
