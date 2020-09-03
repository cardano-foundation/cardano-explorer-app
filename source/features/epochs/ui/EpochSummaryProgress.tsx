import React from 'react';
import CircularProgress, {
  CircularProgressSize,
} from '../../../widgets/circular-progress/CircularProgress';
import styles from './EpochProgress.module.scss';

export interface IEpochProgressProps {
  epochNumber: number;
  percentage: number;
  title: string;
}

export const EpochSummaryProgress = (props: IEpochProgressProps) => (
  <CircularProgress
    percentage={props.percentage}
    size={CircularProgressSize.BIG}
    showText
    text={
      <div className={styles.progressTextContent}>
        <div className={styles.progressTextLabel}>{props.title}</div>
        <div className={styles.progressTextValue}>{props.epochNumber}</div>
      </div>
    }
  />
);
