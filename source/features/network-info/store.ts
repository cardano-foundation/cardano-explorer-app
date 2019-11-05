import { action, computed, observable } from 'mobx';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
import { NetworkInfoApi } from './api';
import { NetworkInfoActions } from './index';

export class NetworkInfoStore extends Store {
  @observable public blockHeight: number;
  @observable public currentEpoch: number;
  @observable public lastBlockTime: Date;
  @observable public protocolConst: number;
  @observable public startTime: Date;
  @observable public slotDuration: number;

  private readonly networkInfoApi: NetworkInfoApi;
  private readonly networkInfoActions: NetworkInfoActions;

  constructor(
    networkInfoActions: NetworkInfoActions,
    networkInfoApi: NetworkInfoApi
  ) {
    super();
    Object.assign(this, { networkInfoActions, networkInfoApi });

    this.registerActions(
      createActionBindings([
        [this.networkInfoActions.fetchDynamic, this.fetchDynamicInfo],
        [this.networkInfoActions.fetchStatic, this.fetchStaticInfo],
      ])
    );
  }

  @computed get isFetching() {
    return (
      this.networkInfoApi.fetchDynamic.isExecuting ||
      this.networkInfoApi.fetchStatic.isExecuting
    );
  }

  @action private fetchDynamicInfo = async () => {
    const result = await this.networkInfoApi.fetchDynamic.execute({});
    if (result && isNotNull(result.data.cardano)) {
      this.blockHeight = result.data.cardano.blockHeight;
      this.currentEpoch = result.data.cardano.currentEpoch.number;
      this.lastBlockTime = new Date(
        result.data.cardano.currentEpoch.lastBlockTime
      );
    }
  };

  @action private fetchStaticInfo = async () => {
    const result = await this.networkInfoApi.fetchStatic.execute({});
    if (result && isNotNull(result.data.cardano)) {
      this.protocolConst = result.data.cardano.protocolConst;
      this.startTime = new Date(result.data.cardano.startTime);
      this.slotDuration = result.data.cardano.slotDuration;
    }
  };
}
