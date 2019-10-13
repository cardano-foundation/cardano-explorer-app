import { observer } from 'mobx-react-lite';
import moment from 'moment';
import DividerWithTitle from '../../widgets/divider-with-title/components/DividerWithTitle';
import styles from './BlockSummary.scss';

export interface IBlockSummaryProps {
  block: number;
  confirmations: number;
  createdBy: string;
  epoch: number;
  id: string;
  merkleRoot: string;
  nextBlock: string;
  prevBlock: string;
  size: number;
  time: number;
  title: string;
  transactions: number;
}

const BlockSummary = (props: IBlockSummaryProps) => (
  <div className={styles.blockSummaryContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={props.title} />
    </div>
    <div className={styles.content}>
      <div className={styles.infoPanel}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>ID</div>
          <div className={styles.infoValue}>{props.id}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Epoch</div>
          <div className={styles.infoValue}>
            <span>{props.epoch}</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Block</div>
          <div className={styles.infoValue}>{props.block}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Confirmations</div>
          <div className={styles.infoValue}>{props.confirmations}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Size</div>
          <div className={styles.infoValue}>{props.size} bytes</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Transactions</div>
          <div className={styles.infoValue}>{props.transactions}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Created by</div>
          <div className={styles.infoValue}>{props.createdBy}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Time</div>
          <div className={styles.infoValue}>
            {moment(props.time).format('YYYY/MM/DD HH:mm:ss')}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Previous block</div>
          <div className={styles.infoValue}>
            <span>{props.prevBlock}</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Next block</div>
          <div className={styles.infoValue}>
            <span>{props.nextBlock}</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Merkle root</div>
          <div className={styles.infoValue}>{props.merkleRoot}</div>
        </div>
      </div>
    </div>
  </div>
);

export default observer(BlockSummary);
