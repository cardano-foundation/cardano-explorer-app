import { useState, MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import {
  IStakePoolThumbnailProps,
  IStakePoolTooltipPositionProps,
} from '../types';

import styles from './StakePoolThumbnail.scss';
import { getColorFromRange } from '../../../utils/colors';
import { StakePoolTooltip } from './StakePoolTooltip';
import { getTooltipPosition } from '../helpers';

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
  const [position, setPosition] = useState<IStakePoolTooltipPositionProps>({
    horizontal: 'left',
    vertical: 'top',
  });
  const handleSelect = (event: MouseEvent<HTMLElement>) => {
    const newPosition = getTooltipPosition(event);
    setPosition(newPosition);
    onSelect(id);
  };

  return (
    <div className={containerStyles}>
      <button onClick={handleSelect} />
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
          color={color}
          onClose={onClose}
          position={position}
        />
      )}
    </div>
  );
};

export default observer(StakePoolThumbnail);
