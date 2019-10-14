import { observer } from 'mobx-react-lite';
import { Button } from 'react-polymorph/lib/components/Button';
import DividerWithTitle from '../../widgets/divider-with-title/components/DividerWithTitle';
import styles from './BlockList.scss';
import BlockListRow, { IBlockListRowProps } from './BlockListRow';

export interface IBlockListProps {
  title: string;
  items: Array<IBlockListRowProps>;
}

const BlockList = (props: IBlockListProps) => (
  <div className={styles.blockListContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={props.title} />
    </div>
    <div className={styles.listHeader}>
      <div className={styles.epoch}>Epoch</div>
      <div className={styles.blocksSlots}>Block / Slot</div>
      <div className={styles.createdAt}>Created At</div>
      <div className={styles.transactions}>Transactions</div>
      <div className={styles.output}>Output (₳)</div>
      <div className={styles.size}>Size (Bytes)</div>
      <div className={styles.createdBy}>Created By</div>
    </div>
    {props.items.map((item, index) => (
      <div key={`epoch_${index}`} className={styles.blockListRow}>
        <BlockListRow {...item} />
      </div>
    ))}
    <div className={styles.showMore}>
      <Button
        className={styles.showMoreButton}
        label="Show more blocks"
        onClick={() => null}
      />
    </div>
  </div>
);

export default observer(BlockList);
