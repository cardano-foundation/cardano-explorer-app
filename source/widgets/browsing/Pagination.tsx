import classnames from 'classnames';
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
  const isLeftButtonDisabled = currentPage <= 1;
  const isRightButtonDisabled = currentPage >= totalPages;
  return (
    <div className={styles.paginationContainer}>
      <Button
        className={classnames([
          styles.leftArrow,
          isLeftButtonDisabled ? styles.disabled : null,
        ])}
        disabled={isLeftButtonDisabled}
        label=""
        onClick={() => onChangePage(currentPage - 1)}
      />
      <div className={styles.pageInfo}>
        <span className={styles.pageNumber}>{currentPage}</span>
        <span className={styles.pageOf}>of</span>
        <span className={styles.totalPagesNumber}>{totalPages}</span>
      </div>
      <Button
        className={classnames([
          styles.rightArrow,
          isRightButtonDisabled ? styles.disabled : null,
        ])}
        disabled={isRightButtonDisabled}
        label=""
        onClick={() => onChangePage(currentPage + 1)}
      />
    </div>
  );
};

export default observer(Pagination);
