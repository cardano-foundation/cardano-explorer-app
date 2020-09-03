import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import CircularProgress, {
  CircularProgressSize,
} from '../../../widgets/circular-progress/CircularProgress';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import Table, { IColumnDefinition } from '../../../widgets/table/Table';
import { LocalizedLink } from '../../navigation/ui/LocalizedLink';
import { getEpochRoute } from '../helpers';
import { IEpochOverview } from '../types';
import styles from './EpochList.module.scss';

dayjs.extend(utc);

export interface IEpochListProps {
  currentEpoch: number;
  title: string;
  items: Array<IEpochOverview>;
  isLoading: boolean;
}

interface IColumnsProps {
  currentEpoch: number;
}

const columns = (
  props: IColumnsProps
): Array<IColumnDefinition<IEpochOverview>> => [
  {
    cellRender: (value: any) => {
      const epoch =
        props.currentEpoch === value.epoch ? (
          <CircularProgress
            percentage={value.percentage}
            size={CircularProgressSize.SMALL}
            showText
            text={value.epoch}
          />
        ) : (
          value.epoch
        );
      return (
        <LocalizedLink href={getEpochRoute(value.epoch)}>{epoch}</LocalizedLink>
      );
    },
    cellValue: (row: IEpochOverview) => ({
      epoch: row.number,
      lastBlockAt: row.lastBlockAt,
      percentage: row.percentage,
    }),
    cssClass: 'epoch',
    head: 'epoch.epochTitle',
    key: 'number',
  },
  {
    cellValue: (row: IEpochOverview) => row.slotsCount,
    cssClass: 'slots',
    head: 'epoch.slotsTitle',
    key: 'slots',
  },
  {
    cellValue: (row: IEpochOverview) => row.blocksCount,
    cssClass: 'blocks',
    head: 'epoch.blocksTitle',
    key: 'blocks',
  },
  {
    cellValue: (row: IEpochOverview) =>
      dayjs.utc(row.startedAt).format('YYYY/MM/DD HH:mm:ss'),
    cssClass: 'startedAt',
    head: 'epoch.startedAtTitle',
    key: 'startedAt',
  },
  {
    cellRender: (value: any) =>
      dayjs.utc(value.lastBlockAt).format('YYYY/MM/DD HH:mm:ss'),
    cellValue: (row: IEpochOverview) => ({
      lastBlockAt: row.lastBlockAt,
    }),
    cssClass: 'lastBlockAt',
    head: 'epoch.lastBlockAtTitle',
    key: 'lastBlockAt',
  },
  {
    cssClass: 'transactions',
    head: 'epoch.transactionsTitle',
    key: 'transactionsCount',
  },
  {
    cssClass: 'output',
    head: 'epoch.outputTitle',
    key: 'output',
  },
];

const EpochList: FC<IEpochListProps> = ({
  currentEpoch,
  title,
  items,
  isLoading,
}) => {
  const displaysItems = items.length > 0;
  return (
    <div className={styles.epochListContainer}>
      {displaysItems && isLoading && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner />
        </div>
      )}
      <Table
        title={title}
        columns={columns({ currentEpoch })}
        rows={items.map((i) =>
          Object.assign({}, i, { key: 'epoch-' + i.number })
        )}
        withoutHeaders={!displaysItems && isLoading}
      />
    </div>
  );
};

export default observer(EpochList);
