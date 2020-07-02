import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { IColumnDefinition } from './Table';
import styles from './TableBody.module.scss';
import TableBodyRow from './TableBodyRow';

export interface ITableBodyProps {
  columns: Array<IColumnDefinition>;
  rows: Array<{ key: string | number }>;
}

const TableBody: FC<ITableBodyProps> = ({ columns, rows }) => (
  <div className={styles.bodyContainer}>
    <ReactCSSTransitionGroup
      transitionName="row"
      transitionEnterTimeout={500}
      transitionLeave={false}
    >
      {rows.map((row) => (
        <TableBodyRow key={row.key} columns={columns} row={row} />
      ))}
    </ReactCSSTransitionGroup>
  </div>
);

export default observer(TableBody);
