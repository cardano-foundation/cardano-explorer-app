import { ApolloClient, ApolloError, ApolloQueryResult } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { observable } from 'mobx';

export class GraphQLRequest<TResult, TVariables> {
  @observable public result: ApolloQueryResult<TResult> | null = null;
  @observable public isExecuting: boolean = false;
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
    try {
      this.isExecuting = true;
      this.execution = this.client.query<TResult, TVariables>({
        query: this.query,
        variables,
      });
      this.result = await this.execution;
      this.error = null;
      return this.result;
    } catch (error) {
      this.result = null;
      this.error = error;
      throw error;
    } finally {
      this.isExecuting = false;
    }
  }
}
