import { action, observable } from 'mobx';
import { BlockOverviewFragment } from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { BlocksActions } from './actions';
import { BlocksApi } from './api';
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
      limit: 5,
    });
    if (result) {
      const isBlock = (b: any): b is BlockOverviewFragment => b != null;
      // Prepare API data for UI
      this.latestBlocks = result.data.blocks.filter(isBlock).map(b => ({
        createdAt: 1568366883000, // TODO: missing API data
        createdBy: 'af2800c', // TODO: missing API data
        epoch: b.epoch ? b.epoch.number : 0,
        number: b.number ? b.number : 0,
        output: 11189.647356, // TODO: missing API data
        size: b.size,
        transactions: b.transactions ? b.transactions.length : 0,
      }));
    }
  };
}
