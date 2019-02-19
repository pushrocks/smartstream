# @pushrocks/smartstream
simplifies access to node streams

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartstream)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartstream)
* [github.com (source mirror)](https://github.com/pushrocks/smartstream)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartstream/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartstream/badges/master/build.svg)](https://gitlab.com/pushrocks/smartstream/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartstream/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartstream/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smartstream.svg)](https://www.npmjs.com/package/@pushrocks/smartstream)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/smartstream/badge.svg)](https://snyk.io/test/npm/@pushrocks/smartstream)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

Use TypeScript for best in class instellisense.

```typescript
import { Smartstream } from 'smartstream'
import * as gUglify from 'gulp-uglify'

let mySmartstream = new Smartstream([
    gulp.src(['./file1.js','./file2.js']),
    gUglify(),
    gulp.dest('./some/output/path')
])

mySmartstream.onError((err) => { /* handle error */ }) // handles all errors in stream
myStream.onCustomEvent('myeventname', (args...) => { /* Do something */ }) // emit an custom event anywhere in your stream
mySmartstream.run().then(() => {/* do something when stream is finished */})
```

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://maintainedby.lossless.com)
