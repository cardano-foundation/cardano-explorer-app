import { observer } from 'mobx-react-lite';
import moment from 'moment';
import CircularProgress, {
  CircularProgressSize,
} from '../../widgets/circular-progress/components/CircularProgress';
import styles from './EpochListRow.scss';

export interface IEpochListRowProps {
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

const EpochListRow = (props: IEpochListRowProps) => (
  <div className={styles.epochListRowContainer}>
    <div className={styles.epoch}>
      {props.endedAt ? (
        props.epoch
      ) : (
        <CircularProgress
          percentage={props.percentage}
          size={CircularProgressSize.SMALL}
          showText
          text={props.epoch}
        />
      )}
    </div>
    <div className={styles.blocksSlots}>
      {props.blocks} / {props.slots}
    </div>
    <div className={styles.startedAt}>
      {moment(props.startedAt).format('YYYY/MM/DD HH:mm:ss')}
    </div>
    <div className={styles.endedAt}>
      {props.endedAt
        ? moment(props.endedAt).format('YYYY/MM/DD HH:mm:ss')
        : props.status}
    </div>
    <div className={styles.transactions}>{props.transactions}</div>
    <div className={styles.output}>{props.output}</div>
  </div>
);

export default observer(EpochListRow);
