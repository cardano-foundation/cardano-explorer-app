export class AbortablePromise<TResult, TError> implements Promise<TResult> {
  public static ABORT_ERROR = 'AbortError';

  public readonly [Symbol.toStringTag]: string;
  private isPending = true;
  private promise: Promise<TResult>;
  private resolve: (result: TResult) => void;
  private reject: (error: any) => void;

  constructor(promise: Promise<TResult>) {
    this.promise = new Promise<TResult>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      promise
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.isPending = false;
        });
    });
  }

  public then<TResult1 = TResult, TResult2 = never>(
    onfulfilled?:
      | ((value: TResult) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }

  public catch<TCaught = never>(
    onrejected?:
      | ((reason: TError) => TCaught | PromiseLike<TCaught>)
      | undefined
      | null
  ): Promise<TResult | TCaught> {
    return this.promise.catch(onrejected);
  }

  public finally(handler: () => void) {
    return this.promise.finally(handler);
  }

  public abort() {
    this.reject(AbortablePromise.ABORT_ERROR);
  }

  public get isExecuting() {
    return this.isPending;
  }

  public get isDone() {
    return !this.isPending;
  }
}
