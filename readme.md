# od [![Build status](https://travis-ci.org/strong-roots-capital/od.svg?branch=master)](https://travis-ci.org/strong-roots-capital/od) [![npm version](https://img.shields.io/npm/v/od.svg)](https://npmjs.org/package/od) [![codecov](https://codecov.io/gh/strong-roots-capital/od/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/od)

> Oh dear, another date library

## Why Bother

Need a date library?

There's [moment](https://github.com/moment/moment), so big and so slow
it'll make continental-drift look snappy. Or
[js-joda](https://github.com/js-joda/js-joda), an imperative library
with its own custom parsing! Doesn't that sound fun. Then there's
[dayjs](https://github.com/iamkun/dayjs), an imperative library that
keeps data in its own custom objects like `moment`. Next up is
[date-fns](https://github.com/date-fns/date-fns), that only offers
separate methods for incrementing a date by different units of
time. Talk about crimping your polymorphic style. Maybe you're more of
a functional programmer, so you'd reach for
[date-fp](https://github.com/cullophid/date-fp), until you find it's
unmaintained and inconsistent with time-zones. There are plenty more
date libraries, maybe you'll find a good fit if you keep looking for a
few more years...

Don't over-dose on the existing headaches, say hello to `od`!

<img align="right" src="img/oh-dee.jpg" style="padding-left: 20px">

`od`, the one date library required.

It's

- immutable
  Every function returns a new Date object
- consistent
  UTC everywhere. Let's all just ignore everything else.
- fast
  As fast as you can get with the core libraries
- transparent
  No custom objects representing Date values
- simple
  Each function has one job and does it well
- tested
  100% code coverage
- maintained
  Maintenance becomes simple when scope is kept minimal
- documented
  On this very readme
- curried
  All functions support partial-application
- dependency-free
  Zero dependencies were used in the making of this library
- efficient
  [Rollup](https://github.com/rollup/rollup) ensures the smallest code-size and fastest load-times


## Install

```shell
npm install od
```

### Use

```typescript
import D from 'od'
// TODO: describe usage
```


## Documentation

### Creating Dates

#### of

<details><summary><code>of :: number | string | DateDescriptor -> Date</code></summary>

``` hs
of :: number -> Date
of :: string -> Date
of :: DateDescriptor -> Date
```

</details>

Creates a Date object representing the specified date.

``` javascript
D.of(0)                      //=> 1970-01-01T00:00:00.000Z
D.of('1912-04-15')           //=> 1912-04-15T00:00:00.000Z
D.of('1969-07-20T20:17:00')  //=> 1969-07-20T20:17:00.000Z
D.of({year: 1984})           //=> 1984-01-01T00:00:00.000Z
```

Rules:

- numbers are treated as milliseconds since the [unix epoch](https://en.wikipedia.org/wiki/Unix_time)
- strings are treated as [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamps in UTC timezone
  - `'YYYY-MM-DD'`
  - `'YYYY-MM-DDTHH:MM:SS'`
- `DateDescriptor` properties default to beginning-of-interval when unspecified
  - `{year: 2000, date: 25}` => `'2000-01-25`
  - `{year: 2000, month: 1, date: 14, hour: 12, minute: 45, second: 0, millisecond: 0}` => `'2000-02-14T12:45:00`

With `DateDescriptor`s note that all fields are UTC time so months are
zero-indexed.

### Transforming Dates

#### add

<details><summary><code>add :: UnitOfTime -> number -> Date -> Date</code></summary>

``` hs
add :: UnitOfTime -> number -> Date -> Date
```

</details>

Increments the given date by the specified number of time units, and
returns a new Date with the new value.

``` javascript
add('month', 2, D.of({year: 2000}))  //=> 2000-03-01T00:00:00.000Z
```

Supported time units:

- millisecond
- second
- minute
- hour
- day
- week
- month
- year

#### subtract

<details><summary><code>subtract :: UnitOfTime -> number -> Date -> Date</code></summary>

``` hs
subtract :: UnitOfTime -> number -> Date -> Date
```

</details>

Increments the given date by the specified number of time units, and
returns a new Date with the new value.

``` javascript
subtract('month', 2, D.of({year: 2000}))  //=> 1999-11-01T00:00:00.000Z
```

Supported time units:

- millisecond
- second
- minute
- hour
- day
- week
- month
- year

#### startOf

<details><summary><code>startOf :: ResetableUnitOfTime -> Date -> Date</code></summary>

``` hs
startOf :: ResetableUnitOfTime -> Date -> Date
```

</details>

Reset a date back in time to the start of the specified time unit and
returns a Date with the new value.

``` javascript
startOf('year', D.of('1911-05-25'))  //=> 1911-01-01T00:00:00.000Z
```

Supported time units:

- second
- minute
- hour
- day
- week
- month
- year

### Accessing dates

#### get

<details><summary><code>get :: AccessibleUnitOfTime -> Date -> Date</code></summary>

``` hs
get :: AccessibleUnitOfTime -> Date -> Date
```

</details>

Returns the numeric value of the specified property of the supplied date.

``` javascript
get('month', D.of('1945-11-05'))  //=> 10
```

Supported time units:

- millisecond
- second
- minute
- hour
- day
- date
- month
- year
- unix

where `unix` resolves to the number of milliseconds since the unix epoch.

## License

[ISC licensed](LICENSE)

<!--  LocalWords:  hs javascript DateDescriptor YYYY startOf ResetableUnitOfTime -->
<!--  LocalWords:  AccessibleUnitOfTime -->
