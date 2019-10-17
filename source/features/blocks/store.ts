import { computed } from 'mobx';
import { GetBlocksQuery } from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../utils/ActionBinding';
import { Store } from '../../utils/Store';
import { SearchActions } from './actions';
import { SearchApi } from './api';

export class SearchStore extends Store {
  private readonly searchApi: SearchApi;
  private readonly searchActions: SearchActions;

  constructor(searchActions: SearchActions, searchApi: SearchApi) {
    super();
    this.searchApi = searchApi;
    this.searchActions = searchActions;

    this.registerActions(
      createActionBindings([
        [this.searchActions.searchBlockById, this.searchBlockById],
      ])
    );
  }

  @computed.struct get searchedBlock(): GetBlocksQuery['blocks'][0] | null {
    const { result } = this.searchApi.getBlocksByIdsQuery;
    if (result) {
      return result.data.blocks[0];
    }
    return null;
  }

  private searchBlockById = ({ id }: { id: string }) => {
    this.searchApi.getBlocksByIdsQuery.execute({
      where: { id: { _in: [id] } },
    });
  };
}
