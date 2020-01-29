import React, { FC } from 'react';
import { IColumnDefinition } from './Table';
import styles from './TableHead.module.scss';

export interface ITableHeadProps {
  columns: Array<IColumnDefinition>;
}

const TableHead: FC<ITableHeadProps> = ({ columns }) => (
  <div className={styles.headContainer}>
    {columns.map((column, index) => (
      <div key={`column_${index}`} className={column.cssClass}>
        {column.head}
      </div>
    ))}
  </div>
);

export default TableHead;
