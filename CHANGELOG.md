## [6.0.1](https://github.com/strong-roots-capital/od/compare/v6.0.0...v6.0.1) (2022-01-23)


### Bug Fixes

* point main and types to correct location ([42cf1ae](https://github.com/strong-roots-capital/od/commit/42cf1aeeef6a6727b2891017265e4985b542b3a1))

# [6.0.0](https://github.com/strong-roots-capital/od/compare/v5.0.0...v6.0.0) (2022-01-23)


* feat!: target ES6 JavaScript ([a8f703d](https://github.com/strong-roots-capital/od/commit/a8f703d83cff13e15a44c8392e2c724aea935151)), closes [#133](https://github.com/strong-roots-capital/od/issues/133)


### BREAKING CHANGES

* bump the target for compiled JavaScript from
ES5 to ES6, which should afford smaller code bundles and faster
runtimes thanks to newer JavaScript features provided by all
of the largest, modern browsers.

This is technically a breaking change but is expected to be of no
impact to most users.


# 5.0.0 (2022-01-23)


### Refactors


* flatten the dir structure of published files


### BREAKING CHANGES

* flatten the directory structure of the published
files, which affects the single-function imports.

What used to be imported in v4 as

```typescript
import { add } from 'od/lib/src/add'
```

is now imported as

```typescript
import { add } from 'od/add'
```

While inconvenient, this is hopefully search/replaceable with a tool
like [amber](https://github.com/dalance/amber), and will foster
a simpler developer experience moving forward.

Thank you for your understanding!


## [4.0.7](https://github.com/strong-roots-capital/od/compare/v4.0.6...v4.0.7) (2022-01-22)


### Bug Fixes

* **docs:** fix single-function import example ([9ecb6f3](https://github.com/strong-roots-capital/od/commit/9ecb6f37480212979475c560cb1cb5248ab1cea6)), closes [#54](https://github.com/strong-roots-capital/od/issues/54)

## [4.0.6](https://github.com/strong-roots-capital/od/compare/v4.0.5...v4.0.6) (2022-01-22)


### Bug Fixes

* **release:** maintain a changelog ([1c25420](https://github.com/strong-roots-capital/od/commit/1c25420d5df56bae90c0a154b4b19f515055ed77)), closes [#10](https://github.com/strong-roots-capital/od/issues/10)
