import waitForExpect from 'wait-for-expect';

beforeAll(() => {
  jest.setTimeout(15000);
  waitForExpect.defaults.timeout = 9000;
});
