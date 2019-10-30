import { action, computed, observable } from 'mobx';
import storage from 'store';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { StakePoolsActions } from './actions';
import { StakePoolsApi } from './api';
import {
  UNMODERATED_WARNING_PERIOD,
  UNMODERATED_WARNING_STORAGE_KEY,
} from './constants';
import DUMMY_DATA from './stakingStakePools.dummy.json';

export class StakePoolsStore extends Store {
  private readonly stakePoolsApi: StakePoolsApi;
  @observable private showUnmoderatedDataStorage: number | null;
  constructor(
    stakePoolsActions: StakePoolsActions,
    stakePoolsApi: StakePoolsApi
  ) {
    super();
    this.stakePoolsApi = stakePoolsApi;
    this.showUnmoderatedDataStorage = storage.get(
      UNMODERATED_WARNING_STORAGE_KEY
    );
    this.registerActions(
      createActionBindings([
        [
          stakePoolsActions.handleAcceptUnmoderatedData,
          this.handleAcceptUnmoderatedData,
        ],
      ])
    );
  }
  @computed get showUnmoderatedData() {
    const { showUnmoderatedDataStorage } = this;
    if (!showUnmoderatedDataStorage) {
      return false;
    }
    const now: number = new Date().getTime();
    if (showUnmoderatedDataStorage - now > UNMODERATED_WARNING_PERIOD) {
      return false;
    }
    return true;
  }
  @computed get stakePoolsList() {
    return DUMMY_DATA;
  }
  @action private handleAcceptUnmoderatedData = () => {
    const now: number = new Date().getTime();
    this.showUnmoderatedDataStorage = now;
    storage.set(UNMODERATED_WARNING_STORAGE_KEY, now);
  };
}
