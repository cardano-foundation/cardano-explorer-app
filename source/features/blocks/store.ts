import { computed } from 'mobx';
import {
  Block,
  GetBlocksQuery,
} from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../utils/ActionBinding';
import { Store } from '../../utils/Store';
import { BlocksActions } from './actions';
import { BlocksApi } from './api';

export class BlocksStore extends Store {
  private readonly blocksApi: BlocksApi;
  private readonly blocksActions: BlocksActions;

  constructor(blocksActions: BlocksActions, blocksApi: BlocksApi) {
    super();
    this.blocksApi = blocksApi;
    this.blocksActions = blocksActions;

    this.registerActions(
      createActionBindings([
        [this.blocksActions.searchBlockById, this.searchBlockById],
      ])
    );
  }

  @computed.struct get searchedBlock(): GetBlocksQuery['blocks'][0] | null {
    const { result } = this.blocksApi.getBlocksByIdsQuery;
    if (result) {
      return result.data.blocks[0];
    }
    return null;
  }

  private searchBlockById = ({ id }: { id: string }) => {
    this.blocksApi.getBlocksByIdsQuery.execute({
      ids: [id],
    });
  };
}
