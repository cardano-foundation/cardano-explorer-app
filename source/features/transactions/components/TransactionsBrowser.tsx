import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  BrowseInRange,
  IBrowseInRangeBounds,
  IBrowseInRangeResult,
} from '../../../widgets/browsing/BrowseInRange';
import Pagination from '../../../widgets/browsing/Pagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { ITransactionDetails } from '../types';
import TransactionList from './TransactionList';
import styles from './TransactionsBrowser.scss';

const TRANSACTIONS_PER_PAGE_DEFAULT = 2;
const TRANSACTIONS_PER_PAGE_MINIMUM = 1;
const TRANSACTIONS_PER_PAGE_MAXIMUM = 5;

interface ITransactionsBrowserProps {
  isLoading: boolean;
  isLoadingFirstTime: boolean;
  onBrowseParamsChanged: (params: IBrowseInRangeResult) => void;
  onBoundsChanged: (bounds: IBrowseInRangeBounds) => void;
  userParamLower?: string;
  userParamUpper?: string;
  total: number;
  transactions: ITransactionDetails[];
}

const TransactionsBrowser = (props: ITransactionsBrowserProps) => {
  const [
    browseParams,
    setBrowserParams,
  ] = useState<IBrowseInRangeResult | null>(null);
  return (
    <>
      <BrowseInRange
        {...props}
        onReadyToBrowse={params => {
          props.onBrowseParamsChanged(params);
          setBrowserParams(params);
        }}
        perPageDefault={TRANSACTIONS_PER_PAGE_DEFAULT}
        perPageMinimum={TRANSACTIONS_PER_PAGE_MINIMUM}
        perPageMaximum={TRANSACTIONS_PER_PAGE_MAXIMUM}
      />
      {browseParams && !props.isLoadingFirstTime ? (
        <>
          <TransactionList
            isLoading={props.isLoading}
            title="Transactions"
            items={props.transactions}
          />
          {browseParams.totalPages > 0 ? (
            <Pagination
              currentPage={browseParams.currentPage}
              onChangePage={(page: number) => {
                if (page > 0 && page <= browseParams.totalPages) {
                  const upper = Math.min(
                    page * browseParams.itemsPerPage,
                    props.total
                  );
                  props.onBoundsChanged({
                    lower: upper - browseParams.itemsPerPage,
                    upper,
                  });
                }
              }}
              totalPages={browseParams.totalPages}
            />
          ) : (
            <div className={styles.noTransactions}>No Transactions</div>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default observer(TransactionsBrowser);
