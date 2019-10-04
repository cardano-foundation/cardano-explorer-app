import { observer } from 'mobx-react-lite';
import { getColorFromRange } from '../../../utils/colors';
import { IStakePoolProps, IStakePoolsListProps } from '../types';
import styles from './StakePoolsList.scss';
import StakePoolThumbnail from './StakePoolThumbnail';

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
