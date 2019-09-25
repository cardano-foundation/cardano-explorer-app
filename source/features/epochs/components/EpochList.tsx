import { observer } from 'mobx-react-lite';
import styles from './EpochList.scss';
import EpochListRow, { IEpochListRowProps } from './EpochListRow';

export interface IEpochListProps {
  items: Array<IEpochListRowProps>;
}

const EpochList = (props: IEpochListProps) => (
  <div className={styles.epochListContainer}>
    <div className={styles.epochListTitle}>
      <div className={styles.epoch}>Epoch</div>
      <div className={styles.blocksSlots}>Blocks / Slots</div>
      <div className={styles.startedAt}>Started At</div>
      <div className={styles.endedAt}>Ended At</div>
      <div className={styles.transactions}>Transactions</div>
      <div className={styles.output}>Output (₳)</div>
    </div>
    {props.items.map((item, index) => (
      <div key={`epoch_${index}`} className={styles.epochListRow}>
        <EpochListRow {...item} />
      </div>
    ))}
  </div>
);

export default observer(EpochList);
