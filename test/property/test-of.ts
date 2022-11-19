import test from 'node:test'
import assert from 'node:assert/strict'

import fc from 'fast-check'

import { not, asDateDescriptor } from './util'
import { isDateDescriptor } from '../../src/date-descriptor'

/**
 * Library under test
 */

import {
  of,
  isDatestringInFormatISO,
  isDatestringInFormatISOWithoutMilliseconds,
  isDatestringInFormatISOWithoutTime,
} from '../../src/of'

/*********************************************************************
 * Positive test cases
 ********************************************************************/

test(`should treat all generated ISO strings as valid`, () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      assert(isDatestringInFormatISO(date.toISOString()))
    }),
    {
      verbose: true,
      numRuns: 1000,
    },
  )
})

test(`should treat all generated ISO strings without milliseconds strings as valid`, () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      assert(
        isDatestringInFormatISOWithoutMilliseconds(
          date.toISOString().replace(/\.\d+Z$/, ''),
        ),
      )
    }),
    {
      verbose: true,
      numRuns: 1000,
    },
  )
})

test(`should treat all generated ISO strings without time strings as valid`, () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      assert(
        isDatestringInFormatISOWithoutTime(
          date.toISOString().replace(/T[0-9:.]+Z$/, ''),
        ),
      )
    }),
    {
      verbose: true,
      numRuns: 1000,
    },
  )
})

test(`should reconstruct any date from its corresponding date-descriptor`, () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      const descriptor = asDateDescriptor(date)
      assert.equal(date.toISOString(), of(descriptor).toISOString())
    }),
    {
      verbose: true,
      numRuns: 2500,
    },
  )
})

test(`should reconstruct any date from its corresponding ISO string`, () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      assert.equal(date.toISOString(), of(date.toISOString()).toISOString())
    }),
    {
      verbose: true,
      numRuns: 2500,
    },
  )
})

test(`should reconstruct any date from its corresponding milliseconds-since-epoch`, () => {
  fc.assert(
    fc.property(fc.date(), (date) => {
      assert.equal(date.toISOString(), of(date.getTime()).toISOString())
    }),
    {
      verbose: true,
      numRuns: 2500,
    },
  )
})

/*********************************************************************
 * Negative test cases
 ********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

test(`should throw error when given non-number, non-string, non-descriptor`, () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.boolean(),
        fc.date(),
        fc.emailAddress(),
        fc.object().filter(not(isDateDescriptor)),
      ),
      (input) => {
        assert.throws(() => of(input as any))
      },
    ),
    {
      verbose: true,
      numRuns: 1000,
    },
  )
})
