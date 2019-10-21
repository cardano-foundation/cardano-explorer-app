import React, { Component } from 'react';
import styles from './StakeDistributionRow.scss';

export interface IStakeDistributionRowProps {
  slotsElectedPercentage: number;
  stakePool: string;
  stakePoolName: string;
}

export default class StakeDistributionRow extends Component<
  IStakeDistributionRowProps
> {
  public render() {
    const { slotsElectedPercentage, stakePool, stakePoolName } = this.props;

    return (
      <div className={styles.stakeDistributionRowContainer}>
        <div className={styles.stakePool}>
          <span className={styles.stakePoolName}>[{stakePoolName}]</span>{' '}
          {stakePool}
        </div>
        <div className={styles.slotsElectedPercentage}>
          {slotsElectedPercentage}%
        </div>
      </div>
    );
  }
}
