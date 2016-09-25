"use strict";
const plugins = require("./smartstream.plugins");
class Smartstream {
    constructor(streamArrayArg) {
        this.streamArray = [];
        this.errorFunction = null;
        this.streamArray = streamArrayArg;
    }
    onError(errorFunctionArg) {
        this.errorFunction = errorFunctionArg;
    }
    run() {
        let combinedStream = plugins.streamCombiner2.obj(this.streamArray);
        if (this.errorFunction !== null) {
            combinedStream.on('error', this.errorFunction);
        }
        return combinedStream;
    }
}
exports.Smartstream = Smartstream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaURBQWdEO0FBTWhEO0lBR0ksWUFBWSxjQUFxQjtRQUZqQyxnQkFBVyxHQUFHLEVBQUUsQ0FBQTtRQUNoQixrQkFBYSxHQUFtQixJQUFJLENBQUE7UUFFaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUE7SUFDckMsQ0FBQztJQUNELE9BQU8sQ0FBQyxnQkFBZ0M7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQTtJQUN6QyxDQUFDO0lBQ0QsR0FBRztRQUNDLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNsRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUIsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ2xELENBQUM7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFBO0lBQ3pCLENBQUM7Q0FDSjtBQWhCRCxrQ0FnQkMifQ==