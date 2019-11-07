import { action, computed, observable } from 'mobx';
import { BlockOverviewFragment } from '../../../generated/typings/graphql-schema';
// import { createActionBindings } from '../../lib/ActionBinding';
import Reaction, { createReactions } from '../../lib/mobx/Reaction';
import { Store } from '../../lib/Store';
import { BlocksApi } from './api';
import { blockOverviewTransformer } from './api/transformers';
import {
  // BlocksActions,
  INetworkInfoFeatureDependency,
} from './index';
import { IBlockOverview } from './types';

export class BlocksStore extends Store {
  // private readonly blocksActions: BlocksActions;
  private readonly blocksApi: BlocksApi;
  private readonly networkInfo: INetworkInfoFeatureDependency;

  constructor(
    // blocksActions: BlocksActions,
    blocksApi: BlocksApi,
    networkInfo: INetworkInfoFeatureDependency
  ) {
    super();
    // this.blocksActions = blocksActions;
    Object.assign(this, {
      // epochsActions,
      blocksApi,
      networkInfo,
    });

    // this.registerActions(
    //   createActionBindings([
    //     [this.blocksActions.fetchLatestBlocks, this.fetchLatestBlocks],
    //   ])
    // );
    this.registerReactions(createReactions([this.fetchLatestBlocks]));
  }

  @computed get isLoadingFirstTime() {
    const { getBlocksInRangeQuery } = this.blocksApi;
    return (
      !getBlocksInRangeQuery.hasBeenExecutedAtLeastOnce ||
      getBlocksInRangeQuery.isExecutingTheFirstTime
    );
  }

  @computed get latestBlocks(): IBlockOverview[] {
    const { result } = this.blocksApi.getBlocksInRangeQuery;
    if (result) {
      const isBlock = (b: any): b is BlockOverviewFragment => b != null;
      return result.data.blocks.filter(isBlock).map(blockOverviewTransformer);
    }
    return [];
  }

  // ============ REACTIONS =============

  private fetchLatestBlocks = () => {
    if (
      this.blocksApi.getBlocksInRangeQuery.isExecuting ||
      this.networkInfo.store.isFetching ||
      !this.networkInfo.store.blockHeight ||
      (this.latestBlocks.length > 0 &&
        this.latestBlocks[0] &&
        this.latestBlocks[0].number === this.networkInfo.store.blockHeight)
    ) {
      return;
    }
    const upper = this.networkInfo.store.blockHeight;
    const lower = Math.max(0, upper - 9);
    this.blocksApi.getBlocksInRangeQuery.execute({
      lower,
      upper,
    });
  };
}
