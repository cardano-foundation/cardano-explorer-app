import { observer } from 'mobx-react-lite';
import React from 'react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { useNavigationFeatureOptionally } from '../../navigation';
import TransactionInfo, { ITransactionInfoProps } from './TransactionInfo';
import styles from './TransactionList.scss';

export interface ITransactionListProps {
  items: Array<ITransactionInfoProps>;
  title: string;
}

const TransactionList = (props: ITransactionListProps) => {
  const navigation = useNavigationFeatureOptionally();
  return (
    <div className={styles.transactionListContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      {props.items.map((item, index) => (
        <div key={`transaction_${index}`} className={styles.transactionListRow}>
          <TransactionInfo navigation={navigation?.actions} {...item} />
        </div>
      ))}
    </div>
  );
};

export default observer(TransactionList);
