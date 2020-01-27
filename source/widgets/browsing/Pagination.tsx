import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import styles from './Pagination.module.scss';

export interface IPaginationProps {
  currentPage: number;
  onChangePage: (page: number) => void;
  totalPages: number;
}

const Pagination = (props: IPaginationProps) => {
  const { totalPages, onChangePage, currentPage } = props;

  return (
    <div className={styles.paginationContainer}>
      <Button
        className={styles.leftArrow}
        disabled={currentPage <= 1}
        label=""
        onClick={() => onChangePage(currentPage - 1)}
      />
      <div className={styles.pageInfo}>
        <span className={styles.pageNumber}>{currentPage}</span>
        <span className={styles.pageOf}>of</span>
        <span className={styles.totalPagesNumber}>{totalPages}</span>
      </div>
      <Button
        className={styles.rightArrow}
        disabled={currentPage >= totalPages}
        label=""
        onClick={() => onChangePage(currentPage + 1)}
      />
    </div>
  );
};

export default observer(Pagination);
