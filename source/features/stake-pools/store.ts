import { computed, observable } from 'mobx';
import storage from 'store';
import { GetBlocksQuery } from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../utils/ActionBinding';
import { Store } from '../../utils/Store';
import { StakePoolsApi } from './api';
import { StakePoolsActions } from './actions';
import DUMMY_DATA from './stakingStakePools.dummy.json';
import { UNMODERATED_WARNING } from './constants';

export class StakePoolsStore extends Store {
  private readonly stakePoolsApi: StakePoolsApi;
  private readonly stakePoolsActions: StakePoolsActions;

  constructor(
    stakePoolsActions: StakePoolsActions,
    stakePoolsApi: StakePoolsApi
  ) {
    super();
    this.stakePoolsApi = stakePoolsApi;
    this.stakePoolsActions = stakePoolsActions;

    this.registerActions(
      createActionBindings([
        [
          this.stakePoolsActions.handleAcceptUnmoderatedData,
          this.handleAcceptUnmoderatedData,
        ],
      ])
    );
  }

  @observable showUnmoderatedData: boolean =
    storage.get(UNMODERATED_WARNING) || false;

  @computed get stakePoolsList() {
    return DUMMY_DATA;
  }

  private handleAcceptUnmoderatedData = () => {
    storage.set(UNMODERATED_WARNING, true);
    this.showUnmoderatedData = true;
  };
}
