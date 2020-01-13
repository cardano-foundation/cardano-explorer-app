import { action, computed, observable, runInAction } from 'mobx';
import { environment } from '../../environment';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { NetworkInfoApi } from './api';
import { NetworkInfoActions } from './index';

export class NetworkInfoStore extends Store {
  @observable public blockHeight: number;
  @observable public currentEpoch: number;
  @observable public currentSlot: number;
  @observable public lastBlockTime: Date;
  @observable public protocolConst: number;
  @observable public startTime: Date;
  @observable public slotDuration: number;

  private readonly networkInfoApi: NetworkInfoApi;
  private readonly networkInfoActions: NetworkInfoActions;
  private pollingInterval: NodeJS.Timeout;

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

  public async start() {
    super.start();
    // Static information only needs to be fetched once
    await this.fetchStaticInfo();
    // Fetch dynamic info immediately once
    await this.fetchDynamicInfo();
    // Poll for updates
    this.pollingInterval = setInterval(
      this.fetchDynamicInfo,
      this.slotDuration / (environment.REAL_TIME_FACTOR || 1.5)
    );
  }

  public async stop() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  @computed get isFetching() {
    return (
      this.networkInfoApi.fetchDynamic.isExecuting ||
      this.networkInfoApi.fetchStatic.isExecuting
    );
  }

  @computed get slotsPerEpoch() {
    return this.protocolConst * 10;
  }

  @computed get currentEpochPercentageComplete() {
    return (this.currentSlot / this.slotsPerEpoch) * 100;
  }

  @action private fetchDynamicInfo = async () => {
    const result = await this.networkInfoApi.fetchDynamic.execute({});
    if (result) {
      const { cardano } = result;
      const { currentEpoch } = cardano;
      runInAction(() => {
        this.blockHeight = cardano.blockHeight;
        this.currentEpoch = currentEpoch.number;
        this.currentSlot = currentEpoch.blocks[0].slotWithinEpoch || 0;
        this.lastBlockTime = new Date(currentEpoch.lastBlockTime);
      });
    }
  };

  @action private fetchStaticInfo = async () => {
    const result = await this.networkInfoApi.fetchStatic.execute({});
    if (result) {
      const { cardano } = result;
      if (cardano.networkName !== environment.CARDANO.NETWORK) {
        throw new Error(
          `Cardano GraphQL is connected to" '${cardano.networkName}', whereas the web app is expecting '${environment.CARDANO.NETWORK}'`. The instance of Cardano GraphQL needs to be configured to match our expected environment. 
        );
      }
      runInAction(() => {
        this.protocolConst = cardano.protocolConst;
        this.startTime = new Date(cardano.startTime);
        this.slotDuration = cardano.slotDuration;
      });
    }
  };
}
