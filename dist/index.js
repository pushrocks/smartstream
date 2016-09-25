"use strict";
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
        this.errorFunction = null;
        this.customEventObjectArray = [];
        this.streamStartedDeferred = plugins.q.defer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaURBQWdEO0FBZWhEOztHQUVHO0FBQ0g7SUFNSTs7T0FFRztJQUNILFlBQVksY0FBcUI7UUFSekIsZ0JBQVcsR0FBRyxFQUFFLENBQUE7UUFDaEIsa0JBQWEsR0FBbUIsSUFBSSxDQUFBO1FBQ3BDLDJCQUFzQixHQUF5QixFQUFFLENBQUE7UUFDakQsMEJBQXFCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQU03QyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQTtJQUNyQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPLENBQUMsZ0JBQWdDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUE7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYTtRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFBO0lBQzdDLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWEsQ0FBQyxZQUFvQixFQUFFLGdCQUFzQztRQUN0RSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDO1lBQzdCLFNBQVMsRUFBRSxZQUFZO1lBQ3ZCLGFBQWEsRUFBRSxnQkFBZ0I7U0FDbEMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNILEdBQUc7UUFDQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUSxDQUFBO1FBRWxDLGNBQWM7UUFDZCxJQUFJLG9CQUFvQixHQUFHLEVBQUUsQ0FBQTtRQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUFDLENBQUM7UUFFbEYscUJBQXFCO1FBQ3JCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN0QixJQUFJLGNBQWMsR0FBWSxJQUFJLENBQUE7UUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixXQUFXLEdBQUcsTUFBTSxDQUFBO1lBQ3hCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMxQyxDQUFDO1lBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMzRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxQyxDQUFDO1lBQ0QsY0FBYyxHQUFHLEtBQUssQ0FBQTtRQUMxQixDQUFDO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRXBDLFdBQVcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNGLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNGLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7Q0FDSjtBQWhGRCxrQ0FnRkMifQ==