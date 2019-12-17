import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import Table, { IColumnDefinition } from '../../../widgets/table/Table';
import { useNavigationFeatureOptionally } from '../../navigation';
import { IBlockOverview } from '../types';
import styles from './BlockList.scss';

export interface IBlockListProps {
  ignoreLinksToEpoch?: number;
  isLoading: boolean;
  items: Array<IBlockOverview>;
  title: string;
}

interface IColumnsProps {
  ignoreLinksToEpoch?: number;
  onEpochNumberClicked: (epochNo: IBlockOverview['epoch']) => void;
  onBlockNumberClicked: (id: IBlockOverview['id']) => void;
}

const columns = (
  props: IColumnsProps
): Array<IColumnDefinition<IBlockOverview>> => [
  {
    cellOnClick: (row: IBlockOverview) =>
      props.onEpochNumberClicked?.(row.epoch),
    cellValue: (row: IBlockOverview) => `${row.epoch} / ${row.slotWithinEpoch}`,
    cssClass: 'epoch',
    head: 'Epoch / Slot',
    isCellClickable: (row: IBlockOverview) =>
      props.ignoreLinksToEpoch !== row.epoch,
    key: 'epochsSlots',
  },
  {
    cellOnClick: (row: IBlockOverview) => props.onBlockNumberClicked?.(row.id),
    cssClass: 'blocksSlots',
    head: 'Block',
    key: 'number',
  },
  {
    cellValue: (row: IBlockOverview) =>
      dayjs(row.createdAt).format('YYYY/MM/DD HH:mm:ss'),
    cssClass: 'createdAt',
    head: 'Created At',
    key: 'createdAt',
  },
  {
    cssClass: 'transactions',
    head: 'Transactions',
    key: 'transactionsCount',
  },
  {
    cssClass: 'output',
    head: 'Output (A)',
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

const BlockList: FC<IBlockListProps> = props => {
  const navigation = useNavigationFeatureOptionally();
  const displaysItems = props.items.length > 0;
  return (
    <div className={styles.blockListContainer}>
      {displaysItems && props.isLoading && (
        <div className={styles.loadingOverlay}>
          <LoadingSpinner />
        </div>
      )}
      <Table
        title={props.title}
        columns={columns({
          ignoreLinksToEpoch: props.ignoreLinksToEpoch,
          onBlockNumberClicked: id =>
            navigation?.actions.goToBlockDetailsPage.trigger({
              id,
            }),
          onEpochNumberClicked: epochNo => {
            if (epochNo !== '-') {
              navigation?.actions.goToEpochDetailsPage.trigger({
                number: epochNo,
              });
            }
          },
        })}
        rows={props.items.map(i => Object.assign({}, i, { key: i.id }))}
        withoutHeaders={!displaysItems && props.isLoading}
      />
    </div>
  );
};

export default observer(BlockList);
