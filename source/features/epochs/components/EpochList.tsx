import { observer } from 'mobx-react-lite';
import { Button } from 'react-polymorph/lib/components/Button';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import styles from './EpochList.scss';
import EpochListRow, { IEpochListRowProps } from './EpochListRow';

export interface IEpochListProps {
  title: string;
  items: Array<IEpochListRowProps>;
}

const EpochList = (props: IEpochListProps) => (
  <div className={styles.epochListContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={props.title} />
    </div>
    <div className={styles.listHeader}>
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
    <div className={styles.showMore}>
      <Button
        className={styles.showMoreButton}
        label="Show more epochs"
        onClick={() => null}
      />
    </div>
  </div>
);

export default observer(EpochList);
