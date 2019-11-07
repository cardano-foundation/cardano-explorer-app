import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import DividerWithTitle from '../divider-with-title/DividerWithTitle';
import Pagination from '../pagination/Pagination';
import styles from './Table.scss';
import TableBody from './TableBody';
import TableHead from './TableHead';

export type Transform<D = any, T = any> = (d: D) => T;
export type CellHeaderTemplate = string | React.ReactNode;
export type CellTemplate<T = any, C = any> =
  | string
  | Transform<T, C>
  | React.ReactNode;

export interface IColumnDefinition<R = any, CE = any, CO = any> {
  cellRender?: CellTemplate<CE, CO>;
  cellValue?: Transform<R, CE>;
  cssClass?: string;
  head: CellHeaderTemplate;
  key: string;
}

export interface ITableProps {
  title?: string;
  columns: Array<IColumnDefinition>;
  rows: Array<{ key: string | number }>;
  withoutHeaders?: boolean;
  withShowMore?: boolean;
  withPagination?: boolean;
  rowsPerPage?: number;
}

const Table: FC<ITableProps> = ({
  title,
  columns,
  rows,
  withoutHeaders,
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
  const hasMoreRows = rowsPerPage && !(rowsPerPage > renderedRows.length);
  return (
    <div className={styles.tableContainer}>
      {title && (
        <div className={styles.title}>
          <DividerWithTitle title={title} />
        </div>
      )}
      {!withoutHeaders && <TableHead columns={columns} />}
      <TableBody columns={columns} rows={renderedRows} />
      {withShowMore && (
        <div className={styles.showMore}>
          {hasMoreRows && (
            <Button
              className={styles.showMoreButton}
              label="Show more items"
              onClick={() => null}
            />
          )}
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
