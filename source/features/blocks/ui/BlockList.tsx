import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { FC } from 'react';
import Table, { IColumnDefinition } from '../../../widgets/table/Table';
import { useNavigationFeatureOptionally } from '../../navigation';
import styles from './BlockList.scss';

export interface IBlockListRowProps {
  number: number | null;
  createdAt: number;
  createdBy: string;
  id: string;
  epoch: number;
  output: number;
  size: number;
  slotWithinEpoch: number | null;
  transactions: number;
}

export interface IBlockListProps {
  title: string;
  items: Array<IBlockListRowProps>;
  isLoading: boolean;
}

interface IColumnsProps {
  onEpochNumberClicked: (epochNo: number) => void;
  onBlockNumberClicked: (blockNo: number) => void;
}

const columns = (
  props: IColumnsProps
): Array<IColumnDefinition<IBlockListRowProps>> => [
  {
    cellOnClick: (row: IBlockListRowProps) =>
      props.onEpochNumberClicked?.(row.epoch),
    cellValue: (row: IBlockListRowProps) =>
      `${row.epoch} / ${row.slotWithinEpoch}`,
    cssClass: 'epoch',
    head: 'Epoch / Slot',
    key: 'epochsSlots',
  },
  {
    cellOnClick: (row: IBlockListRowProps) =>
      props.onBlockNumberClicked?.(row.number),
    cssClass: 'blocksSlots',
    head: 'Block',
    key: 'number',
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

const BlockList: FC<IBlockListProps> = props => {
  const navigation = useNavigationFeatureOptionally();
  return (
    <div className={styles.blockListContainer}>
      <Table
        title={props.title}
        columns={columns({
          onBlockNumberClicked: blockNo =>
            navigation?.actions.goToBlockDetailsByNumber.trigger({
              number: blockNo,
            }),
          onEpochNumberClicked: epochNo =>
            navigation?.actions.goToEpochDetailsPage.trigger({
              number: epochNo,
            }),
        })}
        rows={props.items.map(i => Object.assign(i, { key: i.id }))}
        withoutHeaders={props.isLoading}
        withShowMore={!props.isLoading}
      />
    </div>
  );
};

export default observer(BlockList);
