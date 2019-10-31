import {
  BlockDetailsFragment,
  BlockOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { IBlockDetailed } from '../types';

export const blockOverviewTransformer = (b: BlockOverviewFragment) => ({
  createdAt: 1568366883000, // TODO: missing API data
  createdBy: 'af2800c', // TODO: missing API data
  epoch: b.epoch ? b.epoch.number : 0,
  number: b.number ? b.number : 0,
  output: 11189.647356, // TODO: missing API data
  size: b.size,
  transactions: b.transactions ? b.transactions.length : 0,
});

export const blockDetailsTransformer = (
  b: BlockDetailsFragment
): IBlockDetailed => ({
  ...blockOverviewTransformer(b),
  confirmations: Math.random(), // TODO: not sure how confirmations are calculated
  id: b.id ? b.id : 0,
  merkleRoot: b.merkelRootHash ? b.merkelRootHash : 0,
  nextBlock: '', // TODO: missing API data
  prevBlock: b.previousBlock ? b.previousBlock.id : 0,
});
