/// <reference types="q" />
/// <reference types="node" />
import * as plugins from './smartstream.plugins';
import { Transform } from 'stream';
export interface IErrorFunction {
    (err: any): any;
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
    private streamArray;
    private customEventObjectArray;
    private streamStartedDeferred;
    /**
     * constructor
     */
    constructor(streamArrayArg: any[]);
    /**
     * make something with the stream itself
     */
    streamStarted(): plugins.q.Promise<any>;
    /**
     * attach listener to custom event
     */
    onCustomEvent(eventNameArg: string, eventFunctionArg: ICustomEventFunction): void;
    /**
     * run the stream
     * @returns Promise
     */
    run(): plugins.q.Promise<void>;
}
export declare let cleanPipe: () => Transform;
