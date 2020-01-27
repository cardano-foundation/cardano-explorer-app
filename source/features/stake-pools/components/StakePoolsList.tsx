import { observer } from 'mobx-react-lite';
import React, { FC, MouseEvent, useState } from 'react';
import { getColorFromRange } from '../../../lib/colors';
import { getTooltipPosition } from '../helpers';
import {
  IStakePoolProps,
  IStakePoolsListProps,
  IStakePoolTooltipPositionProps,
} from '../types';
import styles from './StakePoolsList.module.scss';
import StakePoolThumbnail from './StakePoolThumbnail';
import StakePoolTooltip from './StakePoolTooltip';

const StakePoolsList: FC<IStakePoolsListProps> = ({
  stakePoolsList,
  onSelect,
  selectedPoolId,
  onClose,
}) => {
  const [position, setTooltipState] = useState<
    IStakePoolTooltipPositionProps | any
  >({});
  const handleSelect = (id: string, event: MouseEvent<HTMLElement>) => {
    setTooltipState(getTooltipPosition(event));
    onSelect(id);
  };
  const colorOptions = { domain: [0, stakePoolsList.length] };
  return (
    <div className={styles.stakePoolsListContainer}>
      {stakePoolsList.map((stakePool: IStakePoolProps) => {
        const { id, ranking } = stakePool;
        const color = getColorFromRange(ranking, colorOptions);
        const isSelected = id === selectedPoolId;
        return (
          <StakePoolThumbnail
            color={color}
            isSelected={isSelected}
            key={id}
            onSelect={handleSelect.bind(null, stakePool.id)}
            stakePool={stakePool}
          >
            {isSelected && (
              <StakePoolTooltip
                stakePool={stakePool}
                color={color}
                position={position}
                onClose={onClose}
              />
            )}
          </StakePoolThumbnail>
        );
      })}
    </div>
  );
};
export default observer(StakePoolsList);
