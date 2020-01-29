import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './StakeDistributionRow.module.scss';

export interface IStakeDistributionRowProps {
  slotsElectedPercentage: number;
  stakePool: string;
  stakePoolName: string;
}

const StakeDistributionRow = (props: IStakeDistributionRowProps) => (
  <div className={styles.stakeDistributionRowContainer}>
    <div className={styles.stakePool}>
      <span className={styles.stakePoolName}>[{props.stakePoolName}]</span>{' '}
      {props.stakePool}
    </div>
    <div className={styles.slotsElectedPercentage}>
      {props.slotsElectedPercentage}%
    </div>
  </div>
);

export default observer(StakeDistributionRow);
