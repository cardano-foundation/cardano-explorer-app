import {
  Maybe,
  StakePoolOverviewFragment,
} from '../../../../generated/typings/graphql-schema';
import { isDefined } from '../../../lib/types';
import { IStakePoolProps } from '../types';

type StakePoolOverview = StakePoolOverviewFragment;

export function transformStakePoolOverviews(
  stakePoolOverviews: Array<Maybe<StakePoolOverviewFragment>>
): IStakePoolProps[] {
  return stakePoolOverviews
    .filter(isDefined)
    .map((s: StakePoolOverview, index) => ({
      id: s.hash,
      profitMargin: s.margin,
      retiring: null,
      url: s.url,
      ranking: index,
    }));
}
