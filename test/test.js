"use strict";
require("typings-test");
const fs = require("fs");
const smartstream = require("../dist/index");
let testSmartstream;
describe('smartstream', function () {
    it('should combine a stream', function () {
        testSmartstream = new smartstream.Smartstream([
            fs.createReadStream('./test/assets/test.md'),
            fs.createWriteStream('./test/assets/testCopy.md')
        ]);
        testSmartstream.run();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQix5QkFBeUI7QUFHekIsNkNBQTRDO0FBRTVDLElBQUksZUFBd0MsQ0FBQTtBQUU1QyxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3BCLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRTtRQUMxQixlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQztZQUM1QyxFQUFFLENBQUMsaUJBQWlCLENBQUMsMkJBQTJCLENBQUM7U0FDcEQsQ0FBQyxDQUFBO1FBQ0YsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ3pCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==