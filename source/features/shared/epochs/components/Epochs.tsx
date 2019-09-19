import { observer } from 'mobx-react-lite';
import Epoch, { IEpochProps } from './Epoch';
import styles from './Epochs.scss';

export interface IEpochsProps {
  items: Array<IEpochProps>;
}

const Epochs = (props: IEpochsProps) => (
  <div className={styles.epochsContainer}>
    <div className={styles.epochsTitle}>
      <div className={styles.epoch}>Epoch</div>
      <div className={styles.blocksSlots}>Blocks / Slots</div>
      <div className={styles.startedAt}>Started At</div>
      <div className={styles.endedAt}>Ended At</div>
      <div className={styles.transactions}>Transactions</div>
      <div className={styles.output}>Output (₳)</div>
    </div>
    {props.items.map((item, index) => (
      <div key={`epoch_${index}`} className={styles.epochContainer}>
        <Epoch {...item} />
      </div>
    ))}
  </div>
);

export default observer(Epochs);
