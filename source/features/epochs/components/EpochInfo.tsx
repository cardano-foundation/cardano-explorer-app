import { observer } from 'mobx-react-lite';
import moment from 'moment';
import CircularProgress, {
  CircularProgressSize,
} from '../../shared/circular-progress/components/CircularProgress';
import DividerWithTitle from '../../shared/divider-with-title/components/DividerWithTitle';
import styles from './EpochInfo.scss';

export interface IEpochInfoProps {
  percentage?: number;
  epoch: number;
  blocks: number;
  slots: number;
  status: string;
  startedAt: number;
  endedAt?: number;
  transactions: number;
  output: number;
}

const EpochInfo = (props: IEpochInfoProps) => (
  <div className={styles.epochInfoContainer}>
    <div className={styles.header}>
      <DividerWithTitle title="Epoch" />
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

export default observer(EpochInfo);
