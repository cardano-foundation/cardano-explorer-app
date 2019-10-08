import classnames from 'classnames';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, FC } from 'react';
import { MouseEvent } from 'react';
import { getColorFromRange } from '../../../utils/colors';
import { IStakePoolTooltipProps } from '../types';
import styles from './StakePoolTooltip.scss';

const CloseCrossIcon = require('../../../static/assets/images/stake-pools/close-cross.svg');
const ExternalLinkIcon = require('../../../static/assets/images/stake-pools/link-ic.svg');

const StakePoolTooltip: FC<IStakePoolTooltipProps> = ({
  stakePool,
  onClose,
  position,
  color,
}) => {
  const {
    name,
    description,
    ticker,
    url,
    ranking,
    controlledStake,
    profitMargin,
    performance,
    retiring,
  } = stakePool;

  const darken = 1;
  const alpha = 0.3;
  const reverse = true;
  const retirementFromNow = retiring ? moment(retiring).fromNow(true) : '';
  const colorBand = getColorFromRange(ranking);

  const colorBandStyle = {
    backgroundColor: colorBand,
  };

  const stakePoolTooltipStyles = classnames([
    styles.stakePoolTooltipContainer,
    styles[position.vertical],
    styles[position.horizontal],
  ]);

  const handleOuterClick = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    if (tooltipNode.current && !tooltipNode.current.contains(target)) {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener('click', handleOuterClick);
    return () => {
      document.body.removeEventListener('click', handleOuterClick);
    };
  }, [handleOuterClick]);

  const tooltipNode = useRef<HTMLDivElement>(null);

  return (
    <div className={stakePoolTooltipStyles} ref={tooltipNode}>
      <div className={styles.colorBand} style={colorBandStyle} />
      <div className={styles.container}>
        <h3 className={styles.name}>{name}</h3>
        <button className={styles.closeButton} onClick={() => onClose()}>
          <CloseCrossIcon />
        </button>
        <div className={styles.ticker}>{ticker}</div>
        {retiring && (
          <div className={styles.retirement}>
            Retiring in {retirementFromNow}
          </div>
        )}
        <div className={styles.description}>{description}</div>
        <a className={styles.url} href={url} target="_blank">
          <span className={styles.urlContent}>{url}</span>
          <ExternalLinkIcon className={styles.urlIcon} />
        </a>
        <dl className={styles.table}>
          <dt>Ranking</dt>
          <dd className={styles.ranking}>
            <span
              style={{
                background: getColorFromRange(ranking, { darken, alpha }),
              }}
            >
              {ranking}
            </span>
          </dd>
          <dt>ControlledStake</dt>
          <dd className={styles.controlledStake}>
            <span
              style={{
                background: getColorFromRange(controlledStake, {
                  alpha,
                  darken,
                }),
              }}
            >
              {controlledStake}%
            </span>
          </dd>
          <dt>ProfitMargin</dt>
          <dd className={styles.profitMargin}>
            <span
              style={{
                background: getColorFromRange(profitMargin, {
                  alpha,
                  darken,
                  reverse,
                }),
              }}
            >
              {profitMargin}%
            </span>
          </dd>
          <dt>Performance</dt>
          <dd className={styles.performance}>
            <span
              style={{
                background: getColorFromRange(performance, {
                  alpha,
                  darken,
                  reverse,
                }),
              }}
            >
              {performance}%
            </span>
          </dd>
        </dl>
      </div>
    </div>
  );
};
export default StakePoolTooltip;
