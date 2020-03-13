import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { useI18nFeature } from '../../i18n/context';
import styles from './BlockCreation.module.scss';
import BlockCreationRow, { IBlockCreationRowProps } from './BlockCreationRow';

export interface IBlockCreationProps {
  title: string;
  items: Array<IBlockCreationRowProps>;
}

const BlockCreation = (props: IBlockCreationProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <div className={styles.blockCreationContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      <div className={styles.listHeader}>
        <div className={styles.stakePool}>
          {translate('browseBlocks.stakePoolLabel')}
        </div>
        <div className={styles.slotsElected}>
          {translate('browseBlocks.slotsElectedLabel')}
        </div>
        <div className={styles.performance}>
          {translate('browseBlocks.performanceLabel')}
        </div>
        <div className={styles.sharedRewards}>
          {translate('browseBlocks.sharedRewardsLabel')}
        </div>
      </div>
      {props.items.map((item, index) => (
        <div key={`epoch_${index}`} className={styles.blockListRow}>
          <BlockCreationRow {...item} />
        </div>
      ))}
    </div>
  );
};

export default observer(BlockCreation);
