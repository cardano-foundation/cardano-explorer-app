import { get } from 'lodash';
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
  return {
    blocksCount: get(e, 'blocks_aggregate.aggregate.count', 0),
    endedAt: new Date(e.lastBlockTime), // TODO: Refactor to lastBlockAt (or change the logic here to determine if it has ended
    number: e.number,
    output: e.output,
    slotsCount: 21600, // TODO: Move this to global store, as it's determined by the blockchain configuration
    startedAt: new Date(e.startedAt),
    status: '',
    transactionsCount: get(e, 'transactionsCount', '0'),
  };
};

export const epochDetailsTransformer = (
  e: EpochDetailsFragment
): IEpochDetails => ({
  ...epochOverviewTransformer(e),
  blocks: get(e, 'blocks', [])
    .filter(isNotNull)
    .map(blockInfoTransformer),
});
