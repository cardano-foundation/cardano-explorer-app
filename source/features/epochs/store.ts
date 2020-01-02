import isNumber from 'lodash/isNumber';
import { action, computed, observable, runInAction } from 'mobx';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { GraphQLRequestVariables } from '../../lib/graphql/GraphQLRequest';
import Reaction, { createReactions } from '../../lib/mobx/Reaction';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
import { EpochsApi } from './api';
import { epochOverviewTransformer } from './api/transformers';
import {
  EpochsActions,
  IBlocksFeatureDependency,
  INetworkInfoFeatureDependency,
} from './index';
import { IEpochOverview } from './types';

export class EpochsStore extends Store {
  @observable public latestEpochs: IEpochOverview[] = [];
  @observable public browsedEpochs: IEpochOverview[] = [];

  private readonly epochsActions: EpochsActions;
  private readonly blocks: IBlocksFeatureDependency;
  private readonly epochsApi: EpochsApi;
  private readonly networkInfo: INetworkInfoFeatureDependency;
  private readonly latestEpochsReactions: Reaction[];
  @observable private lastFetchedAtBlockHeight = 0;

  constructor(
    epochsActions: EpochsActions,
    blocks: IBlocksFeatureDependency,
    epochsApi: EpochsApi,
    networkInfo: INetworkInfoFeatureDependency
  ) {
    super();
    Object.assign(this, {
      blocks,
      epochsActions,
      epochsApi,
      networkInfo,
    });
    this.registerActions(
      createActionBindings([
        [this.epochsActions.browseEpochs, this.browseEpochs],
        [this.epochsActions.fetchLatestEpochs, this.fetchLatestEpochs],
        [
          this.epochsActions.startPollingLatestEpochs,
          this.startPollingLatestEpochs,
        ],
        [
          this.epochsActions.stopPollingLatestEpochs,
          this.stopPollingLatestEpochs,
        ],
      ])
    );
    this.latestEpochsReactions = createReactions([
      this.fetchLatestEpochsOnBlockHeightChange,
      this.syncLatestEpochWithLatestBlockDate,
    ]);
  }

  // ============ COMPUTED GETTERS =============

  @computed get isLoadingLatestEpochsFirstTime() {
    const { getEpochsInRangeQuery } = this.epochsApi;
    return (
      !getEpochsInRangeQuery.hasBeenExecutedAtLeastOnce ||
      getEpochsInRangeQuery.isExecutingTheFirstTime
    );
  }

  // ============= ACTION HANDLERS =============

  /**
   * Fetches the latest 10 blocks.
   */
  @action public fetchLatestEpochs = async (): Promise<void> => {
    const { currentEpoch } = this.networkInfo.store;
    const upper = currentEpoch;
    const lower = Math.max(0, upper - 4);
    const result = await this.fetchEpochsInRange({ lower, upper });
    if (result) {
      runInAction(() => {
        this.latestEpochs = result;
      });
    }
  };

  /**
   * Fetches the epochs in given range.
   */
  @action public browseEpochs = async (
    params: ActionProps<typeof EpochsActions.prototype.browseEpochs>
  ): Promise<void> => {
    const upper = params.page * params.perPage;
    const result = await this.fetchEpochsInRange({
      lower: upper - params.perPage,
      upper,
    });
    if (result) {
      runInAction(() => {
        this.browsedEpochs = result;
      });
    }
  };

  @action public startPollingLatestEpochs = () => {
    this.startReactions(this.latestEpochsReactions);
  };

  @action public stopPollingLatestEpochs = () => {
    this.stopReactions(this.latestEpochsReactions);
  };

  @action protected transformBrowsedEpochsResult = ():
    | IEpochOverview[]
    | null => {
    const { result } = this.epochsApi.getEpochsInRangeQuery;
    return (
      result?.epochs
        .filter(isNotNull)
        .map(e => epochOverviewTransformer(e, this.networkInfo.store)) ?? null
    );
  };

  // ============= REACTIONS =============

  private fetchLatestEpochsOnBlockHeightChange = () => {
    const { getEpochsInRangeQuery } = this.epochsApi;
    const { blockHeight, currentEpoch, isFetching } = this.networkInfo.store;
    if (
      !isNumber(currentEpoch) ||
      getEpochsInRangeQuery.isExecuting ||
      isFetching ||
      this.lastFetchedAtBlockHeight === blockHeight
    ) {
      return;
    }
    runInAction(() => {
      this.lastFetchedAtBlockHeight = blockHeight;
    });
    this.epochsActions.fetchLatestEpochs.trigger();
  };

  private syncLatestEpochWithLatestBlockDate = () => {
    const { latestBlocks } = this.blocks.store;
    const latestBlock = latestBlocks.length > 0 ? latestBlocks[0] : null;
    const epochs = this.epochsApi.getEpochsInRangeQuery.result?.epochs;
    const currentEpoch = epochs && epochs?.length > 0 ? epochs[0] : null;
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

  // ============ HELPERS =============

  /**
   * Fetches blocks in given range and returns the result.
   */
  private fetchEpochsInRange = async (
    params: GraphQLRequestVariables<
      typeof EpochsApi.prototype.getEpochsInRangeQuery
    >
  ): Promise<IEpochOverview[] | null> => {
    const { getEpochsInRangeQuery } = this.epochsApi;
    // Wait for potential current execution (only supports one queued query)
    if (getEpochsInRangeQuery.isExecuting) {
      return null;
    }
    await getEpochsInRangeQuery.execute(params);
    return this.transformBrowsedEpochsResult();
  };
}
