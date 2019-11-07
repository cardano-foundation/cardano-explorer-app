import {
  EpochDetailsFragment,
  EpochOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { isNotNull } from '../../../lib/types';
import { lovelacesToAda } from '../../../lib/unit-converters';
import { blockInfoTransformer } from '../../blocks/api/transformers';
import { IEpochDetails, IEpochOverview } from '../types';

export const epochOverviewTransformer = (
  e: EpochOverviewFragment
): IEpochOverview => {
  return {
    blocksCount:
      (e.blocks_aggregate &&
        e.blocks_aggregate.aggregate &&
        e.blocks_aggregate.aggregate.count) ||
      0,
    endedAt: new Date(e.lastBlockTime), // TODO: Refactor to lastBlockAt (or change the logic here to determine if it has ended
    number: e.number,
    output: lovelacesToAda(parseInt(e.output, 10)).toString() || '',
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
  blocks:
    (e.blocks && e.blocks.filter(isNotNull).map(blockInfoTransformer)) || [],
});
