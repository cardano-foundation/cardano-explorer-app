import { observer } from 'mobx-react-lite';
import moment from 'moment';
import CircularProgress, {
  CircularProgressSize,
} from '../../../widgets/circular-progress/CircularProgress';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import styles from './EpochSummary.scss';

export interface IEpochSummaryProps {
  blocks: number;
  endedAt?: number;
  epoch: number;
  output: number;
  percentage?: number;
  slots: number;
  startedAt: number;
  status: string;
  title: string;
  transactions: number;
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
            <div className={styles.progressTextValue}>{props.epoch}</div>
          </div>
        }
      />
      <div className={styles.infoPanel}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}># of blocks</div>
          <div className={styles.infoValue}>
            {props.blocks} / {props.slots}
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
          <div className={styles.infoValue}>{props.transactions}</div>
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
