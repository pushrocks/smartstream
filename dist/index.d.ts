/// <reference types="q" />
import * as plugins from './smartstream.plugins';
export interface IErrorFunction {
    (err: any): any;
}
export interface IStreamStartFunction {
    (stream: any): any;
}
export interface ICustomEventFunction {
    (): any;
}
export interface ICustomEventObject {
    eventName: string;
    eventFunction: ICustomEventFunction;
}
/**
 * class Smartstream handles
 */
export declare class Smartstream {
    streamArray: any[];
    errorFunction: IErrorFunction;
    streamStartFunction: IStreamStartFunction;
    customEventObjectArray: ICustomEventObject[];
    constructor(streamArrayArg: any[]);
    /**
     * attach an error handler to the stream to prevent throwing
     */
    onError(errorFunctionArg: IErrorFunction): void;
    /**
     * make something with the stream itself
     */
    onStreamStart(): plugins.q.Promise<any>;
    /**
     * run the stream
     * @returns Promise
     */
    run(): plugins.q.Promise<void>;
}
