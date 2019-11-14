import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import Pagination from '../../../widgets/pagination/Pagination';
import { useNavigationFeatureOptionally } from '../../navigation';
import TransactionInfo, { ITransactionInfoProps } from './TransactionInfo';
import styles from './TransactionList.scss';

export interface ITransactionListProps {
  items: Array<ITransactionInfoProps>;
  title: string;
}

const TransactionList = (props: ITransactionListProps) => {
  const [page, setPage] = useState(0);
  const navigation = useNavigationFeatureOptionally();
  const handleChangePage = (newPage: number) => setPage(newPage);
  const rowsPerPage = 2;
  const renderedItems = props.items.slice(
    rowsPerPage * page,
    rowsPerPage * (page + 1)
  );

  return (
    <div className={styles.transactionListContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      {renderedItems.map((item, index) => (
        <div key={`transaction_${index}`} className={styles.transactionListRow}>
          <TransactionInfo navigation={navigation?.actions} {...item} />
        </div>
      ))}
      {props.items.length > rowsPerPage && (
        <Pagination
          count={props.items.length}
          onChangePage={handleChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}
    </div>
  );
};

export default observer(TransactionList);
