import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './BlockCreationRow.module.scss';

export interface IBlockCreationRowProps {
  performance: number;
  performancePercentage: number;
  sharedRewards: number;
  slotsElected: number;
  slotsElectedPercentage: number;
  stakePool: string;
  stakePoolName: string;
}

const BlockCreationRow = (props: IBlockCreationRowProps) => (
  <div className={styles.blockCreationRowContainer}>
    <div className={styles.stakePool}>
      <span className={styles.stakePoolName}>[{props.stakePoolName}]</span>{' '}
      {props.stakePool}
    </div>
    <div className={styles.slotsElected}>
      <span className={styles.slotsElectedPercentage}>
        {props.slotsElected}
      </span>{' '}
      slots -{' '}
      <span className={styles.slotsElectedPercentage}>
        {props.slotsElectedPercentage}%
      </span>
    </div>
    <div className={styles.performance}>
      {props.performance} of {props.slotsElected} -{' '}
      <span className={styles.performancePercentage}>
        {props.performancePercentage}%
      </span>
    </div>
    <div className={styles.sharedRewards}>
      <span className={styles.sharedRewardsValue}>{props.sharedRewards}</span>{' '}
      ADA of{' '}
      <span className={styles.sharedRewardsValue}>{props.performance}</span> ADA
    </div>
  </div>
);

export default observer(BlockCreationRow);
