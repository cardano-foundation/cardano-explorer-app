import { ApolloClient } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { action, observable, runInAction } from 'mobx';

type ResultTransform<TResult> = (
  current: TResult | null,
  next: TResult
) => Promise<TResult | void>;

export class GraphQLSubscription<TResult, TVariables> {
  @observable public isActive: boolean = false;
  @observable public isError: boolean = false;
  @observable public result: TResult | null = null;
  @observable public error: any | null = null;

  private client: ApolloClient<any>;
  private query: DocumentNode;
  private subscription: ZenObservable.Subscription | null = null;
  private readonly transform: ResultTransform<TResult>;

  constructor(
    client: ApolloClient<any>,
    query: DocumentNode,
    transform?: ResultTransform<TResult>
  ) {
    this.client = client;
    this.query = query;
    this.transform = transform || this.defaultTransform;
  }

  @action public start(variables: TVariables): void {
    this.subscription = this.client
      .subscribe<{ data: TResult }, TVariables>({
        query: this.query,
        variables,
      })
      .subscribe(this.updateResult, this.handleError);
    this.isActive = true;
  }

  @action public stop(): void {
    if (this.isActive && this.subscription) {
      this.subscription.unsubscribe();
      this.result = null;
      this.isActive = false;
    }
  }

  private updateResult = async (nextResult: { data: TResult }) => {
    this.isError = false;
    const transformedResult = await this.transform(
      this.result,
      nextResult.data
    );
    if (transformedResult !== undefined) {
      runInAction('updateResult', () => {
        this.result = transformedResult;
      });
    }
  };

  @action private handleError = (error: any) => {
    this.error = error;
    this.isError = true;
  };

  private defaultTransform = (current: TResult | null, r: TResult) =>
    Promise.resolve(r);
}
