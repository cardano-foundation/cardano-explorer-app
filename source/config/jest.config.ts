import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RetryPromise } from 'promise-exponential-retry';
import waitForExpect from 'wait-for-expect';
import { graphqlClient } from '../lib/graphql/graphqlClient';
import './mobx.config';

configure({ adapter: new Adapter() });

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
