// @flow
import { action, computed, isObservableArray, observable } from 'mobx';

export default class StatefulRequest<Args, Result, Error> {
  @observable public result: Result | null = null;
  @observable public error: Error | null = null;
  @observable public isExecuting: boolean = false;
  @observable public isError: boolean = false;
  @observable public wasExecuted: boolean = false;

  public promise: Promise<Result> | null = null;

  private method: (args: Args) => Promise<Result>;

  constructor(method: (args: Args) => Promise<Result>) {
    this.method = method;
  }

  public execute(args: Args): StatefulRequest<Args, Result, Error> {
    if (this.isExecuting) {
      // Do not execute a request again while it is still running
      return this;
    }

    if (!this.method) {
      throw new ReferenceError('Request method not defined');
    }

    this.promise = new Promise((resolve, reject) => {
      this.method(args)
        .then((result) => {
          setTimeout(
            action('StatefulRequest::execute/then', () => {
              if (
                this.result != null &&
                isObservableArray(this.result) &&
                Array.isArray(result)
              ) {
                // $FlowFixMe
                this.result.replace(result);
              } else {
                this.result = result;
              }
              this.isExecuting = false;
              this.wasExecuted = true;
              resolve(result);
            }),
            1
          );
          return result;
        })
        .catch(
          action('StatefulRequest::execute/catch', (error: Error) => {
            this.error = error;
            this.isExecuting = false;
            this.isError = true;
            this.wasExecuted = true;
            reject(error);
          })
        );
    });

    this.isExecuting = true;
    return this;
  }

  @computed get isExecutingFirstTime(): boolean {
    return !this.wasExecuted && this.isExecuting;
  }

  public then(...args: Array<any>): Promise<Result> {
    if (!this.promise) {
      throw new Error('Request has not been executed yet');
    }
    return this.promise.then(...args);
  }

  public catch(...args: Array<any>): Promise<any> {
    if (!this.promise) {
      throw new Error('Request has not been executed yet');
    }
    return this.promise.catch(...args);
  }

  @action('StatefulRequest::reset') public reset(): StatefulRequest<
    Args,
    Result,
    Error
  > {
    this.result = null;
    this.error = null;
    this.isError = false;
    this.isExecuting = false;
    this.wasExecuted = false;
    return this;
  }
}
