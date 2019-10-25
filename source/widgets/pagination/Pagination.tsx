import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import styles from './Pagination.scss';

export interface IPaginationProps {
  count: number;
  onChangePage: (page: number) => void;
  page: number;
  rowsPerPage: number;
}

const Pagination = (props: IPaginationProps) => {
  const { count, onChangePage, page, rowsPerPage } = props;
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <div className={styles.paginationContainer}>
      <Button
        className={styles.leftArrow}
        disabled={page <= 0}
        label=""
        onClick={() => onChangePage(page - 1)}
      />
      <div className={styles.pageInfo}>
        <span className={styles.pageNumber}>{page + 1}</span>
        <span className={styles.pageOf}>of</span>
        <span className={styles.totalPagesNumber}>{totalPages}</span>
      </div>
      <Button
        className={styles.rightArrow}
        disabled={page >= totalPages - 1}
        label=""
        onClick={() => onChangePage(page + 1)}
      />
    </div>
  );
};

export default observer(Pagination);
