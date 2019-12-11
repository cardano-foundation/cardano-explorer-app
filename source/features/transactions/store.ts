import { action, observable, runInAction } from 'mobx';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { isNotNull } from '../../lib/types';
import { TransactionsApi } from './api';
import { transactionDetailsTransformer } from './api/transformers';
import { TransactionsActions } from './index';
import { ITransactionDetails } from './types';

export class TransactionsStore extends Store {
  @observable public browsedBlockTransactions: ITransactionDetails[] = [];

  private readonly actions: TransactionsActions;
  private readonly api: TransactionsApi;

  constructor(actions: TransactionsActions, api: TransactionsApi) {
    super();
    Object.assign(this, {
      actions,
      api,
    });

    this.registerActions(
      createActionBindings([
        [this.actions.browseBlocksTransactions, this.browseBlocksTransactions],
      ])
    );
  }

  @action public browseBlocksTransactions = async (
    params: ActionProps<
      typeof TransactionsActions.prototype.browseBlocksTransactions
    >
  ): Promise<void> => {
    const result = await this.api.getBlockTransactionsQuery.execute(params);
    if (result) {
      runInAction(() => {
        this.browsedBlockTransactions = result.transactions
          .filter(isNotNull)
          .map(transactionDetailsTransformer);
      });
    }
  };
}
