import { observer } from 'mobx-react-lite';
import moment from 'moment';
import styles from './Epoch.scss';
import Ring from './Ring';

export interface IEpochProps {
  epoch: number;
  blocks: number;
  slots: number;
  status: string;
  startedAt: number;
  endedAt: number;
  transactions: number;
  output: number;
}

const Epoch = (props: IEpochProps) => (
  <div className={styles.epochContainer}>
    <div className={styles.epoch}>
      {props.endedAt ? (
        props.epoch
      ) : (
        <Ring percentage={30} sqSize={36} strokeWidth={2} showText />
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

export default observer(Epoch);
