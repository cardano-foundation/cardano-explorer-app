import { BlockOverviewFragment } from '../../../../generated/typings/graphql-schema';

export const blockOverviewTransformer = (b: BlockOverviewFragment) => ({
  createdAt: 1568366883000, // TODO: missing API data
  createdBy: 'af2800c', // TODO: missing API data
  epoch: b.epoch ? b.epoch.number : 0,
  number: b.number ? b.number : 0,
  output: 11189.647356, // TODO: missing API data
  size: b.size,
  transactions: b.transactions ? b.transactions.length : 0,
});
