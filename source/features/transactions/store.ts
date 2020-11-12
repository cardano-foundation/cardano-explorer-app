import { action, observable, runInAction } from 'mobx';
import { ActionProps, createActionBindings } from '../../lib/ActionBinding';
import { Store } from '../../lib/Store';
import { isDefined } from '../../lib/types';
import { TransactionsApi } from './api';
import { transactionDetailsTransformer } from './api/transformers';
import { TransactionsActions } from './index';
import { ITransactionDetails } from './types';

export class TransactionsStore extends Store {
  @observable public browsedAddressTransactions: ITransactionDetails[] = [];
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
        [
          this.actions.browseAddressTransactions,
          this.browseAddressTransactions,
        ],
        [this.actions.browseBlocksTransactions, this.browseBlocksTransactions],
      ])
    );
  }

  @action public browseAddressTransactions = async (
    params: ActionProps<
      typeof TransactionsActions.prototype.browseAddressTransactions
    >
  ): Promise<void> => {
    if (params.address.substring(0, 5) === 'stake') {
      // Do not execute queries multiple times!
      if (this.api.getStakeAddressTransactionsQuery.isExecuting) {
        return;
      }
      const result = await this.api.getStakeAddressTransactionsQuery.execute(params);
      if (result) {
        runInAction(() => {
          this.browsedAddressTransactions = result.transactions
            .filter(isDefined)
            .map(transactionDetailsTransformer);
        });
      }
    } else {
      // Do not execute queries multiple times!
      if (this.api.getPaymentAddressTransactionsQuery.isExecuting) {
        return;
      }
      const result = await this.api.getPaymentAddressTransactionsQuery.execute(params);
      if (result) {
        runInAction(() => {
          this.browsedAddressTransactions = result.transactions
            .filter(isDefined)
            .map(transactionDetailsTransformer);
        });
      }
    }
  };

  @action public browseBlocksTransactions = async (
    params: ActionProps<
      typeof TransactionsActions.prototype.browseBlocksTransactions
    >
  ): Promise<void> => {
    // Do not execute queries multiple times!
    if (this.api.getBlockTransactionsQuery.isExecuting) {
      return;
    }
    const result = await this.api.getBlockTransactionsQuery.execute(params);
    if (result) {
      runInAction(() => {
        this.browsedBlockTransactions = result.transactions
          .filter(isDefined)
          .map(transactionDetailsTransformer);
      });
    }
  };
}
