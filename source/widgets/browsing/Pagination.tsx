import classnames from 'classnames';
import React, { Component, RefObject, useRef } from 'react';
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

export default class Pagination extends Component<IPaginationProps> {
  public inputPageNode: any = useRef<HTMLSpanElement>();

  public componentDidUpdate(prev: IPaginationProps) {
    const page = prev.currentPage.toString();
    if (page !== this.inputPageNode.current.innerHTML) {
      this.inputPageNode.current.innerHTML = page;
    }
    this.inputPageNode.current.blur();
  }

  public render() {
    const { totalPages, onChangePage, currentPage } = this.props;
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
            <span
              ref={this.inputPageNode}
              contentEditable={true}
              className={styles.paginationInputStyles}
              onKeyPress={(e: any) => {
                if (e.key === 'Enter') {
                  if (e.target.innerHTML) {
                    const page = parseInt(e.target.innerHTML, 0);
                    onChangePage(page);
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }
              }}
            >
              {currentPage}
            </span>
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
  }
}
