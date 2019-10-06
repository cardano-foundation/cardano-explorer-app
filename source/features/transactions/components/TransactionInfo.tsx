import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../widgets/divider-with-title/components/DividerWithTitle';
import styles from './TransactionInfo.scss';

export interface ITransactionInfoProps {
  address: string;
  block: number;
  epoch: number;
  fee: number;
  receivedTime: number;
  slot: number;
  totalOutput: number;
}

const TransactionInfo = (props: ITransactionInfoProps) => (
  <div className={styles.transactionInfoContainer}>
    <div className={styles.header}>
      <DividerWithTitle title="Summary" />
    </div>
    <div className={styles.content}>
      <div className={styles.infoPanel}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Received Time</div>
          <div className={styles.infoValue}>{props.receivedTime}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Included In</div>
          <div className={styles.infoValue}>Epoch <span>{props.epoch}</span>, Slot / block <span>{props.slot / props.block}</span></div>
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

export default observer(TransactionInfo);
