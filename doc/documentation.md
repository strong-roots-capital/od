# Additional Documentation

Since `od` aims to be consistent and intuitive, there is little point
hashing out excruciatingly verbose details of how its functions map
inputs to outputs. However, core JavaScript has many warts and
gotchas, so this page details how `od` does not expose you to the same
irregular behavior as the core libraries.

## of

### Date.UTC

Potential pitfall: `Date.UTC` is not a one-to-one function

From the [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC#Description):

> Years between 0 and 99 are converted to a year in the 20th century
> (1900 + year); for example, 95 is converted to the year 1995.

How quaint. `od` avoids this trap by using [setUTCFullYear] after
every invocation to `Date.UTC`.

[setUTCFullYear]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCFullYear

### Date.parse

Potential pitfall: Creating `Date` objects from strings is
inconsistent across browsers.

From the [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Examples):

> Parsing of date strings with the `Date` constructor (and
> `Date.parse`, they are equivalent) is strongly discouraged due to
> browser differences and inconsistencies.

`od` avoids this trap by never passing a string to the `Date`
constructor or invoking `Date.parse` -- instead `od` parses
date-strings into separate components and passes the resulting data
(safely!) through `Date.UTC`.

# Acknowledgments

Many of JavaScript's warts and gotchas were unknown to me, hidden in
the [text of the ancients] until I re-discovered the forgotten
knowledge through extensive use of [property testing]. As such,
[fast-check] deserves a huge shout-out for job well done, without
which none of us would be able to enjoy the manipulation of dates in
JavaScript without major headache.

[text of the ancients]: http://www.ecma-international.org/ecma-262/5.1/
[property testing]: https://en.wikipedia.org/wiki/Property_testing
[fast-check]: https://github.com/dubzzz/fast-check

<!--  LocalWords:  MDN -->
