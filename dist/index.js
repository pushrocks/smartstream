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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaURBQWdEO0FBZWhEOztHQUVHO0FBQ0g7SUFLSTs7T0FFRztJQUNILFlBQVksY0FBcUI7UUFQekIsZ0JBQVcsR0FBRyxFQUFFLENBQUE7UUFDaEIsMkJBQXNCLEdBQXlCLEVBQUUsQ0FBQTtRQUNqRCwwQkFBcUIsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBTTdDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFBO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWE7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQTtJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhLENBQUMsWUFBb0IsRUFBRSxnQkFBc0M7UUFDdEUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQztZQUM3QixTQUFTLEVBQUUsWUFBWTtZQUN2QixhQUFhLEVBQUUsZ0JBQWdCO1NBQ2xDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDSCxHQUFHO1FBQ0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQVEsQ0FBQTtRQUVsQyxjQUFjO1FBQ2QsSUFBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUE7UUFDN0IsR0FBRyxDQUFDLENBQUMsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFBQyxDQUFDO1FBRWxGLHFCQUFxQjtRQUNyQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUE7UUFDdEIsSUFBSSxjQUFjLEdBQVksSUFBSSxDQUFBO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsV0FBVyxHQUFHLE1BQU0sQ0FBQTtZQUN4QixDQUFDO1lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHO2dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsR0FBRyxDQUFDLENBQUMsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMzRSxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxQyxDQUFDO1lBQ0QsY0FBYyxHQUFHLEtBQUssQ0FBQTtRQUMxQixDQUFDO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFBO1FBRXBDLFdBQVcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNGLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNGLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7Q0FDSjtBQXhFRCxrQ0F3RUMifQ==