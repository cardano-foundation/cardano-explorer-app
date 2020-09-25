import React from 'react';
import DividerWithTitle from '../../../../widgets/divider-with-title/DividerWithTitle';
import { EpochSummaryProgress } from '../../../epochs/ui/EpochSummaryProgress';
import styles from './StakePoolStatisticsPanel.module.scss';

interface IStakePoolStatisticsProps {
  numberOfStakePools: number;
  // rewardsPreviousEpoch: number;
  // rewardsTotal: number;
  // stakeControlledPercentage: number;
  epochNumber: number;
  epochProgressPercentage: number;
}

export const StakePoolStatisticsPanel = (props: IStakePoolStatisticsProps) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <DividerWithTitle title={'Statistics'} />
    </div>
    <div className={styles.content}>
      <EpochSummaryProgress
        epochNumber={props.epochNumber}
        percentage={props.epochProgressPercentage}
        title={'Current epoch'}
      />
      <div className={styles.infoPanel}>
        <div className={styles.infoRow}>
          <div className={styles.infoLabel}>Number of stake pools:</div>
          <div className={styles.infoValue}>{props.numberOfStakePools}</div>
        </div>

        {/*<div className={styles.infoRow}>*/}
        {/*  <div className={styles.infoLabel}>*/}
        {/*    Rewards earned in previous epoch:*/}
        {/*  </div>*/}
        {/*  <div className={styles.infoValue}>*/}
        {/*    {props.rewardsPreviousEpoch} ADA*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className={styles.infoRow}>*/}
        {/*  <div className={styles.infoLabel}>Rewards earned in total:</div>*/}
        {/*  <div className={styles.infoValue}>{props.rewardsTotal} ADA</div>*/}
        {/*</div>*/}

        {/*<div className={styles.infoRow}>*/}
        {/*  <div className={styles.infoLabel}>*/}
        {/*    Stake controlled by stake pools:*/}
        {/*  </div>*/}
        {/*  <div className={styles.infoValue}>*/}
        {/*    {props.stakeControlledPercentage}%*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  </div>
);
