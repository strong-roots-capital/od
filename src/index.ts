/**
 * od
 * Oh dear, another date library
 */

import { of } from './of'
import { get } from './get'
import { add } from './add'
import { subtract } from './subtract'
import { startOf } from './start-of'
import { distance } from './distance'

type D = {
  of: typeof of
  add: typeof add
  subtract: typeof subtract
  get: typeof get
  startOf: typeof startOf
  distance: typeof distance
}

const D: D = {
  of,
  add,
  subtract,
  get,
  startOf,
  distance,
}

export default D

//  LocalWords:  od
