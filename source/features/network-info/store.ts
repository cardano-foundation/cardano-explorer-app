import { action, computed, observable, runInAction } from 'mobx';
import { environment } from '../../environment';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { NetworkInfoApi } from './api';
import { NetworkInfoActions } from './index';

export class NetworkInfoStore extends Store {
  @observable public blockHeight: number;
  @observable public currentEpoch: number;
  @observable public isShelleyEra: boolean;
  @observable public lastSlotFilled: number;
  @observable public lastBlockTime: Date;
  @observable public startTime: Date;
  // Epoch lengths for various Cardano eras
  @observable public byronSlotsPerEpoch?: number;
  @observable public shelleyEpochLength?: number;
  @observable public slotsPerPresentEpoch: number;
  @observable public slotNo: number;

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
      environment.POLLING_INTERVAL
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

  @computed get currentEpochPercentageComplete() {
    return (this.lastSlotFilled / this.slotsPerPresentEpoch) * 100;
  }

  @action private fetchDynamicInfo = async () => {
    const result = await this.networkInfoApi.fetchDynamic.execute({});
    if (result) {
      const { cardano } = result;
      const { currentEpoch, tip } = cardano;
      runInAction(() => {
        this.isShelleyEra = !!tip.protocolVersion;
        this.slotsPerPresentEpoch =
          (this.isShelleyEra
            ? this.shelleyEpochLength
            : this.byronSlotsPerEpoch) || 21600;
        this.blockHeight = tip.number || 0;
        this.currentEpoch = currentEpoch.number;
        this.lastSlotFilled = tip.slotInEpoch || 0;
        this.lastBlockTime = new Date(tip.forgedAt);
        this.slotNo = tip.slotNo || 0;
      });
    }
  };

  @action private fetchStaticInfo = async () => {
    const result = await this.networkInfoApi.fetchStatic.execute({});
    if (result) {
      const { genesis } = result;
      const k = genesis.byron?.protocolConsts?.k;
      this.byronSlotsPerEpoch = k != null ? k * 10 : undefined;
      this.shelleyEpochLength = genesis.shelley?.epochLength ?? undefined;
      // if (genesis.networkName !== environment.CARDANO.NETWORK) {
      //   throw new Error(
      //     `Cardano GraphQL is connected to ${cardano.networkName}, whereas the web app is expecting ${environment.CARDANO.NETWORK}. The instance of Cardano GraphQL needs to be configured to match our expected environment.`
      //   );
      // }
      runInAction(() => {
        this.startTime = new Date(genesis.shelley?.systemStart || 1506203091);
      });
    }
  };
}
