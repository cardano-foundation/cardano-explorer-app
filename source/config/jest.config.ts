import gql from 'graphql-tag';
import { RetryPromise } from 'promise-exponential-retry';
import waitForExpect from 'wait-for-expect';
import { apolloClient } from '../lib/graphql/apolloClient';

beforeAll(async () => {
  jest.setTimeout(30000);
  waitForExpect.defaults.timeout = 9000;
  await RetryPromise.retryPromise(
    'Checking Cardano GraphQL server is available',
    () => {
      return apolloClient.query({
        query: gql`
          query {
            cardano {
              blockHeight
            }
          }
        `,
      });
    },
    40
  );
});
