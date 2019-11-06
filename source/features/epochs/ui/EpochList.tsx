import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { FC } from 'react';
import CircularProgress, {
  CircularProgressSize,
} from '../../../widgets/circular-progress/CircularProgress';
import Table, { IColumnDefinition } from '../../../widgets/table/Table';
import styles from './EpochList.scss';

export interface IEpochListRowProps {
  blocksCount: number;
  endedAt?: Date;
  number: number;
  output: string;
  percentage?: number;
  slotsCount: number;
  startedAt: Date;
  status: string;
  transactionsCount: string;
}

export interface IEpochListProps {
  title: string;
  items: Array<IEpochListRowProps>;
}

const columns: Array<IColumnDefinition<IEpochListRowProps>> = [
  {
    cellRender: (value: any) => {
      if (value.endedAt) {
        return value.epoch;
      }

      return (
        <CircularProgress
          percentage={value.percentage}
          size={CircularProgressSize.SMALL}
          showText
          text={value.epoch}
        />
      );
    },
    cellValue: (row: IEpochListRowProps) => ({
      endedAt: row.endedAt,
      epoch: row.number,
      percentage: row.percentage,
    }),
    cssClass: 'epoch',
    head: 'Epoch',
    key: 'number',
  },
  {
    cellValue: (row: IEpochListRowProps) =>
      `${row.blocksCount} / ${row.slotsCount}`,
    cssClass: 'blocksSlots',
    head: 'Blocks / Slots',
    key: 'blocksSlots',
  },
  {
    cellValue: (row: IEpochListRowProps) =>
      moment(row.startedAt).format('YYYY/MM/DD HH:mm:ss'),
    cssClass: 'startedAt',
    head: 'Started At',
    key: 'startedAt',
  },
  {
    cellRender: (value: any) => {
      if (value.endedAt) {
        return moment(value.endedAt).format('YYYY/MM/DD HH:mm:ss');
      }
      return value.status;
    },
    cellValue: (row: IEpochListRowProps) => ({
      endedAt: row.endedAt,
      status: row.status,
    }),
    cssClass: 'endedAt',
    head: 'Ended At',
    key: 'endedAt',
  },
  {
    cssClass: 'transactions',
    head: 'Transactions',
    key: 'transactionsCount',
  },
  {
    cssClass: 'output',
    head: 'Output (₳)',
    key: 'output',
  },
];

const EpochList: FC<IEpochListProps> = ({ title, items }) => (
  <div className={styles.epochListContainer}>
    <Table
      title={title}
      columns={columns}
      rows={items.map(i => Object.assign(i, { key: i.number }))}
      withShowMore
    />
  </div>
);

export default observer(EpochList);
