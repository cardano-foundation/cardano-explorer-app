import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { observer } from 'mobx-react-lite';
import React from 'react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { useI18nFeature } from '../../i18n/context';
import { IEpochOverview } from '../types';
import styles from './EpochSummary.module.scss';
import { EpochSummaryProgress } from './EpochSummaryProgress';

dayjs.extend(utc);

export interface IEpochSummaryProps {
  title: string;
  epoch: IEpochOverview;
}

const EpochSummary = ({ title, epoch }: IEpochSummaryProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <div className={styles.epochSummaryContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={title} />
      </div>
      <div className={styles.content}>
        <EpochSummaryProgress
          epochNumber={epoch.number}
          percentage={epoch.percentage}
          title={translate('epochSummary.epoch')}
        />
        <div className={styles.infoPanel}>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('epochSummary.numberOfBlocks')}
            </div>
            <div className={styles.infoValue}>
              {epoch.blocksCount} / {epoch.slotsCount}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('epochSummary.startedAt')}
            </div>
            <div className={styles.infoValue}>
              {dayjs.utc(epoch.startedAt).format('YYYY/MM/DD HH:mm:ss')}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('epochSummary.lastBlockAt')}
            </div>
            <div className={styles.infoValue}>
              {dayjs.utc(epoch.lastBlockAt).format('YYYY/MM/DD HH:mm:ss')}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('epochSummary.transactions')}
            </div>
            <div className={styles.infoValue}>{epoch.transactionsCount}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('epochSummary.totalOutput')}
            </div>
            <div className={styles.infoValue}>{epoch.output} ADA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(EpochSummary);
