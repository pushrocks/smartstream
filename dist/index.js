"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartstream.plugins");
/**
 * class Smartstream handles
 */
class Smartstream {
    /**
     * constructor
     */
    constructor(streamArrayArg) {
        this.streamArray = [];
        this.customEventObjectArray = [];
        this.streamStartedDeferred = plugins.q.defer();
        this.streamArray = streamArrayArg;
    }
    /**
     * make something with the stream itself
     */
    streamStarted() {
        return this.streamStartedDeferred.promise;
    }
    /**
     * attach listener to custom event
     */
    onCustomEvent(eventNameArg, eventFunctionArg) {
        this.customEventObjectArray.push({
            eventName: eventNameArg,
            eventFunction: eventFunctionArg
        });
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
            stream.on('error', (err) => {
                done.reject(err);
            });
            for (let customEventObject of this.customEventObjectArray) {
                stream.on(customEventObject.eventName, customEventObject.eventFunction);
            }
            if (!firstIteration) {
                finalStream = finalStream.pipe(stream);
            }
            firstIteration = false;
        }
        this.streamStartedDeferred.resolve();
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
exports.cleanPipe = () => {
    return plugins.through2.obj((file, enc, cb) => {
        cb();
    }, (cb) => {
        cb();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUFnRDtBQWtCaEQ7O0dBRUc7QUFDSDtJQUtFOztPQUVHO0lBQ0gsWUFBWSxjQUFxQjtRQVB6QixnQkFBVyxHQUFHLEVBQUUsQ0FBQTtRQUNoQiwyQkFBc0IsR0FBeUIsRUFBRSxDQUFBO1FBQ2pELDBCQUFxQixHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7UUFNL0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUE7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYTtRQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFBO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWEsQ0FBRSxZQUFvQixFQUFFLGdCQUFzQztRQUN6RSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDO1lBQy9CLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLGFBQWEsRUFBRSxnQkFBZ0I7U0FDaEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILEdBQUc7UUFDRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUSxDQUFBO1FBRWxDLGNBQWM7UUFDZCxJQUFJLG9CQUFvQixHQUFHLEVBQUUsQ0FBQTtRQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFFbEYscUJBQXFCO1FBQ3JCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN0QixJQUFJLGNBQWMsR0FBWSxJQUFJLENBQUE7UUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixXQUFXLEdBQUcsTUFBTSxDQUFBO1lBQ3RCLENBQUM7WUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUc7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbEIsQ0FBQyxDQUFDLENBQUE7WUFDRixHQUFHLENBQUMsQ0FBQyxJQUFJLGlCQUFpQixJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELE1BQU0sQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ3pFLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3hDLENBQUM7WUFDRCxjQUFjLEdBQUcsS0FBSyxDQUFBO1FBQ3hCLENBQUM7UUFFRCxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLENBQUE7UUFFcEMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztDQUNGO0FBeEVELGtDQXdFQztBQUVVLFFBQUEsU0FBUyxHQUFHO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDekIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDWixFQUFFLEVBQUUsQ0FBQTtJQUNOLENBQUMsRUFDRCxDQUFDLEVBQUU7UUFDRCxFQUFFLEVBQUUsQ0FBQTtJQUNOLENBQUMsQ0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=