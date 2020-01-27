import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { IColumnDefinition } from './Table';
import styles from './TableBodyRow.module.scss';

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
          cellContent = column.cellValue
            ? column.cellRender(column.cellValue(row))
            : column.cellRender(row[column.key]);
        } else {
          cellContent = column.cellRender;
        }
      }
      const isCellClickable =
        !column.isCellClickable || column.isCellClickable(row);
      return (
        <div key={`column_${index}`} className={column.cssClass}>
          {isCellClickable && column.cellOnClick ? (
            <span
              className={styles.clickableCell}
              onClick={() => {
                column.cellOnClick?.(row);
              }}
            >
              {cellContent}
            </span>
          ) : (
            <span>{cellContent}</span>
          )}
        </div>
      );
    })}
  </div>
);

export default observer(TableBodyRow);
