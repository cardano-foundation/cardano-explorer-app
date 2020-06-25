import { observer } from 'mobx-react-lite';
import React from 'react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import TransactionInfo, { ITransactionInfoProps } from './TransactionInfo';
import styles from './TransactionList.module.scss';

export interface ITransactionListProps {
  isLoading: boolean;
  items: Array<ITransactionInfoProps>;
  title: string;
}

const TransactionList = (props: ITransactionListProps) => {
  const hasItems = props.items.length > 0;
  return (
    <div className={styles.transactionListContainer}>
      {hasItems && props.isLoading && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner />
        </div>
      )}
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      {props.items.map((item, index) => (
        <div key={`transaction_${index}`} className={styles.transactionListRow}>
          <TransactionInfo
            {...item}
            hasSeparator={index < props.items.length - 1}
          />
        </div>
      ))}
    </div>
  );
};

export default observer(TransactionList);
