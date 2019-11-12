import { computed, observable, runInAction } from 'mobx';
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
  IBlocksFeatureDependency,
  // EpochsActions,
  INetworkInfoFeatureDependency,
} from './index';
import { IEpochOverview } from './types';

export class EpochsStore extends Store {
  // private readonly epochsActions: EpochsActions;
  private readonly blocks: IBlocksFeatureDependency;
  private readonly epochsApi: EpochsApi;
  private readonly networkInfo: INetworkInfoFeatureDependency;
  @observable private lastFetchedAtBlockHeight = 0;

  constructor(
    // epochsActions: EpochsActions,
    blocks: IBlocksFeatureDependency,
    epochsApi: EpochsApi,
    networkInfo: INetworkInfoFeatureDependency
  ) {
    super();
    Object.assign(this, {
      // epochsActions,
      blocks,
      epochsApi,
      networkInfo,
    });
    // this.registerActions(
    //   createActionBindings([
    //     [this.epochsActions.fetchLatestEpochs, this.fetchLatestEpochs],
    //   ])
    // );
    this.registerReactions(
      createReactions([
        this.fetchLatestEpochs,
        this.syncLatestEpochWithLatestBlockDate,
      ])
    );
  }

  @computed get isLoadingFirstTime() {
    const { getEpochsInRangeQuery } = this.epochsApi;
    return (
      !getEpochsInRangeQuery.hasBeenExecutedAtLeastOnce ||
      getEpochsInRangeQuery.isExecutingTheFirstTime
    );
  }

  @computed.struct get latestEpochs(): IEpochOverview[] {
    const { result } = this.epochsApi.getEpochsInRangeQuery;
    if (result) {
      return result.data.epochs.filter(isNotNull).map(epochOverviewTransformer);
    }
    return [];
  }

  private fetchLatestEpochs = () => {
    const { getEpochsInRangeQuery } = this.epochsApi;
    const { blockHeight, currentEpoch } = this.networkInfo.store;
    if (
      !currentEpoch ||
      getEpochsInRangeQuery.isExecuting ||
      this.networkInfo.store.isFetching ||
      this.lastFetchedAtBlockHeight === blockHeight
    ) {
      return;
    }
    const upper = currentEpoch;
    const lower = Math.max(0, upper - 4);
    getEpochsInRangeQuery.execute({
      lower,
      upper,
    });
    runInAction(() => {
      this.lastFetchedAtBlockHeight = blockHeight;
    });
  };

  private syncLatestEpochWithLatestBlockDate = () => {
    const latestBlock = this.blocks.store.latestBlocks[0];
    const currentEpoch = this.epochsApi.getEpochsInRangeQuery?.result?.data
      .epochs[0];
    if (!latestBlock || !currentEpoch) {
      return;
    }
    const lastBlockTime = latestBlock.createdAt;
    const currentEpochLastBlockTime = currentEpoch.lastBlockTime;
    if (lastBlockTime !== currentEpochLastBlockTime) {
      runInAction(() => {
        currentEpoch.lastBlockTime = lastBlockTime;
      });
    }
  };
}
