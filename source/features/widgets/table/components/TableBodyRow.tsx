import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { IColumnDefinition } from '../types/Table';
import styles from './TableBodyRow.scss';

export interface ITableBodyRowProps {
  columns: Array<IColumnDefinition>;
  row: any;
}

const TableBodyRow: FC<ITableBodyRowProps> = ({ columns, row }) => (
  <div className={styles.row}>
    {columns.map((column, index) => {
      let cellContent = null;

      if (!column.cellValue && !column.cellRender) {
        cellContent = <span>{row[column.key]}</span>;
      } else if (column.cellValue && !column.cellRender) {
        cellContent = <span>{column.cellValue(row)}</span>;
      } else {
        if (column.cellRender instanceof Function) {
          if (column.cellValue) {
            cellContent = (
              <span>{column.cellRender(column.cellValue(row))}</span>
            );
          } else {
            cellContent = <span>{column.cellRender(row[column.key])}</span>;
          }
        } else {
          cellContent = column.cellRender;
        }
      }

      return (
        <div key={`column_${index}`} className={column.cssClass}>
          {cellContent}
        </div>
      );
    })}
  </div>
);

export default observer(TableBodyRow);
