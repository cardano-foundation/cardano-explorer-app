import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import DividerWithTitle from '../divider-with-title/DividerWithTitle';
import styles from './Table.module.scss';
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
  cellOnClick?: (row: CE) => void;
  cssClass?: string;
  isCellClickable?: (row: CE) => boolean;
  head: CellHeaderTemplate;
  key: string;
}

export interface ITableProps {
  title?: string;
  columns: Array<IColumnDefinition>;
  footer?: React.ReactNode;
  rows: Array<{ key: string | number }>;
  withoutHeaders?: boolean;
}

const Table: FC<ITableProps> = ({
  title,
  columns,
  footer,
  rows,
  withoutHeaders,
}) => {
  return (
    <div className={styles.tableContainer}>
      {title && (
        <div className={styles.title}>
          <DividerWithTitle title={title} />
        </div>
      )}
      {!withoutHeaders && <TableHead columns={columns} />}
      <TableBody columns={columns} rows={rows} />
      {footer}
    </div>
  );
};

export default observer(Table);
