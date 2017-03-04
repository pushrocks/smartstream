"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-test");
const fs = require("fs");
const smartstream = require("../dist/index");
let testSmartstream;
describe('smartstream', function () {
    it('should combine a stream', function (done) {
        this.timeout(5000);
        testSmartstream = new smartstream.Smartstream([
            fs.createReadStream('./test/assets/test.md'),
            fs.createWriteStream('./test/assets/testCopy.md')
        ]);
        testSmartstream.run().then(() => {
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBcUI7QUFDckIseUJBQXlCO0FBR3pCLDZDQUE0QztBQUU1QyxJQUFJLGVBQXdDLENBQUE7QUFFNUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUNwQixFQUFFLENBQUMseUJBQXlCLEVBQUUsVUFBUyxJQUFJO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbEIsZUFBZSxHQUFHLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQztZQUMxQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUM7WUFDNUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLDJCQUEyQixDQUFDO1NBQ3BELENBQUMsQ0FBQTtRQUNGLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDdkIsSUFBSSxFQUFFLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==