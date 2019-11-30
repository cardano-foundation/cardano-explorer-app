import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { FC } from 'react';
import CircularProgress, {
  CircularProgressSize,
} from '../../../widgets/circular-progress/CircularProgress';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import Table, { IColumnDefinition } from '../../../widgets/table/Table';
import { useNavigationFeatureOptionally } from '../../navigation';
import { IEpochOverview } from '../types';
import styles from './EpochList.scss';

export interface IEpochListProps {
  title: string;
  items: Array<IEpochOverview>;
  isLoading: boolean;
}

interface IColumnsProps {
  onEpochNumberClicked: (epochNo: number) => void;
}

const columns = (
  props: IColumnsProps
): Array<IColumnDefinition<IEpochOverview>> => [
  {
    cellOnClick: (row: IEpochOverview) =>
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
    cellValue: (row: IEpochOverview) => ({
      epoch: row.number,
      lastBlockAt: row.lastBlockAt,
      percentage: row.percentage,
    }),
    cssClass: 'epoch',
    head: 'Epoch',
    key: 'number',
  },
  {
    cellValue: (row: IEpochOverview) =>
      `${row.blocksCount} / ${row.slotsCount}`,
    cssClass: 'blocksSlots',
    head: 'Blocks / Slots',
    key: 'blocksSlots',
  },
  {
    cellValue: (row: IEpochOverview) =>
      moment(row.startedAt).format('YYYY/MM/DD HH:mm:ss'),
    cssClass: 'startedAt',
    head: 'Started At',
    key: 'startedAt',
  },
  {
    cellRender: (value: any) =>
      moment(value.lastBlockAt).format('YYYY/MM/DD HH:mm:ss'),
    cellValue: (row: IEpochOverview) => ({
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
        columns={columns({
          onEpochNumberClicked: epochNo =>
            navigation?.actions.goToEpochDetailsPage.trigger({
              number: epochNo,
            }),
        })}
        rows={items.map(i => Object.assign({}, i, { key: i.number }))}
        withoutHeaders={!displaysItems && isLoading}
      />
    </div>
  );
};

export default observer(EpochList);
