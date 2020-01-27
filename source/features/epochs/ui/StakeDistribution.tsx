import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import styles from './StakeDistribution.module.scss';
import StakeDistributionRow, {
  IStakeDistributionRowProps,
} from './StakeDistributionRow';

export interface IStakeDistributionProps {
  title: string;
  items: Array<IStakeDistributionRowProps>;
}

const StakeDistribution = (props: IStakeDistributionProps) => (
  <div className={styles.stakeDistributionContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={props.title} />
    </div>
    <div className={styles.listHeader}>
      <div className={styles.stakePool}>Stake pool</div>
      <div className={styles.slotsElected}>Slots elected</div>
    </div>
    {props.items.map((item, index) => (
      <div key={`epoch_${index}`} className={styles.stakeDistributionRow}>
        <StakeDistributionRow {...item} />
      </div>
    ))}
  </div>
);

export default observer(StakeDistribution);
