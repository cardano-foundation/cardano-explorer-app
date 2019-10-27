import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { FC } from 'react';
import Table from '../../widgets/table/components/Table';
import { IColumnDefinition } from '../../widgets/table/types/Table';
import styles from './BlockList.scss';

export interface IBlockListRowProps {
  block: number;
  createdAt: number;
  createdBy: string;
  epoch: number;
  output: number;
  size: number;
  slots: number;
  transactions: number;
}

export interface IBlockListProps {
  title: string;
  items: Array<IBlockListRowProps>;
}

const columns: Array<IColumnDefinition<IBlockListRowProps>> = [
  {
    cssClass: 'epoch',
    head: 'Epoch',
    key: 'epoch',
  },
  {
    cssClass: 'blocksSlots',
    head: 'Block / Slot',
    key: 'block',
  },
  {
    cellValue: (row: IBlockListRowProps) =>
      moment(row.createdAt).format('YYYY/MM/DD HH:mm:ss'),
    cssClass: 'createdAt',
    head: 'Created At',
    key: 'createdAt',
  },
  {
    cssClass: 'transactions',
    head: 'Transactions',
    key: 'transactions',
  },
  {
    cssClass: 'output',
    head: 'Output (₳)',
    key: 'output',
  },
  {
    cssClass: 'size',
    head: 'Size (Bytes)',
    key: 'size',
  },
  {
    cssClass: 'createdBy',
    head: 'Created By',
    key: 'createdBy',
  },
];

const BlockList: FC<IBlockListProps> = ({ title, items }) => (
  <div className={styles.blockListContainer}>
    <Table title={title} columns={columns} rows={items} withShowMore />
  </div>
);

export default observer(BlockList);
