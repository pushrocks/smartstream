import * as plugins from './smartstream.plugins';

// interfaces
import { Transform } from 'stream';

export interface IErrorFunction {
  (err): any;
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
export class Smartstream {
  private streamArray = [];
  private customEventObjectArray: ICustomEventObject[] = [];
  private streamStartedDeferred = plugins.smartpromise.defer();

  /**
   * constructor
   */
  constructor(streamArrayArg: any[]) {
    this.streamArray = streamArrayArg;
  }

  /**
   * make something with the stream itself
   */
  streamStarted(): Promise<any> {
    return this.streamStartedDeferred.promise;
  }

  /**
   * attach listener to custom event
   */
  onCustomEvent(eventNameArg: string, eventFunctionArg: ICustomEventFunction) {
    this.customEventObjectArray.push({
      eventName: eventNameArg,
      eventFunction: eventFunctionArg
    });
  }

  /**
   * run the stream
   * @returns Promise
   */
  run(): Promise<void> {
    const done = plugins.smartpromise.defer<void>();

    // clone Array
    const streamExecutionArray = [];
    for (const streamItem of this.streamArray) {
      streamExecutionArray.push(streamItem);
    }

    // combine the stream
    let finalStream = null;
    let firstIteration: boolean = true;
    for (const stream of streamExecutionArray) {
      if (firstIteration === true) {
        finalStream = stream;
      }
      stream.on('error', err => {
        done.reject(err);
      });
      for (const customEventObject of this.customEventObjectArray) {
        stream.on(customEventObject.eventName, customEventObject.eventFunction);
      }
      if (!firstIteration) {
        finalStream = finalStream.pipe(stream);
      }
      firstIteration = false;
    }

    this.streamStartedDeferred.resolve();

    finalStream.on('end', () => {
      done.resolve();
    });
    finalStream.on('close', () => {
      done.resolve();
    });
    finalStream.on('finish', () => {
      done.resolve();
    });
    return done.promise;
  }
}

export let cleanPipe = () => {
  return plugins.through2.obj(
    (file, enc, cb) => {
      cb();
    },
    cb => {
      cb();
    }
  );
};
