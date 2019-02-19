import fs = require('fs');
import { expect, tap } from '@pushrocks/tapbundle';

import * as smartstream from '../ts/index';

let testSmartstream: smartstream.Smartstream;
tap.test('should combine a stream', async () => {
  testSmartstream = new smartstream.Smartstream([
    fs.createReadStream('./test/assets/test.md'),
    fs.createWriteStream('./test/assets/testCopy.md')
  ]);
  await testSmartstream.run();
});

tap.start();
