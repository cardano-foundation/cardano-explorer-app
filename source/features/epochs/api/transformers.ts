import { Currency } from 'cardano-js';
import {
  EpochDetailsFragment,
  EpochOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { isNotNull } from '../../../lib/types';
import { blockOverviewTransformer } from '../../blocks/api/transformers';
import { NetworkInfoStore } from '../../network-info/store';
import { IEpochDetails, IEpochOverview } from '../types';

export const epochOverviewTransformer = (
  e: EpochOverviewFragment,
  n: NetworkInfoStore
): IEpochOverview => {
  return {
    ...e,
    blocksCount: e.blocks_aggregate?.aggregate?.count || '0',
    lastBlockAt: new Date(e.lastBlockTime),
    output: Currency.Util.lovelacesToAda(e.output),
    percentage:
      e.number === n.currentEpoch ? n.currentEpochPercentageComplete : 100,
    slotsCount: n.slotsPerEpoch,
    startedAt: new Date(e.startedAt),
  };
};

export const epochDetailsTransformer = (
  e: EpochDetailsFragment,
  n: NetworkInfoStore
): IEpochDetails => ({
  ...epochOverviewTransformer(e, n),
  blocks: e.blocks?.filter(isNotNull).map(blockOverviewTransformer),
});
