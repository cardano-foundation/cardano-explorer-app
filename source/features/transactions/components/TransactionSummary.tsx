import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import styles from './TransactionSummary.scss';

export interface ITransactionSummaryProps {
  address: string;
  block: number;
  epoch: number;
  fee: number;
  receivedTime: number;
  slot: number;
  title: string;
  totalOutput: number;
}

const TransactionSummary = (props: ITransactionSummaryProps) => (
  <div className={styles.transactionSummaryContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={props.title} />
    </div>
    <div className={styles.content}>
      <div className={styles.infoPanel}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Received Time</div>
          <div className={styles.infoValue}>{props.receivedTime}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Included In</div>
          <div className={styles.infoValue}>
            Epoch <span>{props.epoch}</span>, Slot / block
            <span> {props.slot / props.block}</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Total Output</div>
          <div className={styles.infoValue}>{props.totalOutput} ADA</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Transaction Fee</div>
          <div className={styles.infoValue}>{props.fee} ADA</div>
        </div>
      </div>
    </div>
  </div>
);

export default observer(TransactionSummary);
