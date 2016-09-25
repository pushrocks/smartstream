# smartstream
simplifies access to node streams, TypeScript ready!

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartstream)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/smartstream)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartstream)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartstream/gitbook)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartstream/badges/master/build.svg)](https://gitlab.com/pushrocks/smartstream/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartstream/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartstream/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/smartstream.svg)](https://david-dm.org/pushrocks/smartstream)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartstream/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartstream/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartstream/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartstream)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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

mySmartstream.onError((err) => {/* handle error */}) // handles all errors in stream
mySmartstream.run().then(() => {/* do something when stream is finished */})
```

