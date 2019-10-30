import { action, observable } from 'mobx';
import { BlockOverviewFragment } from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { BlocksApi } from './api';
import { blockOverviewTransformer } from './api/transformers';
import { BlocksActions } from './index';
import { IBlockOverview } from './types';

export class BlocksStore extends Store {
  @observable public latestBlocks: IBlockOverview[] = [];

  private readonly blocksActions: BlocksActions;
  private readonly blocksApi: BlocksApi;

  constructor(blocksActions: BlocksActions, blocksApi: BlocksApi) {
    super();
    this.blocksActions = blocksActions;
    this.blocksApi = blocksApi;

    this.registerActions(
      createActionBindings([
        [this.blocksActions.fetchLatestBlocks, this.fetchLatestBlocks],
      ])
    );
  }

  @action private fetchLatestBlocks = async () => {
    const result = await this.blocksApi.getLatestBlocksQuery.execute({
      limit: 10,
    });
    if (result) {
      const isBlock = (b: any): b is BlockOverviewFragment => b != null;
      this.latestBlocks = result.data.blocks
        .filter(isBlock)
        .map(blockOverviewTransformer);
    }
  };
}
