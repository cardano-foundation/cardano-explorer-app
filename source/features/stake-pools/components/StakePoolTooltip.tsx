import { useEffect, useCallback, useRef, RefObject } from 'react';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';
import { MouseEvent } from 'react';
import moment from 'moment';
import styles from './StakePoolTooltip.scss';
import { IStakePoolTooltipProps } from '../types';
import { getColorFromRange } from '../../../utils/colors';

export const StakePoolTooltip = ({
  stakePool,
  onClose,
  position,
  color,
}: IStakePoolTooltipProps) => {
  const {
    name,
    description,
    slug,
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
    if (tooltipNode.current && !tooltipNode.current.contains(target)) onClose();
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
          {/*<SVGInline svg={closeCross} />*/}
          𝑿
        </button>
        <div className={styles.slug}>{slug}</div>
        {retiring && (
          <div className={styles.retirement}>
            Retiring in {retirementFromNow}
          </div>
        )}
        <div className={styles.description}>{description}</div>
        {/*<button className={styles.url} onClick={() => onOpenExternalLink(url)}>
          <span className={styles.urlContent}>{url}</span>
          <SVGInline svg={externalLinkIcon} />
        </button>*/}
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
                  darken,
                  alpha,
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
                  darken,
                  alpha,
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
                  darken,
                  alpha,
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
