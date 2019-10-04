import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { IStakePoolThumbnailProps } from '../types';

import styles from './StakePoolThumbnail.scss';
import { getColorFromRange } from '../../../utils/colors';
import { StakePoolTooltip } from './StakePoolTooltip';

const StakePoolThumbnail = ({
  stakePool,
  isSelected,
  onSelect,
  onClose,
}: IStakePoolThumbnailProps) => {
  const { ranking, slug, retiring, id } = stakePool;
  const color = getColorFromRange(ranking);
  const containerStyles = classnames([
    styles.stakePoolThumbnailContainer,
    isSelected ? styles.isHighlighted : null,
  ]);
  return (
    <div className={containerStyles}>
      <button onClick={() => onSelect(id)} />
      <div className={styles.content}>
        <div className={styles.slug}>{slug}</div>
        <div className={styles.ranking} style={{ color }}>
          {ranking}
        </div>
        {retiring && <div className={styles.clock}>⏰</div>}
        <div
          className={styles.colorBand}
          style={{
            background: color,
          }}
        />
      </div>
      {isSelected && (
        <StakePoolTooltip
          stakePool={stakePool}
          top={0}
          left={0}
          color={color}
          containerClassName=""
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default observer(StakePoolThumbnail);
