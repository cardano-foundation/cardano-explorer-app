import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Ring, { RingSize } from '../../ring/components/Ring';
import styles from './Epoch.scss';

export interface IEpochProps {
  percentage?: number;
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
        <Ring
          percentage={props.percentage}
          size={RingSize.SMALL}
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

export default observer(Epoch);