import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { calculatePaging, ICalculatePagingOutputs } from '../../../lib/paging';
import Pagination from '../../../widgets/browsing/Pagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useI18nFeature } from '../../i18n/context';
import { ITransactionDetails } from '../types';
import TransactionList from './TransactionList';
import styles from './TransactionsBrowser.module.scss';

export const TRANSACTIONS_PER_PAGE_DEFAULT = 2;
export const TRANSACTIONS_PER_PAGE_MINIMUM = 1;
export const TRANSACTIONS_PER_PAGE_MAXIMUM = 5;

interface ITransactionsBrowserProps {
  isLoading: boolean;
  isLoadingFirstTime: boolean;
  onPagingCalculated: (paging: ICalculatePagingOutputs) => void;
  onChangePage: (page: number) => void;
  currentPage?: string | number;
  perPage?: string | number;
  total: number;
  transactions: ITransactionDetails[];
}

const TransactionsBrowser = (props: ITransactionsBrowserProps) => {
  const { translate } = useI18nFeature().store;
  const paging = calculatePaging({
    currentPage: props.currentPage,
    perPage: props.perPage,
    perPageDefault: TRANSACTIONS_PER_PAGE_DEFAULT,
    perPageMaximum: TRANSACTIONS_PER_PAGE_MAXIMUM,
    perPageMinimum: TRANSACTIONS_PER_PAGE_MINIMUM,
    totalItems: props.total,
  });
  useEffect(() => {
    props.onPagingCalculated(paging);
  }, [props.currentPage, props.perPage]);
  return (
    <>
      {!props.isLoadingFirstTime ? (
        <>
          <TransactionList
            isLoading={props.isLoading}
            title={translate('transaction.transactionsLabel')}
            items={props.transactions}
          />
          {paging.totalPages > 0 ? (
            <Pagination
              currentPage={paging.currentPage}
              onChangePage={props.onChangePage}
              totalPages={paging.totalPages}
            />
          ) : (
            <div className={styles.noTransactions}>
              {translate('transaction.noTransactions')}
            </div>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default observer(TransactionsBrowser);
