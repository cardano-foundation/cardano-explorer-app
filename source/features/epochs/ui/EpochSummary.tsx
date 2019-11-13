import { observer } from 'mobx-react-lite';
import moment from 'moment';
import CircularProgress, {
  CircularProgressSize,
} from '../../../widgets/circular-progress/CircularProgress';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { IEpochDetails } from '../types';
import styles from './EpochSummary.scss';

export interface IEpochSummaryProps {
  title: string;
  epoch: IEpochDetails;
}

const EpochSummary = ({ title, epoch }: IEpochSummaryProps) => (
  <div className={styles.epochSummaryContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={title} />
    </div>
    <div className={styles.content}>
      <CircularProgress
        percentage={epoch.percentage}
        size={CircularProgressSize.BIG}
        showText
        text={
          <div className={styles.progressTextContent}>
            <div className={styles.progressTextLabel}>Epoch</div>
            <div className={styles.progressTextValue}>{epoch.number}</div>
          </div>
        }
      />
      <div className={styles.infoPanel}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}># of blocks</div>
          <div className={styles.infoValue}>
            {epoch.blocksCount} / {epoch.slotsCount}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Started at</div>
          <div className={styles.infoValue}>
            {moment(epoch.startedAt).format('YYYY/MM/DD HH:mm:ss')}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Last Block at</div>
          <div className={styles.infoValue}>
            {moment(epoch.lastBlockAt).format('YYYY/MM/DD HH:mm:ss')}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Transactions</div>
          <div className={styles.infoValue}>{epoch.transactionsCount}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Total output</div>
          <div className={styles.infoValue}>{epoch.output} ADA</div>
        </div>
      </div>
    </div>
  </div>
);

export default observer(EpochSummary);
