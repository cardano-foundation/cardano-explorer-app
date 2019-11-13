import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { FC } from 'react';
import CircularProgress, {
  CircularProgressSize,
} from '../../../widgets/circular-progress/CircularProgress';
import Table, { IColumnDefinition } from '../../../widgets/table/Table';
import { useNavigationFeatureOptionally } from '../../navigation';
import styles from './EpochList.scss';

export interface IEpochListRowProps {
  blocksCount: number;
  lastBlockAt?: Date;
  number: number;
  output: string;
  percentage?: number;
  slotsCount: number;
  startedAt: Date;
  transactionsCount: string;
}

export interface IEpochListProps {
  title: string;
  items: Array<IEpochListRowProps>;
  isLoading: boolean;
}

interface IColumnsProps {
  onEpochNumberClicked: (epochNo: number) => void;
}

const columns = (
  props: IColumnsProps
): Array<IColumnDefinition<IEpochListRowProps>> => [
  {
    cellOnClick: (row: IEpochListRowProps) =>
      props.onEpochNumberClicked?.(row.number),
    cellRender: (value: any) => {
      if (value.lastBlockAt) {
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
      epoch: row.number,
      lastBlockAt: row.lastBlockAt,
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
    cellRender: (value: any) =>
      moment(value.lastBlockAt).format('YYYY/MM/DD HH:mm:ss'),
    cellValue: (row: IEpochListRowProps) => ({
      lastBlockAt: row.lastBlockAt,
    }),
    cssClass: 'lastBlockAt',
    head: 'Last Block at',
    key: 'lastBlockAt',
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

const EpochList: FC<IEpochListProps> = ({ title, items, isLoading }) => {
  const navigation = useNavigationFeatureOptionally();
  return (
    <div className={styles.epochListContainer}>
      <Table
        title={title}
        columns={columns({
          onEpochNumberClicked: epochNo =>
            navigation?.actions.goToEpochDetailsPage.trigger({
              number: epochNo,
            }),
        })}
        rows={items.map(i => Object.assign(i, { key: i.number }))}
        withShowMore={!isLoading}
        withoutHeaders={isLoading}
      />
    </div>
  );
};

export default observer(EpochList);
