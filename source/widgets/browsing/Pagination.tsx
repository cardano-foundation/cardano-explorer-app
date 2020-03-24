import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';
import { useI18nFeature } from '../../features/i18n/context';
import styles from './Pagination.module.scss';

export interface IPaginationProps {
  currentPage: number;
  onChangePage: (page: number) => void;
  totalPages: number;
}

const Pagination = (props: IPaginationProps) => {
  const { totalPages, onChangePage, currentPage } = props;
  const { translate } = useI18nFeature().store;
  const isFirstButtonDisabled = currentPage === 0;
  const isLastButtonDisabled = currentPage === totalPages;
  const isLeftButtonDisabled = currentPage <= 1;
  const isRightButtonDisabled = currentPage >= totalPages;
  return (
    <div className={styles.paginationContainer}>
      <Button
        className={classnames([
          styles.leftArrow,
          isFirstButtonDisabled ? styles.disabled : null,
        ])}
        disabled={isFirstButtonDisabled}
        label=""
        onClick={() => onChangePage(0)}
      />
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
        <span className={styles.pageNumber}>
          <Input
            className={styles.paginationInputStyles}
            value={currentPage.toString()}
            onKeyPress={(e: any) => {
              if (e.key === 'Enter') {
                onChangePage(parseInt(e.target.value, 0));
              }
            }}
          />
        </span>
        <span className={styles.pageOf}>{translate('pagination.of')}</span>
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
      <Button
        className={classnames([
          styles.rightArrow,
          isLastButtonDisabled ? styles.disabled : null,
        ])}
        disabled={isLastButtonDisabled}
        label=""
        onClick={() => onChangePage(totalPages)}
      />
    </div>
  );
};

export default observer(Pagination);
