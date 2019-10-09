import { computed } from 'mobx';
import { GetBlocksQuery } from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../utils/ActionBinding';
import { Store } from '../../utils/Store';
import { StakePoolsApi } from './api';
import DUMMY_DATA from './stakingStakePools.dummy.json';

export class StakePoolsStore extends Store {
  private readonly stakePoolsApi: StakePoolsApi;

  constructor(stakePoolsApi: StakePoolsApi) {
    super();
    this.stakePoolsApi = stakePoolsApi;
  }

  @computed get stakePoolsList() {
    return DUMMY_DATA;
  }

  // @computed.struct get stakePoolsedBlock(): GetBlocksQuery['blocks'][0] | null {
  //   const { result } = this.stakePoolsApi.getBlocksByIdsQuery;
  //   if (result) {
  //     return result.data.blocks[0];
  //   }
  //   return null;
  // }
}
