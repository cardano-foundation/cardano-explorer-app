import {
  EpochDetailsFragment,
  EpochOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { isNotNull } from '../../../lib/types';
import { blockInfoTransformer } from '../../blocks/api/transformers';
import { IEpochDetails, IEpochOverview } from '../types';

export const epochOverviewTransformer = (
  e: EpochOverviewFragment
): IEpochOverview => {
  const {
    blocks_aggregate: { aggregate },
  } = e;
  return {
    blocksCount: aggregate && aggregate.count ? aggregate.count : 0,
    endedAt: new Date(e.lastBlockTime), // TODO: Refactor to lastBlockAt (or change the logic here to determine if it has ended
    number: e.number,
    output: e.output,
    slotsCount: 21600, // TODO: Move this to global store, as it's determined by the blockchain configuration
    startedAt: new Date(e.startedAt),
    status: '',
    transactionsCount: e.transactionsCount || '0',
  };
};

export const epochDetailsTransformer = (
  e: EpochDetailsFragment
): IEpochDetails => ({
  ...epochOverviewTransformer(e),
  blocks: e.blocks ? e.blocks.filter(isNotNull).map(blockInfoTransformer) : [],
});
