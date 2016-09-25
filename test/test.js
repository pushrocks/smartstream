"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQix5QkFBeUI7QUFHekIsNkNBQTRDO0FBRTVDLElBQUksZUFBd0MsQ0FBQTtBQUU1QyxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3BCLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxVQUFTLElBQUk7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsQixlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQztZQUM1QyxFQUFFLENBQUMsaUJBQWlCLENBQUMsMkJBQTJCLENBQUM7U0FDcEQsQ0FBQyxDQUFBO1FBQ0YsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztZQUN2QixJQUFJLEVBQUUsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQSJ9