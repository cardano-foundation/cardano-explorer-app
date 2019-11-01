import {
  EpochDetailsFragment,
  EpochOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { isNotNull } from '../../../lib/types';
import { blockInfoTransformer } from '../../blocks/api/transformers';
import { IEpochDetails, IEpochOverview } from '../types';

export const epochOverviewTransformer = (
  e: EpochOverviewFragment
): IEpochOverview => ({
  blocksCount: 0, // TODO: aggregate missing in API
  endedAt: new Date(e.endedAt),
  number: e.number,
  output: parseInt(e.output, 10),
  slotsCount: 0, // TODO: aggregate missing in API
  startedAt: new Date(e.startedAt),
  status: '',
  transactionsCount: parseInt(e.transactionsCount || '0', 10),
});

export const epochDetailsTransformer = (
  e: EpochDetailsFragment
): IEpochDetails => ({
  ...epochOverviewTransformer(e),
  blocks: e.blocks ? e.blocks.filter(isNotNull).map(blockInfoTransformer) : [],
});
