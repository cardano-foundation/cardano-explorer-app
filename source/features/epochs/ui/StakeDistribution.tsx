import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { useI18nFeature } from '../../i18n/context';
import styles from './StakeDistribution.module.scss';
import StakeDistributionRow, {
  IStakeDistributionRowProps,
} from './StakeDistributionRow';

export interface IStakeDistributionProps {
  title: string;
  items: Array<IStakeDistributionRowProps>;
}

const StakeDistribution = (props: IStakeDistributionProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <div className={styles.stakeDistributionContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      <div className={styles.listHeader}>
        <div className={styles.stakePool}>
          {translate('stakeDistribution.stakePool')}
        </div>
        <div className={styles.slotsElected}>
          {translate('stakeDistribution.slotsElected')}
        </div>
      </div>
      {props.items.map((item, index) => (
        <div key={`epoch_${index}`} className={styles.stakeDistributionRow}>
          <StakeDistributionRow {...item} />
        </div>
      ))}
    </div>
  );
};

export default observer(StakeDistribution);
