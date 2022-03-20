import test from 'ava'

/**
 * Library under test
 */

import { curry } from '../src/curry'

const id = <A>(a: A): A => a

const fn = curry((_string: string, _number: number, _boolean: boolean): undefined => {
  return undefined
})

test('should act as identity function when passed zero arguments', (t) => {
  const curriedNone = fn()
  const curriedOne = curriedNone('horse')
  const curriedOneId = curriedOne()
  const curriedTwo = curriedOneId(1)
  const curriedTwoId = curriedTwo()
  const curriedThree = curriedTwoId(true)
  t.is(curriedThree, undefined)
})

test('should act as identity when passed function with zero arguments', (t) => {
  const fn = curry(() => void 0)
  t.is(fn(void 0), undefined)
})

test('should curry unary function', (t) => {
  const fn = curry(id)
  const a = 5
  t.is(a as unknown, fn(a))
})

test('should throw error when passed function with more than three arguments', (t) => {
  t.throws(() =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    curry(((_a: number, _b: number, _c: number, _d: number) => void 0) as any),
  )
})
