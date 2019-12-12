import test from 'ava'

/**
 * Library under test
 */

import { shift } from '../src/non-empty-list'


test('one numeric-argument should create date of specified unix-time', t => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t.throws(() => shift([] as any))
})
