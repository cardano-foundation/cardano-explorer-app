import { observer } from 'mobx-react-lite';
import moment from 'moment';
import CircularProgress, {
  CircularProgressSize,
} from '../../../widgets/circular-progress/CircularProgress';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import styles from './EpochSummary.scss';

export interface IEpochSummaryProps {
  blocksCount: number;
  endedAt?: Date;
  number: number;
  output: number;
  percentage?: number;
  slotsCount: number;
  startedAt: Date;
  status: string;
  title: string;
  transactionsCount: number;
}

const EpochSummary = (props: IEpochSummaryProps) => (
  <div className={styles.epochSummaryContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={props.title} />
    </div>
    <div className={styles.content}>
      <CircularProgress
        percentage={props.percentage}
        size={CircularProgressSize.BIG}
        showText
        text={
          <div className={styles.progressTextContent}>
            <div className={styles.progressTextLabel}>Epoch</div>
            <div className={styles.progressTextValue}>{props.number}</div>
          </div>
        }
      />
      <div className={styles.infoPanel}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}># of blocks</div>
          <div className={styles.infoValue}>
            {props.blocksCount} / {props.slotsCount}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Started at</div>
          <div className={styles.infoValue}>
            {moment(props.startedAt).format('YYYY/MM/DD HH:mm:ss')}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Ended at</div>
          <div className={styles.infoValue}>
            {props.endedAt
              ? moment(props.endedAt).format('YYYY/MM/DD HH:mm:ss')
              : props.status}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Transactions</div>
          <div className={styles.infoValue}>{props.transactionsCount}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Total output</div>
          <div className={styles.infoValue}>{props.output} ADA</div>
        </div>
      </div>
    </div>
  </div>
);

export default observer(EpochSummary);
