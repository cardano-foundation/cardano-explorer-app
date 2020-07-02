import classnames from 'classnames';
import React, { useState } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { useI18nFeature } from '../../features/i18n/context';
import styles from './Pagination.module.scss';

const FirstPageArrow = require('../../public/assets/images/arrow-beginning.svg');
const LastPageArrow = require('../../public/assets/images/arrow-end.svg');

export interface IPaginationProps {
  currentPage: number;
  onChangePage: (page: number) => void;
  totalPages: number;
}

export const Pagination = (props: IPaginationProps) => {
  const { totalPages, onChangePage, currentPage } = props;
  const { translate } = useI18nFeature().store;
  const isFirstButtonDisabled = currentPage === 1;
  const isLastButtonDisabled = currentPage >= totalPages;
  const isLeftButtonDisabled = currentPage <= 1;
  const isRightButtonDisabled = currentPage >= totalPages;

  return (
    <div className={styles.paginationContainer}>
      <Button
        className={classnames([
          styles.leftArrow,
          isFirstButtonDisabled
            ? styles.disabledFirstLeftArrow
            : styles.firstLeftArrow,
          isFirstButtonDisabled ? styles.disabled : null,
        ])}
        disabled={isFirstButtonDisabled}
        label=""
        onClick={() => onChangePage(0)}
      />
      <FirstPageArrow className={styles.firstArrow} />
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
          <input
            value={currentPage}
            className={styles.paginationInputStyles}
            onKeyPress={(e) => {
              const targetEl = e.currentTarget;
              const isNumericKey = /^\d+$/.test(e.key);
              if (!isNumericKey) {
                e.preventDefault();
                e.stopPropagation();
                if (e.key === 'Enter') {
                  const page = Math.max(
                    1,
                    Math.min(parseInt(targetEl.value), totalPages)
                  );
                  onChangePage(page);
                }
              }
            }}
            size={currentPage.toString().length + 1}
            maxLength={totalPages.toString().length}
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
          isLastButtonDisabled
            ? styles.disabledSecondRightArrow
            : styles.secondRightArrow,
          isLastButtonDisabled ? styles.disabled : null,
        ])}
        disabled={isLastButtonDisabled}
        label=""
        onClick={() => onChangePage(totalPages)}
      />
      <LastPageArrow className={styles.lastArrow} />
    </div>
  );
};

export default Pagination;
