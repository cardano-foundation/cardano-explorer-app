import classnames from 'classnames';
import React, { Component, useRef } from 'react';
import { Button } from 'react-polymorph/lib/components/Button';
import { Input } from 'react-polymorph/lib/components/Input';
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

  public componentDidMount() {
    const inputNodeElement = this.inputPageNode.current.inputElement.current;
    if (inputNodeElement) {
      const offsetWidth = inputNodeElement.offsetWidth;
      const numberOfChars = inputNodeElement.value.length;
      if (numberOfChars === 3) {
        inputNodeElement.style.width = offsetWidth + 10 + 'px';
      } else if (numberOfChars === 4) {
        inputNodeElement.style.width = offsetWidth + 20 + 'px';
      }
    }
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
            <Input
              ref={this.inputPageNode}
              value={currentPage.toString()}
              className={styles.paginationInputStyles}
              onKeyPress={(e: any) => {
                const targetEl = e.target;
                if (!(/^\d+$/.test(e.key))) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.key === 'Enter') {
                    if (targetEl.value.length === 1 || targetEl.value.length === 2) {
                      targetEl.style.width = '20px';
                    } else if (targetEl.value.length === 3) {
                      targetEl.style.width = '30px';
                    } else if (targetEl.value.length === 4) {
                      targetEl.style.width = '40px';
                    }
                    if (targetEl.value && targetEl.value !== '0') {
                      const page = parseInt(targetEl.value, 0);
                      onChangePage(page);
                    } else {
                      onChangePage(currentPage);
                    }
                  }
                } else {
                  if (parseInt(targetEl.value + e.key, 0) > totalPages) {
                    targetEl.value = targetEl.value.slice(0, -1);
                  } else {
                    if ((targetEl.value + e.key).length > 2) {
                      targetEl.style.width = targetEl.offsetWidth + 10 + 'px';
                    }
                  }
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
