import * as plugins from './smartstream.plugins'

export interface IErrorFunction {
    (err): number
}

export class Smartstream {
    streamArray = []
    errorFunction: IErrorFunction = null
    constructor(streamArrayArg: any[]){
        this.streamArray = streamArrayArg
    }
    onError(errorFunctionArg: IErrorFunction) {
        this.errorFunction = errorFunctionArg
    }
    run() {
        let combinedStream = plugins.streamCombiner2.obj(this.streamArray)
        if (this.errorFunction !== null) {
            combinedStream.on('error', this.errorFunction)
        }
        return combinedStream
    }
}