import { ApolloClient, ApolloError, ApolloQueryResult } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { observable, runInAction } from 'mobx';

export class GraphQLRequest<TResult, TVariables> {
  @observable public result: ApolloQueryResult<TResult> | null = null;
  @observable public isExecuting: boolean = false;
  @observable public hasBeenExecutedAtLeastOnce: boolean = false;
  @observable public error: ApolloError | null = null;
  @observable public execution: Promise<
    ApolloQueryResult<TResult>
  > | null = null;

  private client: ApolloClient<any>;
  private query: DocumentNode;

  constructor(client: ApolloClient<any>, query: DocumentNode) {
    this.client = client;
    this.query = query;
  }

  public async execute(
    variables: TVariables
  ): Promise<ApolloQueryResult<TResult>> {
    if (this.isExecuting) {
      throw new Error(
        `Request is already executing with: ${JSON.stringify(variables)}`
      );
    }
    try {
      this.isExecuting = true;
      this.execution = this.client.query<TResult, TVariables>({
        query: this.query,
        variables,
      });
      this.result = await this.execution;
      runInAction(() => {
        this.error = null;
      });
      return this.result;
    } catch (error) {
      runInAction(() => {
        this.result = null;
        this.error = error;
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isExecuting = false;
        this.hasBeenExecutedAtLeastOnce = true;
      });
    }
  }
}
