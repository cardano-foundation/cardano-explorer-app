import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../widgets/divider-with-title/components/DividerWithTitle';
import styles from './TransactionList.scss';
import TransactionInfo, { ITransactionInfoProps } from './TransactionInfo';

export interface ITransactionListProps {
  items: Array<ITransactionInfoProps>;
  title: string;
}

const TransactionList = (props: ITransactionListProps) => (
  <div className={styles.transactionListContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={props.title} />
    </div>
    {props.items.map((item, index) => (
      <div key={`transaction_${index}`} className={styles.transactionListRow}>
        <TransactionInfo {...item} />
      </div>
    ))}
  </div>
);

export default observer(TransactionList);
