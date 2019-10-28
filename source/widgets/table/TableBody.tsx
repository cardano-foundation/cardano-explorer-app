import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { IColumnDefinition } from './Table';
import styles from './TableBody.scss';
import TableBodyRow from './TableBodyRow';

export interface ITableBodyProps {
  columns: Array<IColumnDefinition>;
  rows: Array<any>;
}

const TableBody: FC<ITableBodyProps> = ({ columns, rows }) => (
  <div className={styles.bodyContainer}>
    {rows.map((row, rowIndex) => (
      <TableBodyRow key={`row_${rowIndex}`} columns={columns} row={row} />
    ))}
  </div>
);

export default observer(TableBody);
