/// <reference types="node" />
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
    streamStarted(): Promise<any>;
    /**
     * attach listener to custom event
     */
    onCustomEvent(eventNameArg: string, eventFunctionArg: ICustomEventFunction): void;
    /**
     * run the stream
     * @returns Promise
     */
    run(): Promise<void>;
}
export declare let cleanPipe: () => Transform;
