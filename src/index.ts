/**
 * od
 * Oh dear, another date library
 */

import { of } from './of'
import { get } from './get'
import { add } from './add'
import { subtract } from './subtract'
import { startOf } from './start-of'


interface D {
    of: typeof of;
    add: typeof add;
    subtract: typeof subtract;
    get: typeof get;
    startOf: typeof startOf;
}


const D: D = {
    of,
    add,
    subtract,
    get,
    startOf
}

export default D

//  LocalWords:  od
