import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Select } from 'react-polymorph/lib/components/Select';
import styles from './Pagination.scss';

export interface IPaginationProps {
  count: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage?: (rows: number) => void;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: Array<number>;
}

const Pagination = (props: IPaginationProps) => {
  const {
    count,
    onChangePage,
    onChangeRowsPerPage,
    page,
    rowsPerPage,
    rowsPerPageOptions,
  } = props;

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.rowsPerPageContainer}>
        <div className={styles.rowsPerPageLabel}>Rows per page:</div>
        <div className={styles.rowsPerPageSelectContainer}>
          <Select
            className={styles.rowsPerPageSelect}
            options={rowsPerPageOptions}
            onChange={(val: string) => {
              if (onChangeRowsPerPage) {
                onChangeRowsPerPage(parseInt(val, 10) || 5);
              }
            }}
          />
        </div>
      </div>
      <div className={styles.rowsRangeContainer}>
        <div className={styles.rowsRange}>
          {rowsPerPage * page + 1} - {rowsPerPage * (page + 1)} of {count}
        </div>
        <Button
          className={styles.leftArrow}
          disabled={page <= 0}
          onClick={() => onChangePage(page - 1)}
        >
          &lt;
        </Button>
        <Button
          className={styles.rightArrow}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          onClick={() => onChangePage(page + 1)}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
};

Pagination.defaultProps = {
  rowsPerPageOptions: [5, 10, 25, 50, 100],
};

export default observer(Pagination);
