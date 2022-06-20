# Additional Documentation

Since `od` aims to be consistent and intuitive, there is little point
hashing out excruciatingly verbose details of how its functions map
inputs to outputs. However, core JavaScript `Date` has many warts and
gotchas, so this page details how `od` does not expose you to the same
irregular behavior as the core libraries.

## of

### Date.UTC

Potential pitfall: `Date.UTC` is not an [injective] function.

From the [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC#Description):

> Years between 0 and 99 are converted to a year in the 20th century
> (1900 + year); for example, 95 is converted to the year 1995.

How quaint. `od` avoids this trap by using [setUTCFullYear] after
every invocation to `Date.UTC`.

[injective]: https://en.wikipedia.org/wiki/Injective_function
[setutcfullyear]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCFullYear

### Date.parse

Potential pitfall: Creating `Date` objects from strings is
inconsistent across browsers.

From the [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Examples):

> Parsing of date strings with the `Date` constructor (and
> `Date.parse`, they are equivalent) is strongly discouraged due to
> browser differences and inconsistencies.

`od` avoids this trap by never passing a string to the `Date`
constructor or invoking `Date.parse` -- instead `od` uses a simple
regex to parse ISO date-strings into a separate fields and passes
the resulting data ([safely!]) through `Date.UTC`.

[safely!]: #Date.UTC

## add

### Date.setUTCMonth

Potential pitfall: Incrementing a date one month, to a month with
fewer days than the current date, "overflows" the incremented date to
the next month.

From the [MDN
Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMonth#Description):

> If a parameter you specify is outside of the expected range,
> setUTCMonth() attempts to update the date information in the Date
> object accordingly. For example, if you use 15 for monthValue, the
> year will be incremented by 1, and 3 will be used for month.

This means adding 1 month to January 31st gives you March 3rd (or 2nd,
on leap years).

`od` avoids this in the `add` function when incrementing by `month` or
`year` intervals by changing the date of the output value to the final
day in the output month, rather than overflowing the month. This
ensures that the difference in months between the given value and the
received value is always exactly the specified amount.

# Acknowledgments

Many of JavaScript's `Date`s warts and gotchas were unknown to me,
hidden in the [text of the ancients] until I re-discovered the
forgotten knowledge through extensive use of [property testing]. As
such, [fast-check] deserves a huge shout-out for job well done,
without which none of us would be able to enjoy the manipulation of
dates in JavaScript without major headache.

[text of the ancients]: http://www.ecma-international.org/ecma-262/5.1/
[property testing]: https://en.wikipedia.org/wiki/Property_testing
[fast-check]: https://github.com/dubzzz/fast-check

<!--  LocalWords:  MDN -->
