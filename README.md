# od

[![Build Status]](https://github.com/strong-roots-capital/od/actions/workflows/release.yml)

[build status]: https://github.com/strong-roots-capital/od/actions/workflows/release.yml/badge.svg?event=push

> Oh dear, another date library

## Why Bother

Need a date library?

There's [moment], so big and so slow it'll make continental-drift look
snappy. Or [js-joda], an imperative library with its own custom
parsing! Doesn't that sound like a [Good Idea]™. Then there's [dayjs],
an imperative library that keeps data in its own custom objects like
[moment].... making [tree-shaking] impossible. Next up is [date-fns],
that only offers separate methods for incrementing a date by different
units of time. Talk about crimping your polymorphic style. Maybe
you're more of a functional programmer, so you'd reach for [date-fp],
until you find it's unmaintained and inconsistent with
time-zones. There are plenty more date libraries, maybe you'll find a
good fit if you keep looking for a few more years...

[moment]: https://momentjs.com/docs/#/-project-status/
[js-joda]: https://github.com/js-joda/js-joda
[good idea]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Examples
[dayjs]: https://github.com/iamkun/dayjs
[date-fns]: https://github.com/date-fns/date-fns
[date-fp]: https://github.com/cullophid/date-fp
[tree-shaking]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking

Don't over-dose on the existing headaches, say hello to `od`!

<img align="right" src="img/oh-dee.jpg" height="275" style="padding-left: 20px">

`od`, the one date library required. (Pronounced "oh dee".)

It's

- immutable
  - Every function returns a new Date object
- consistent
  - UTC everywhere. Let's all just ignore everything else.
- intuitive
  - Guides developers away from [common pitfalls]
- fast
  - As fast as you can get with the core libraries
- transparent
  - Uses standard [JavaScript Date] objects everywhere
- typed
  - Conceived in TypeScript, for TypeScript
- simple
  - Each function has one job and does it well
- tested
  - 100% code coverage, property-tested with [fast-check]
- tiny
  - 2 kB gzipped
- maintained
  - Maintenance becomes simple when scope is kept minimal
- documented
  - On this very [readme]
- curried
  - All functions support [partial-application]
- dependency-free
  - [Zero dependencies] were used in the making of this library

[javascript date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[common pitfalls]: doc/documentation.md
[fast-check]: https://github.com/dubzzz/fast-check
[readme]: #documentation
[partial-application]: https://en.wikipedia.org/wiki/Partial_application
[rollup]: https://github.com/rollup/rollup
[zero dependencies]: https://david-dm.org/strong-roots-capital/od

## Install

```shell
npm install od
```

### Use

```typescript
import D from 'od'

const start = D.of(Date.now())
const end = D.add('day', 1, start)
```

Or just import the functions you need

```typescript
import { add } from 'od/add'
```

## Documentation

<details><summary>Creating new Dates</summary>

- [`of`: Create a new Date from existing information](#of)

</details>

<details><summary>Transforming Dates</summary>

- [`add`: Add a time unit to a Date](#add)
- [`subtract`: Subtract a time unit from a Date](#subtract)
- [`startOf`: Wind a Date back to the start of specified time unit](#startOf)

</details>

<details><summary>Combining Dates</summary>

- [`distance`: Calculate the number of time-units between two dates](#distance)

</details>

<details><summary>Accessing properties of Dates</summary>

- [`get`: Access one field of an existing Date](#get)

</details>

### Creating Dates

#### of

<details><summary><code>of :: number | string | DateDescriptor -> Date</code></summary>

```hs
of :: number -> Date
of :: string -> Date
of :: DateDescriptor -> Date
```

</details>

Creates a Date object representing the specified date.

```typescript
D.of(0) //=> 1970-01-01T00:00:00.000Z
D.of('1912-04-15') //=> 1912-04-15T00:00:00.000Z
D.of('1969-07-20T20:17:00') //=> 1969-07-20T20:17:00.000Z
D.of({ year: 1984 }) //=> 1984-01-01T00:00:00.000Z
```

Rules:

- numbers are treated as milliseconds since the [unix epoch](https://en.wikipedia.org/wiki/Unix_time)
- strings are treated as [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamps in UTC timezone
  - `'YYYY-MM-DD'`
  - `'YYYY-MM-DDTHH:MM:SS'`
  - `'YYYY-MM-DDTHH:MM:SS.SSSZ'`
  - `'YYYYYY-MM-DDTHH:MM:SS.SSSZ'`
- `DateDescriptor` properties default to beginning-of-interval when unspecified
  - `{year: 2000, date: 25}` => `'2000-01-25T00:00:00.000Z'`
  - `{year: 2000, month: 1, date: 14, hour: 12, minute: 45, second: 0, millisecond: 0}` => `'2000-02-14T12:45:00.000Z'`

With `DateDescriptor`s note that all fields are UTC time so months are
zero-indexed.

Read more in the [additional documentation](doc/documentation.md#of).

### Transforming Dates

#### add

<details><summary><code>add :: UnitOfTime -> number -> Date -> Date</code></summary>

```hs
add :: UnitOfTime -> number -> Date -> Date
```

</details>

Increments the given date by the specified number of time units, and
returns a new Date with the new value.

```typescript
add('month', 2, D.of({ year: 2000 })) //=> 2000-03-01T00:00:00.000Z
```

Supported time units:

- `millisecond`
- `second`
- `minute`
- `hour`
- `day`
- `week`
- `month`
- `year`

Note: when incrementing by `month` or `year`, if the day of the month
for the input date is greater than the number of days in the output
month, the day of the month for the output date will be set to the
last day in the output month.

```typescript
add('month', 1, D.of('2000-01-31')) //=> 2000-02-29T00:00:00.000Z
```

Read more in the [additional documentation](doc/documentation.md#add).

#### subtract

<details><summary><code>subtract :: UnitOfTime -> number -> Date -> Date</code></summary>

```hs
subtract :: UnitOfTime -> number -> Date -> Date
```

</details>

Decrements the given date by the specified number of time units, and
returns a new Date with the new value.

```typescript
subtract('month', 2, D.of({ year: 2000 })) //=> 1999-11-01T00:00:00.000Z
```

Supported time units:

- `millisecond`
- `second`
- `minute`
- `hour`
- `day`
- `week`
- `month`
- `year`

#### startOf

<details><summary><code>startOf :: ResetableUnitOfTime -> Date -> Date</code></summary>

```hs
startOf :: ResetableUnitOfTime -> Date -> Date
```

</details>

Reset a date back in time to the start of the specified time unit and
returns a Date with the new value.

```typescript
startOf('year', D.of('1911-05-25')) //=> 1911-01-01T00:00:00.000Z
```

Supported time units:

- `second`
- `minute`
- `hour`
- `day`
- `week`
- `month`
- `year`

### Combining Dates

#### distance

<details><summary><code>distance :: UnitOfTime -> Date -> Date -> number</code></summary>

```hs
distance :: UnitOfTime -> Date -> Date -> number
```

</details>

Returns the number of time-units between the first date and the second.

```typescript
distance('month', D.of('1914-07-11'), D.of('1939-09-01')) //=> 302
```

Supported time units:

- `millisecond`
- `second`
- `minute`
- `hour`
- `day`
- `week`
- `month`
- `year`

### Accessing Dates

#### get

<details><summary><code>get :: AccessibleUnitOfTime -> Date -> Date</code></summary>

```hs
get :: AccessibleUnitOfTime -> Date -> Date
```

</details>

Returns the numeric value of the specified property of the supplied date.

```typescript
get('month', D.of('1945-11-05')) //=> 10
```

Supported time units:

- `millisecond`
- `second`
- `minute`
- `hour`
- `day`
- `date`
- `month`
- `year`
- `unix`

where `unix` resolves to the number of milliseconds since the unix epoch.

### Caveats

If you cause a `Date` overflow or underflow, `od` will return an
`Invalid Date` object. You can test for invalid dates with the
following code

```typescript
declare
invalidDate: Date
if (Number.isNaN(invalidDate.getTime())) {
  // `invalidDate` is invalid
}
```

The decision not to check for overflow or underflow was explicitly
made to uphold the project goals. To use `od` without throwing or
producing overflow or underflow errors, consider wrapping with
[fp-ts](https://github.com/gcanti/fp-ts).

When an official wrapper exists, I'll post to it on this page.

## License

[ISC licensed](LICENSE)

<!--  LocalWords:  hs typescript DateDescriptor YYYY startOf ResetableUnitOfTime -->
<!--  LocalWords:  od AccessibleUnitOfTime UnitOfTime joda dayjs fns -->
<!--  LocalWords:  dee -->
