import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { MouseEvent, useState, FC } from 'react';
import { getTooltipPosition } from '../helpers';
import { getColorFromRange } from '../../../utils/colors';
import styles from './StakePoolsList.scss';
import StakePoolThumbnail from './StakePoolThumbnail';
import StakePoolTooltip from './StakePoolTooltip';
import {
  IStakePoolsListProps,
  IStakePoolProps,
  IStakePoolTooltipPositionProps,
} from '../types';

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
        const color = getColorFromRange(stakePool.ranking, colorOptions);
        const isSelected = id === selectedPoolId;
        const onSelect = handleSelect.bind(null, stakePool.id);
        return (
          <StakePoolThumbnail
            color={color}
            isSelected={isSelected}
            key={id}
            onSelect={onSelect}
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
