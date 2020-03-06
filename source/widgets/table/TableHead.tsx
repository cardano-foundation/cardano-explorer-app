import React, { FC } from 'react';
import { useI18nFeature } from '../../features/i18n/context';
import { IColumnDefinition } from './Table';
import styles from './TableHead.module.scss';

export interface ITableHeadProps {
  columns: Array<IColumnDefinition>;
}

const TableHead: FC<ITableHeadProps> = ({ columns }) => {
  const { translate } = useI18nFeature().store;
  return (
    <div className={styles.headContainer}>
      {columns.map((column, index) => (
        <div key={`column_${index}`} className={column.cssClass}>
          {column.head && translate(column.head.toString())}
        </div>
      ))}
    </div>
  );
};

export default TableHead;
