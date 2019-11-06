import { action, computed, observable } from 'mobx';
import { BlockOverviewFragment } from '../../../generated/typings/graphql-schema';
// import { createActionBindings } from '../../lib/ActionBinding';
import Reaction from '../../lib/mobx/Reaction';
import { Store } from '../../lib/Store';
import { BlocksApi } from './api';
import { blockOverviewTransformer } from './api/transformers';
import {
  // BlocksActions,
  INetworkInfoFeatureDependency,
} from './index';
import { IBlockOverview } from './types';

export class BlocksStore extends Store {
  @observable public latestBlocks: IBlockOverview[] = [];

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
    this.registerReactions([new Reaction(this.fetchLatestBlocks)]);
  }

  private fetchLatestBlocks = async () => {
    if (
      this.networkInfo.store.isFetching ||
      !this.networkInfo.store.blockHeight ||
      (this.latestBlocks[0] &&
        this.latestBlocks[0].number === this.networkInfo.store.blockHeight)
    ) {
      return;
    }
    const upper = this.networkInfo.store.blockHeight;
    const lower = Math.max(0, upper - 9);
    const result = await this.blocksApi.getBlocksInRangeQuery.execute({
      lower,
      upper,
    });
    if (result) {
      const isBlock = (b: any): b is BlockOverviewFragment => b != null;
      this.latestBlocks = result.data.blocks
        .filter(isBlock)
        .map(blockOverviewTransformer);
    }
  };

  @computed get isRefreshing() {
    return this.blocksApi.getBlocksInRangeQuery.isExecuting;
  }
}
