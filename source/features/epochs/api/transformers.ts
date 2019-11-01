import { EpochDetailsFragment } from '../../../../generated/typings/graphql-schema';
import { IEpochDetails } from '../types';

export const epochDetailsTransformer = (
  e: EpochDetailsFragment
): IEpochDetails => ({
  blocksCount: 0, // TODO: aggregate missing in API
  endedAt: new Date(e.lastBlockTime), // TODO: If lastBlockTime is within slotDuration from now, we can assume the epoch is still in progress
  number: e.number,
  output: parseInt(e.output, 10),
  slotsCount: 0, // TODO: aggregate missing in API
  startedAt: new Date(e.startedAt),
  status: '',
  transactionsCount: parseInt(e.transactionsCount || '0', 10),
});
