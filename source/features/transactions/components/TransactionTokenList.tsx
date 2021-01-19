import React, { useState, useRef } from 'react';
import { IToken } from '../types';
import Tooltip, { ContentContainer } from '../../../widgets/tooltip/Tooltip';
import { TOKEN_LENGTH_TO_SCROLL } from '../constants';
import styles from './TransactionTokenList.module.scss';

const TokenList = (props: { tokens: IToken[]; tooltipLabel?: string }) => {
  const [tooltipPosition, setTooltipPosition] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [policy, setPolicy] = useState('test');
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseOver = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    policyId: string
  ) => {
    const { offsetLeft } = event.currentTarget;
    setTooltipPosition((prevState) => ({
      ...prevState,
      top: containerRef.current?.offsetTop! + 75,
      left: offsetLeft + 120 * 0.75,
    }));
    setPolicy(policyId), setIsVisible(true);
  };

  return (
    <>
      {isVisible && (
        <div style={tooltipPosition} className={styles.tooltip}>
          <ContentContainer label={props.tooltipLabel || '-'} body={policy} />
        </div>
      )}

      {props.tokens.length > TOKEN_LENGTH_TO_SCROLL ? (
        <div ref={containerRef} className={styles.scrollableTokenList}>
          {props.tokens.map((t) => (
            <span
              onMouseEnter={(event) => handleMouseOver(event, t.policyId)}
              onMouseOut={() => {
                setIsVisible(false);
              }}
              className={styles.token}
            >
              {`${t.quantity} ${t.assetName}`}{' '}
            </span>
          ))}
        </div>
      ) : (
        <div ref={containerRef} className={styles.tokenList}>
          {props.tokens.map((t) => (
            <span className={styles.token}>
              <Tooltip
                content={
                  <ContentContainer
                    label={props.tooltipLabel || '-'}
                    body={t.policyId}
                  />
                }
              >
                {`${t.quantity} ${t.assetName}`}
              </Tooltip>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default TokenList;
