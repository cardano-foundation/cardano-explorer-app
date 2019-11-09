import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { ITransactionDetails } from '../types';
import styles from './TransactionSummary.scss';

export interface ITransactionSummaryProps {
  title: string;
  transaction: ITransactionDetails;
}

const TransactionSummary = ({
  title,
  transaction,
}: ITransactionSummaryProps) => (
  <div className={styles.transactionSummaryContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={title} />
    </div>
    <div className={styles.content}>
      <div className={styles.infoPanel}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Received Time</div>
          <div className={styles.infoValue}>{transaction.receivedTime}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Included In</div>
          <div className={styles.infoValue}>
            Epoch <span>{transaction.epoch}</span>, Slot / block
            <span>
              {transaction.slot} / {transaction.block}
            </span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Total Output</div>
          <div className={styles.infoValue}>{transaction.totalOutput} ADA</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Transaction Fee</div>
          <div className={styles.infoValue}>{transaction.fee} ADA</div>
        </div>
      </div>
    </div>
  </div>
);

export default observer(TransactionSummary);
