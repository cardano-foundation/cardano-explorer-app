import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../widgets/divider-with-title/components/DividerWithTitle';
import styles from './BlockCreation.scss';
import BlockCreationRow, { IBlockCreationRowProps } from './BlockCreationRow';

export interface IBlockCreationProps {
  title: string;
  items: Array<IBlockCreationRowProps>;
}

const BlockCreation = (props: IBlockCreationProps) => (
  <div className={styles.blockCreationContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={props.title} />
    </div>
    <div className={styles.listHeader}>
      <div className={styles.stakePool}>Stake pool</div>
      <div className={styles.slotsElected}>Slots elected</div>
      <div className={styles.performance}>Performance</div>
      <div className={styles.sharedRewards}>Shared rewards</div>
    </div>
    {props.items.map((item, index) => (
      <div key={`epoch_${index}`} className={styles.blockListRow}>
        <BlockCreationRow {...item} />
      </div>
    ))}
  </div>
);

export default observer(BlockCreation);
