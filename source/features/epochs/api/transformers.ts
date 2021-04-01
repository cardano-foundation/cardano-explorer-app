import { Currency } from 'cardano-js';
import { EpochOverviewFragment } from '../../../../generated/typings/graphql-schema';
import { NetworkInfoStore } from '../../network-info/store';
import { IEpochOverview } from '../types';

export const epochOverviewTransformer = (
  e: EpochOverviewFragment,
  n: NetworkInfoStore
): IEpochOverview => {
  return {
    ...e,
    lastBlockAt: new Date(e.lastBlockTime),
    output: Currency.Util.lovelacesToAda(e.output),
    percentage:
      e.number === n.currentEpoch ? n.currentEpochPercentageComplete : 100,
    slotsCount:
      (e.blocks[0].protocolVersion.major > 1
        ? n.shelleyEpochLength
        : n.byronSlotsPerEpoch) || 21600,
    startedAt: new Date(e.startedAt),
  };
};
