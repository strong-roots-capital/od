/**
 * od
 * Oh dear, another date library
 */

import { of } from './of.js'
import { get } from './get.js'
import { add } from './add.js'
import { subtract } from './subtract.js'
import { startOf } from './start-of.js'
import { distance } from './distance.js'

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
