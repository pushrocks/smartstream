export interface IErrorFunction {
    (err: any): number;
}
export declare class Smartstream {
    streamArray: any[];
    errorFunction: IErrorFunction;
    constructor(streamArrayArg: any[]);
    onError(errorFunctionArg: IErrorFunction): void;
    run(): any;
}
