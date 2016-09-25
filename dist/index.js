"use strict";
const plugins = require("./smartstream.plugins");
/**
 * class Smartstream handles
 */
class Smartstream {
    constructor(streamArrayArg) {
        this.streamArray = [];
        this.errorFunction = null;
        this.streamStartFunction = null;
        this.customEventObjectArray = [];
        this.streamArray = streamArrayArg;
    }
    /**
     * attach an error handler to the stream to prevent throwing
     */
    onError(errorFunctionArg) {
        this.errorFunction = errorFunctionArg;
    }
    /**
     * make something with the stream itself
     */
    onStreamStart() {
    }
    /**
     * run the stream
     * @returns Promise
     */
    run() {
        let done = plugins.q.defer();
        // clone Array
        let streamExecutionArray = [];
        for (let streamItem of this.streamArray) {
            streamExecutionArray.push(streamItem);
        }
        // combine the stream
        let finalStream = null;
        let firstIteration = true;
        for (let stream of streamExecutionArray) {
            if (firstIteration === true) {
                finalStream = stream;
            }
            if (this.errorFunction !== null) {
                stream.on('error', this.errorFunction);
            }
            for (let customEventObject of this.customEventObjectArray) {
                stream.on(customEventObject.eventName, customEventObject.eventFunction);
            }
            if (!firstIteration) {
                finalStream = finalStream.pipe(stream);
            }
            firstIteration = false;
        }
        finalStream.on('end', function () {
            done.resolve();
        });
        finalStream.on('close', function () {
            done.resolve();
        });
        finalStream.on('finish', function () {
            done.resolve();
        });
        return done.promise;
    }
}
exports.Smartstream = Smartstream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaURBQWdEO0FBbUJoRDs7R0FFRztBQUNIO0lBS0ksWUFBWSxjQUFxQjtRQUpqQyxnQkFBVyxHQUFHLEVBQUUsQ0FBQTtRQUNoQixrQkFBYSxHQUFtQixJQUFJLENBQUE7UUFDcEMsd0JBQW1CLEdBQXlCLElBQUksQ0FBQTtRQUNoRCwyQkFBc0IsR0FBeUIsRUFBRSxDQUFBO1FBRTdDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFBO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU8sQ0FBQyxnQkFBZ0M7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQTtJQUN6QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO0lBRWIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEdBQUc7UUFDQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUSxDQUFBO1FBRWxDLGNBQWM7UUFDZCxJQUFJLG9CQUFvQixHQUFHLEVBQUUsQ0FBQTtRQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFFbEYscUJBQXFCO1FBQ3JCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN0QixJQUFJLGNBQWMsR0FBWSxJQUFJLENBQUE7UUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixXQUFXLEdBQUcsTUFBTSxDQUFBO1lBQ3hCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMxQyxDQUFDO1lBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMzRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxQyxDQUFDO1lBQ0QsY0FBYyxHQUFHLEtBQUssQ0FBQTtRQUMxQixDQUFDO1FBQ0QsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztDQUNKO0FBL0RELGtDQStEQyJ9