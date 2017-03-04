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
    plugins.through2.obj((file, enc, cb) => {
        cb();
    }, (cb) => {
        cb();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUFnRDtBQWVoRDs7R0FFRztBQUNIO0lBS0U7O09BRUc7SUFDSCxZQUFZLGNBQXFCO1FBUHpCLGdCQUFXLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLDJCQUFzQixHQUF5QixFQUFFLENBQUE7UUFDakQsMEJBQXFCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQU0vQyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQTtJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUE7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYSxDQUFDLFlBQW9CLEVBQUUsZ0JBQXNDO1FBQ3hFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUM7WUFDL0IsU0FBUyxFQUFFLFlBQVk7WUFDdkIsYUFBYSxFQUFFLGdCQUFnQjtTQUNoQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsR0FBRztRQUNELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFRLENBQUE7UUFFbEMsY0FBYztRQUNkLElBQUksb0JBQW9CLEdBQUcsRUFBRSxDQUFBO1FBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksVUFBVSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQUMsQ0FBQztRQUVsRixxQkFBcUI7UUFDckIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLElBQUksY0FBYyxHQUFZLElBQUksQ0FBQTtRQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDeEMsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLFdBQVcsR0FBRyxNQUFNLENBQUE7WUFDdEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRztnQkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNsQixDQUFDLENBQUMsQ0FBQTtZQUNGLEdBQUcsQ0FBQyxDQUFDLElBQUksaUJBQWlCLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDekUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDeEMsQ0FBQztZQUNELGNBQWMsR0FBRyxLQUFLLENBQUE7UUFDeEIsQ0FBQztRQUVELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUVwQyxXQUFXLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDRixXQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDRixXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0NBQ0Y7QUF4RUQsa0NBd0VDO0FBRVUsUUFBQSxTQUFTLEdBQUc7SUFDckIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2xCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ1osRUFBRSxFQUFFLENBQUE7SUFDTixDQUFDLEVBQ0QsQ0FBQyxFQUFFO1FBQ0QsRUFBRSxFQUFFLENBQUE7SUFDTixDQUFDLENBQ0YsQ0FBQTtBQUNILENBQUMsQ0FBQSJ9