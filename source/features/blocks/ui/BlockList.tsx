import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { isNumber } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import Table, { IColumnDefinition } from '../../../widgets/table/Table';
import { getEpochRoute } from '../../epochs/helpers';
import { LocalizedLink } from '../../navigation/ui/LocalizedLink';
import { getBlockRoute } from '../helpers';
import { IBlockOverview } from '../types';
import styles from './BlockList.module.scss';

dayjs.extend(utc);

export interface IBlockListProps {
  ignoreLinksToEpoch?: boolean;
  isLoading?: boolean;
  items: Array<IBlockOverview>;
  title: string;
}

const columns = (
  ignoreLinksToEpoch?: boolean
): Array<IColumnDefinition<IBlockOverview>> => {
  const linksDisabled = ignoreLinksToEpoch;
  return [
    {
      cellRender: (row: IBlockOverview) => {
        return isNumber(row.epoch) &&
          !linksDisabled ? (
          <LocalizedLink href={getEpochRoute(row.epoch)}>
            {row.epoch}
          </LocalizedLink>
        ) : (
          <span>{row.epoch}</span>
        );
      },
      cellValue: (row: IBlockOverview) => row,
      cssClass: 'epoch',
      head: 'block.epochTitle',
      key: 'epoch',
    },
    {
      cellRender: (row: IBlockOverview) => {
        return isNumber(row.slotNo) &&
          !linksDisabled ? (
          <LocalizedLink href={getBlockRoute(row.id)}>
            {row.slotNo}
          </LocalizedLink>
        ) : (
          <span>{row.slotNo}</span>
        );
      },
      cellValue: (row: IBlockOverview) => row,
      cssClass: 'slotNo',
      head: 'block.slotNo',
      key: 'slot',
    },
    {
      cellRender: (row: IBlockOverview) => (
        <LocalizedLink href={getBlockRoute(row.id)}>{row.number}</LocalizedLink>
      ),
      cellValue: (row: IBlockOverview) => row,
      cssClass: 'blocksSlots',
      head: 'block.blockTitle',
      key: 'number',
    },
    {
      cellValue: (row: IBlockOverview) =>
        dayjs.utc(row.createdAt).format('YYYY/MM/DD HH:mm:ss'),
      cssClass: 'createdAt',
      head: 'block.createdAtTitle',
      key: 'createdAt',
    },
    {
      cssClass: 'transactions',
      head: 'block.transactionsTitle',
      key: 'transactionsCount',
    },
    {
      cssClass: 'output',
      head: 'block.outputTitle',
      key: 'output',
    },
    {
      cssClass: 'size',
      head: 'block.sizeTitle',
      key: 'size',
    },
    {
      cssClass: 'createdBy',
      head: 'block.createdByTitle',
      key: 'createdBy',
    },
  ];
};

const BlockList: FC<IBlockListProps> = (props) => {
  const displaysItems = props.items.length > 0;
  const ignoreLinksToEpoch = props.ignoreLinksToEpoch;
  return (
    <div className={styles.blockListContainer}>
      {displaysItems && props.isLoading && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner />
        </div>
      )}
      <Table
        title={props.title}
        columns={columns(ignoreLinksToEpoch)}
        rows={props.items.map((i) => Object.assign({}, i, { key: i.id }))}
        withoutHeaders={!displaysItems && props.isLoading}
      />
    </div>
  );
};

export default observer(BlockList);
