import { RetryPromise } from 'promise-exponential-retry';
import waitForExpect from 'wait-for-expect';
import { graphqlClient } from '../lib/graphql/graphqlClient';
import './mobx.config';

beforeAll(async () => {
  jest.setTimeout(15000);
  waitForExpect.defaults.timeout = 9000;
  await RetryPromise.retryPromise(
    'Checking Cardano GraphQL server is available',
    () => {
      return graphqlClient.request(
        `query {
            cardano {
              tip {
                number
              }
            }
          }
        `
      );
    },
    40
  );
}, 60000);
