import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import DividerWithTitle from '../../divider-with-title/components/DividerWithTitle';
import Pagination from '../../pagination/components/Pagination';
import { IColumnDefinition } from '../types/Table';
import styles from './Table.scss';
import TableBody from './TableBody';
import TableHead from './TableHead';

export interface ITableProps {
  title?: string;
  columns: Array<IColumnDefinition>;
  rows: Array<any>;
  withShowMore?: boolean;
  withPagination?: boolean;
  rowsPerPage?: number;
}

const Table: FC<ITableProps> = ({
  title,
  columns,
  rows,
  withShowMore,
  withPagination,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(0);
  const handleChangePage = (newPage: number) => setPage(newPage);
  const renderedRows =
    withPagination && rowsPerPage
      ? rows.slice(rowsPerPage * page, rowsPerPage * (page + 1))
      : rows;

  return (
    <div className={styles.tableContainer}>
      {title && (
        <div className={styles.title}>
          <DividerWithTitle title={title} />
        </div>
      )}
      <TableHead columns={columns} />
      <TableBody columns={columns} rows={renderedRows} />
      {withShowMore && (
        <div className={styles.showMore}>
          <Button
            className={styles.showMoreButton}
            label="Show more items"
            onClick={() => null}
          />
        </div>
      )}
      {withPagination && (
        <Pagination
          count={rows.length}
          onChangePage={handleChangePage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}
    </div>
  );
};

Table.defaultProps = {
  rowsPerPage: 5,
};

export default observer(Table);
