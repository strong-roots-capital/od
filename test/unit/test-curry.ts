import test from 'node:test'
import assert from 'node:assert/strict'

/**
 * Library under test
 */

import { curry } from '../../src/curry'

const id = <A>(a: A): A => a

const fn = curry((_string: string, _number: number, _boolean: boolean): undefined => {
  return undefined
})

test('should act as identity function when passed zero arguments', () => {
  const curriedNone = fn()
  const curriedOne = curriedNone('horse')
  const curriedOneId = curriedOne()
  const curriedTwo = curriedOneId(1)
  const curriedTwoId = curriedTwo()
  const curriedThree = curriedTwoId(true)
  assert.equal(curriedThree, undefined)
})

test('should act as identity when passed function with zero arguments', () => {
  const fn = curry(() => void 0)
  assert.equal(fn(void 0), undefined)
})

test('should curry unary function', () => {
  const fn = curry(id)
  const a = 5
  assert.equal(a as unknown, fn(a))
})

test('should throw error when passed function with more than three arguments', () => {
  assert.throws(() =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    curry(((_a: number, _b: number, _c: number, _d: number) => void 0) as any),
  )
})
