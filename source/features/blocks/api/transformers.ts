import {
  BlockDetailsFragment,
  BlockInfoFragment,
  BlockOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { IBlockDetailed, IBlockInfo, IBlockOverview } from '../types';

export const blockInfoTransformer = (b: BlockInfoFragment): IBlockInfo => ({
  id: b.id ? b.id : '',
  number: b.number ? b.number : 0,
  size: b.size,
});

export const blockOverviewTransformer = (
  b: BlockOverviewFragment
): IBlockOverview => ({
  ...blockInfoTransformer(b),
  createdAt: 1568366883000, // TODO: missing API data
  createdBy: 'af2800c', // TODO: missing API data
  epoch: b.epoch ? b.epoch.number : 0,
  output: 11189.647356, // TODO: missing API data
  transactions: b.transactions ? b.transactions.length : 0,
});

export const blockDetailsTransformer = (
  b: BlockDetailsFragment
): IBlockDetailed => ({
  ...blockOverviewTransformer(b),
  confirmations: 1, // TODO: not sure how confirmations are calculated
  merkleRoot: b.merkelRootHash ? b.merkelRootHash : 0,
  nextBlock: '', // TODO: missing API data
  prevBlock: b.previousBlock ? b.previousBlock.id : 0,
});
