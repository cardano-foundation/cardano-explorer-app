import { ApolloClient, ApolloQueryResult } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { observable } from 'mobx';

export class GraphQLRequest<TResult, TVariables> {
  @observable public result: ApolloQueryResult<TResult> | null = null;
  @observable public error: Error | null = null;

  private client: ApolloClient<any>;
  private query: DocumentNode;

  constructor(client: ApolloClient<any>, query: DocumentNode) {
    this.client = client;
    this.query = query;
  }

  public async execute(
    variables: TVariables
  ): Promise<ApolloQueryResult<TResult> | null> {
    try {
      this.result = await this.client.query<TResult, TVariables>({
        query: this.query,
        variables,
      });
      return this.result;
    } catch (error) {
      this.result = null;
      this.error = error;
      return null;
    }
  }
}
