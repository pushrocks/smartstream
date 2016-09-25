import 'typings-test'
import fs = require('fs')
import * as should from 'should'

import * as smartstream from '../dist/index'

let testSmartstream: smartstream.Smartstream

describe('smartstream', function() {
    it('should combine a stream', function(){
        testSmartstream = new smartstream.Smartstream([
            fs.createReadStream('./test/assets/test.md'),
            fs.createWriteStream('./test/assets/testCopy.md')
        ])
        testSmartstream.run()
    })
})