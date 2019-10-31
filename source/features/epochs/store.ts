import { action, observable } from 'mobx';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
import { EpochsApi } from './api';
import { epochOverviewTransformer } from './api/transformers';
import { EpochsActions } from './index';
import { IEpochOverview } from './types';

export class EpochsStore extends Store {
  @observable public latestEpochs: IEpochOverview[] = [];

  private readonly epochsActions: EpochsActions;
  private readonly epochsApi: EpochsApi;

  constructor(epochsActions: EpochsActions, epochsApi: EpochsApi) {
    super();
    Object.assign(this, { epochsActions, epochsApi });

    this.registerActions(
      createActionBindings([
        [this.epochsActions.fetchLatestEpochs, this.fetchLatestEpochs],
      ])
    );
  }

  @action private fetchLatestEpochs = async () => {
    const result = await this.epochsApi.getLatestEpochsQuery.execute({
      limit: 5,
    });
    if (result) {
      this.latestEpochs = result.data.epochs
        .filter(isNotNull)
        .map(epochOverviewTransformer);
    }
  };
}
