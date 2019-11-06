import { computed, observable } from 'mobx';
import { BlockOverviewFragment } from '../../../generated/typings/graphql-schema';
// import { createActionBindings } from '../../lib/ActionBinding';
import Reaction, { createReactions } from '../../lib/mobx/Reaction';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
import { blockOverviewTransformer } from '../blocks/api/transformers';
import { IBlockOverview } from '../blocks/types';
import { EpochsApi } from './api';
import { epochOverviewTransformer } from './api/transformers';
import {
  // EpochsActions,
  INetworkInfoFeatureDependency,
} from './index';
import { IEpochOverview } from './types';

export class EpochsStore extends Store {
  // private readonly epochsActions: EpochsActions;
  private readonly epochsApi: EpochsApi;
  private readonly networkInfo: INetworkInfoFeatureDependency;

  constructor(
    // epochsActions: EpochsActions,
    epochsApi: EpochsApi,
    networkInfo: INetworkInfoFeatureDependency
  ) {
    super();
    Object.assign(this, {
      // epochsActions,
      epochsApi,
      networkInfo,
    });
    // this.registerActions(
    //   createActionBindings([
    //     [this.epochsActions.fetchLatestEpochs, this.fetchLatestEpochs],
    //   ])
    // );
    this.registerReactions(createReactions([this.fetchLatestEpochs]));
  }

  @computed get latestEpochs(): IEpochOverview[] {
    const { result } = this.epochsApi.getEpochsInRangeQuery;
    if (result) {
      return result.data.epochs.filter(isNotNull).map(epochOverviewTransformer);
    }
    return [];
  }

  private fetchLatestEpochs = () => {
    if (
      this.networkInfo.store.isFetching ||
      !this.networkInfo.store.currentEpoch ||
      (this.latestEpochs[0] &&
        this.latestEpochs[0].number === this.networkInfo.store.currentEpoch)
    ) {
      return;
    }
    const upper = this.networkInfo.store.currentEpoch;
    const lower = Math.max(0, upper - 4);
    this.epochsApi.getEpochsInRangeQuery.execute({
      lower,
      upper,
    });
  };

  @computed get isRefreshing() {
    return this.epochsApi.getEpochsInRangeQuery.isExecuting;
  }
}
