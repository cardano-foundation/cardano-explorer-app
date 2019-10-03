import { observer } from 'mobx-react-lite';
import styles from './Blocks.scss';
import BlocksListRow, { IBlocksListRowProps } from './BlocksListRow';

export interface IBlocksProps {
  items: Array<IBlocksListRowProps>;
}

const Blocks = (props: IBlocksProps) => {
  return (
    <div className={styles.blocksListContainer}>
      <div className={styles.blocksListTitle}>
        <div className={styles.epoch}>Epoch</div>
        <div className={styles.blocksSlots}>Block / Slot</div>
        <div className={styles.createdAt}>Created At</div>
        <div className={styles.transactions}>Transactions</div>
        <div className={styles.output}>Output (₳)</div>
        <div className={styles.size}>Size (Bytes)</div>
        <div className={styles.createdBy}>Created By</div>
      </div>
      {props.items.map((item, index) => (
        <div key={`epoch_${index}`} className={styles.blocksListRow}>
          <BlocksListRow {...item} />
        </div>
      ))}
    </div>
  );
};

export default observer(Blocks);
