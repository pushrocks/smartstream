import * as plugins from './smartstream.plugins'

export interface IErrorFunction {
    (err): any
}

export interface IStreamStartFunction {
    (stream): any
}

export interface ICustomEventFunction {
    (): any
}

export interface ICustomEventObject {
    eventName: string
    eventFunction: ICustomEventFunction
}

/**
 * class Smartstream handles 
 */
export class Smartstream {
    streamArray = []
    errorFunction: IErrorFunction = null
    streamStartFunction: IStreamStartFunction = null
    customEventObjectArray: ICustomEventObject[] = []
    constructor(streamArrayArg: any[]) {
        this.streamArray = streamArrayArg
    }

    /**
     * attach an error handler to the stream to prevent throwing
     */
    onError(errorFunctionArg: IErrorFunction) {
        this.errorFunction = errorFunctionArg
    }

    /**
     * make something with the stream itself
     */
    onStreamStart(): plugins.q.Promise<any> {

    }

    /**
     * run the stream
     * @returns Promise
     */
    run(): plugins.q.Promise<void> {
        let done = plugins.q.defer<void>()

        // clone Array
        let streamExecutionArray = []
        for (let streamItem of this.streamArray) { streamExecutionArray.push(streamItem) }

        // combine the stream
        let finalStream = null
        let firstIteration: boolean = true
        for (let stream of streamExecutionArray) {
            if (firstIteration === true) {
                finalStream = stream
            }
            if (this.errorFunction !== null) {
                stream.on('error', this.errorFunction)
            }
            for (let customEventObject of this.customEventObjectArray) {
                stream.on(customEventObject.eventName, customEventObject.eventFunction)
            }
            if (!firstIteration) {
                finalStream = finalStream.pipe(stream)
            }
            firstIteration = false
        }
        finalStream.on('end',function(){
            done.resolve()
        })
        finalStream.on('close',function(){
            done.resolve()
        })
        finalStream.on('finish',function(){
            done.resolve()
        })
        return done.promise
    }
}