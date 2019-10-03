import { observer } from 'mobx-react-lite';
import styles from './StakePoolsList.scss';
import { IStakePoolsListProps, IStakePoolProps } from '../types';
import StakePoolThumbnail from './StakePoolThumbnail';
import { getColorFromRange } from '../../../utils/colors';

const StakePoolsList = ({
  stakePoolsList,
  selectedPoolId,
  onSelect,
  onClose,
}: IStakePoolsListProps) => {
  return (
    <div className={styles.stakePoolsListContainer}>
      {stakePoolsList.map((stakePool: IStakePoolProps) => (
        <StakePoolThumbnail
          key={stakePool.id}
          stakePool={stakePool}
          isSelected={stakePool.id === selectedPoolId}
          onSelect={onSelect}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default observer(StakePoolsList);
