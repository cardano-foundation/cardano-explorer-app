import { action, computed, observable } from 'mobx';
import storage from 'store';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { StakePoolsApi } from './api';
import { transformStakePoolOverviews } from './api/transformers';
import {
  UNMODERATED_WARNING_PERIOD,
  UNMODERATED_WARNING_STORAGE_KEY,
} from './constants';
import { StakePoolsActions } from './index';
import DUMMY_DATA from './stakingStakePools.dummy.json';
import { IStakePoolProps, IStakePoolsProps } from './types';

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
    this.stakePoolsApi.getStakePoolsAggregateQuery.execute({});
    this.stakePoolsApi.getStakePoolsQuery.execute({
      limit: 10,
      offset: 0,
    });
  }
  @computed get showUnmoderatedData() {
    const { showUnmoderatedDataStorage } = this;
    if (!showUnmoderatedDataStorage) {
      return false;
    }
    const now: number = new Date().getTime();
    return showUnmoderatedDataStorage - now <= UNMODERATED_WARNING_PERIOD;
  }
  @computed get stakePoolsStatistics() {
    const { result } = this.stakePoolsApi.getStakePoolsAggregateQuery;
    if (result?.stakePools_aggregate) {
      return result.stakePools_aggregate.aggregate;
    }
    return null;
  }

  @computed get stakePoolsList(): IStakePoolProps[] {
    const { result } = this.stakePoolsApi.getStakePoolsQuery;
    if (result && result.stakePools) {
      return transformStakePoolOverviews(result.stakePools);
    }
    return [];
  }
  @action private handleAcceptUnmoderatedData = () => {
    const now: number = new Date().getTime();
    this.showUnmoderatedDataStorage = now;
    storage.set(UNMODERATED_WARNING_STORAGE_KEY, now);
  };
}
