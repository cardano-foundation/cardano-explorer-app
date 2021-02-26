import React, { useRef, useState } from 'react';
import { addEllipsis } from '../../../lib/addEllipsis';
import Tooltip, { ContentContainer } from '../../../widgets/tooltip/Tooltip';
import { TOKEN_LENGTH_TO_SCROLL } from '../constants';
import { IAsset, IToken } from '../types';
import styles from './TransactionTokenList.module.scss';

const TokenList = (props: { tokens: IToken[]; }) => {
  const [tooltipPosition, setTooltipPosition] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [fingerprint, setFingerprint] = useState('test');
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseOver = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    value: IAsset['fingerprint']
  ) => {
    const { offsetLeft } = event.currentTarget;
    setTooltipPosition((prevState) => ({
      ...prevState,
      left: offsetLeft + 120 * 0.75,
      top: containerRef.current?.offsetTop! + 75,
    }));
    setFingerprint(value);
    setIsVisible(true);
  };

  return (
    <>
      {isVisible && (
        <div style={tooltipPosition} className={styles.tooltip}>
          <ContentContainer label={fingerprint} />
        </div>
      )}

      {props.tokens.length > TOKEN_LENGTH_TO_SCROLL ? (
        <div ref={containerRef} className={styles.scrollableTokenList}>
          {props.tokens.map((t) => (
            <span
              onMouseEnter={(event) => handleMouseOver(event, t.asset.fingerprint)}
              onMouseOut={() => {
                setIsVisible(false);
              }}
              className={styles.token}
            >`
              {`${t.quantity} ${addEllipsis(t.asset.fingerprint, 9, 4)}`}{' '}
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
                    label={t.asset.fingerprint}
                  />
                }
              >
                {`${t.quantity} ${addEllipsis(t.asset.fingerprint, 9, 4)}`}
              </Tooltip>
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default TokenList;
