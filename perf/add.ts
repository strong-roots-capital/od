import Benchmark from 'benchmark'
import { add } from '../src/add'

const suite = new Benchmark.Suite()

suite
  .add('add', () => {
    const now = new Date()
    add('millisecond', 1, now)
    add('second', 1, now)
    add('minute', 1, now)
    add('hour', 1, now)
    add('day', 1, now)
    add('week', 1, now)
    add('month', 1, now)
    add('year', 1, now)
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('cycle', (event: any) => {
    console.log(String(event.target))
  })
  .run()