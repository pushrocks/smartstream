# smartstream
simplifies access to node streams, TypeScript ready!

## Availabililty
[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartstream)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/smartstream)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartstream)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartstream/)

## Status for master
[![build status](https://GitLab.com/pushrocks/smartstream/badges/master/build.svg)](https://GitLab.com/pushrocks/smartstream/commits/master)
[![coverage report](https://GitLab.com/pushrocks/smartstream/badges/master/coverage.svg)](https://GitLab.com/pushrocks/smartstream/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/smartstream.svg)](https://www.npmjs.com/package/smartstream)
[![Dependency Status](https://david-dm.org/pushrocks/smartstream.svg)](https://david-dm.org/pushrocks/smartstream)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartstream/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartstream/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartstream/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartstream)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
Use TypeScript for best in class instellisense.

## Usage
We recommend the use of TypeScript for best in class intellisense support.

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

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://lossless.com)
