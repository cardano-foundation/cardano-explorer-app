import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import DividerWithTitle from '../../widgets/divider-with-title/components/DividerWithTitle';
import Pagination from '../../widgets/pagination/components/Pagination';
import TransactionInfo, { ITransactionInfoProps } from './TransactionInfo';
import styles from './TransactionList.scss';

export interface ITransactionListProps {
  items: Array<ITransactionInfoProps>;
  title: string;
}

const TransactionList = (props: ITransactionListProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setPage(0);
  };

  return (
    <div className={styles.transactionListContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      {props.items.map((item, index) => (
        <div key={`transaction_${index}`} className={styles.transactionListRow}>
          <TransactionInfo {...item} />
        </div>
      ))}
      <Pagination
        count={props.items.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default observer(TransactionList);
