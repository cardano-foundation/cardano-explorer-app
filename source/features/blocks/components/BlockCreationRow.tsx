import React, { Component } from 'react';
import styles from './BlockCreationRow.scss';

export interface IBlockCreationRowProps {
  performance: number;
  performancePercentage: number;
  sharedRewards: number;
  slotsElected: number;
  slotsElectedPercentage: number;
  stakePool: string;
  stakePoolName: string;
}

export default class BlockCreationRow extends Component<
  IBlockCreationRowProps
> {
  public render() {
    const {
      performance,
      performancePercentage,
      sharedRewards,
      slotsElected,
      slotsElectedPercentage,
      stakePool,
      stakePoolName,
    } = this.props;

    return (
      <div className={styles.blockCreationRowContainer}>
        <div className={styles.stakePool}>
          <span className={styles.stakePoolName}>[{stakePoolName}]</span>{' '}
          {stakePool}
        </div>
        <div className={styles.slotsElected}>
          <span className={styles.slotsElectedPercentage}>{slotsElected}</span>{' '}
          slots -{' '}
          <span className={styles.slotsElectedPercentage}>
            {slotsElectedPercentage}%
          </span>
        </div>
        <div className={styles.performance}>
          {performance} of {slotsElected} -{' '}
          <span className={styles.performancePercentage}>
            {performancePercentage}%
          </span>
        </div>
        <div className={styles.sharedRewards}>
          <span className={styles.sharedRewardsValue}>{sharedRewards}</span> ADA
          of <span className={styles.sharedRewardsValue}>{performance}</span>{' '}
          ADA
        </div>
      </div>
    );
  }
}
