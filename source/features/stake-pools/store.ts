import { computed, observable } from 'mobx';
import storage from 'store';
import { GetBlocksQuery } from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../utils/ActionBinding';
import { Store } from '../../utils/Store';
import { StakePoolsApi } from './api';
import { StakePoolsActions } from './actions';
import DUMMY_DATA from './stakingStakePools.dummy.json';
import {
  UNMODERATED_WARNING_STORAGE_KEY,
  UNMODERATED_WARNING_PERIOD,
} from './constants';

export class StakePoolsStore extends Store {
  private readonly stakePoolsApi: StakePoolsApi;
  private readonly stakePoolsActions: StakePoolsActions;
  private showUnmoderatedDataStorage: number;

  constructor(
    stakePoolsActions: StakePoolsActions,
    stakePoolsApi: StakePoolsApi
  ) {
    super();
    this.stakePoolsApi = stakePoolsApi;
    this.stakePoolsActions = stakePoolsActions;
    this.showUnmoderatedDataStorage = storage.get(
      UNMODERATED_WARNING_STORAGE_KEY
    );

    this.registerActions(
      createActionBindings([
        [
          this.stakePoolsActions.handleAcceptUnmoderatedData,
          this.handleAcceptUnmoderatedData,
        ],
      ])
    );
  }

  @computed get showUnmoderatedData() {
    const { showUnmoderatedDataStorage } = this;
    if (!showUnmoderatedDataStorage) return false;
    const now: number = new Date().getTime();
    if (showUnmoderatedDataStorage - now > UNMODERATED_WARNING_PERIOD)
      return false;
    return true;
  }

  @computed get stakePoolsList() {
    return DUMMY_DATA;
  }

  private handleAcceptUnmoderatedData = () => {
    const now: number = new Date().getTime();
    storage.set(UNMODERATED_WARNING_STORAGE_KEY, now);
    this.showUnmoderatedDataStorage = now;
  };
}
