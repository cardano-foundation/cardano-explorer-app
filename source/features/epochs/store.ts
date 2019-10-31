import { action, observable } from 'mobx';
import {
  BlockOverviewFragment,
  EpochDetailsFragment,
} from '../../../generated/typings/graphql-schema';
import { createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { EpochsApi } from './api';
import { epochDetailsTransformer } from './api/transformers';
import { EpochsActions } from './index';
import { IEpochDetails } from './types';

export class EpochsStore extends Store {
  @observable public latestEpochs: IEpochDetails[] = [];

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
      const isEpoch = (e: any): e is EpochDetailsFragment => e != null;
      this.latestEpochs = result.data.epochs
        .filter(isEpoch)
        .map(epochDetailsTransformer);
    }
  };
}
