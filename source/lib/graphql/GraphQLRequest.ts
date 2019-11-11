import { ApolloClient, ApolloError, ApolloQueryResult } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { action, computed, observable, runInAction } from 'mobx';

export class GraphQLRequest<TResult, TVariables> {
  @observable public result: ApolloQueryResult<TResult> | null = null;
  @observable public isExecuting: boolean = false;
  @observable public hasBeenExecutedAtLeastOnce: boolean = false;
  @observable public error: ApolloError | null = null;
  @observable public execution: Promise<
    ApolloQueryResult<TResult>
  > | null = null;

  @computed public get isExecutingTheFirstTime() {
    return this.isExecuting && !this.hasBeenExecutedAtLeastOnce;
  }

  private client: ApolloClient<any>;
  private query: DocumentNode;

  constructor(client: ApolloClient<any>, query: DocumentNode) {
    this.client = client;
    this.query = query;
  }

  @action public execute(
    variables: TVariables
  ): Promise<ApolloQueryResult<TResult>> {
    if (this.isExecuting) {
      throw new Error(
        `Request is already executing with: ${JSON.stringify(variables)}`
      );
    }
    this.isExecuting = true;
    this.execution = this.client.query<TResult, TVariables>({
      query: this.query,
      variables,
    });
    return this.execution
      .then(result => {
        runInAction(() => {
          this.result = result;
          this.error = null;
        });
        return result;
      })
      .catch(error => {
        runInAction(() => {
          this.result = null;
          this.error = error;
        });
        throw error;
      })
      .finally(
        action(() => {
          this.isExecuting = false;
          this.hasBeenExecutedAtLeastOnce = true;
        })
      );
  }
}
