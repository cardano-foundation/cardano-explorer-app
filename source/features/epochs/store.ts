import { computed, observable } from 'mobx';
// import { createActionBindings } from '../../lib/ActionBinding';
import Reaction from '../../lib/mobx/Reaction';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
import { EpochsApi } from './api';
import { epochOverviewTransformer } from './api/transformers';
import {
  // EpochsActions,
  INetworkInfoFeatureDependency,
} from './index';
import { IEpochOverview } from './types';

export class EpochsStore extends Store {
  @observable public latestEpochs: IEpochOverview[] = [];

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
    this.registerReactions([new Reaction(this.fetchLatestEpochs)]);
  }

  private fetchLatestEpochs = async () => {
    if (
      this.networkInfo.store.isFetching ||
      !this.networkInfo.store.currentEpoch ||
      (this.latestEpochs[0] &&
        this.latestEpochs[0].number === this.networkInfo.store.currentEpoch)
    ) {
      return;
    }
    const upper = this.networkInfo.store.currentEpoch;
    const lower = Math.max(0, upper - 5);
    const result = await this.epochsApi.getEpochsInRangeQuery.execute({
      lower,
      upper,
    });
    if (result) {
      this.latestEpochs = result.data.epochs
        .filter(isNotNull)
        .map(epochOverviewTransformer);
    }
  };

  @computed get isRefreshing() {
    return this.epochsApi.getEpochsInRangeQuery.isExecuting;
  }
}
