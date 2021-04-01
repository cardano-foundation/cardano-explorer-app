import React, { useRef, useState } from 'react';
import { addEllipsis } from '../../../lib/addEllipsis';
import Tooltip, { ContentContainer } from '../../../widgets/tooltip/Tooltip';
import { TOKEN_LENGTH_TO_SCROLL } from '../constants';
import { IAsset, IToken } from '../types';
import styles from './TransactionTokenList.module.scss';

const TokenList = (props: { tokens: IToken[]; }) => {
  const [tooltipPosition, setTooltipPosition] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [asset, setAsset] = useState<IAsset>({
    assetName: '',
    description: '',
    fingerprint: '',
    policyId: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseOver = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: IAsset
  ) => {
    const { offsetLeft } = event.currentTarget;
    setTooltipPosition((prevState) => ({
      ...prevState,
      left: offsetLeft + 120 * 0.75,
      top: containerRef.current?.offsetTop! + 75,
    }));
    setAsset(item);
    setIsVisible(true);
  };

  return (
    <>
      {isVisible && (
        <div style={tooltipPosition} className={styles.tooltip}>
          <ContentContainer
            label={asset.fingerprint}
            body={
              <ul>
                <li><strong>Ticker</strong>: {asset.ticker}</li>
                <li><strong>Name</strong>: {asset.name}</li>
                <li><strong>Description</strong>: {asset.description}</li>
                <li><strong>Policy ID</strong>: {asset.policyId}</li>
                <li><strong>Asset Name</strong>: {asset.assetName}</li>
            </ul>}
          />
        </div>
      )}

      {props.tokens.length > TOKEN_LENGTH_TO_SCROLL ? (
        <div ref={containerRef} className={styles.scrollableTokenList}>
          {props.tokens.map((t) => (
            <span
              onMouseEnter={(event) => handleMouseOver(event, t.asset)}
              onMouseOut={() => {
                setIsVisible(false);
              }}
              className={styles.token}
            >
              {`${t.quantity} ${t.asset.ticker || addEllipsis(t.asset.fingerprint, 9, 4)}`}{' '}
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
                    body={<>
                      <ul>
                        <li><strong>Ticker</strong>: {t.asset.ticker}</li>
                        <li><strong>Name</strong>: {t.asset.name}</li>
                        <li><strong>Description</strong>: {t.asset.description}</li>
                        <li><strong>Policy ID</strong>: {t.asset.policyId}</li>
                        <li><strong>Asset Name</strong>: {t.asset.assetName}</li>
                      </ul>
                    </>}
                  />
                }
              >
                {`${t.quantity} ${t.asset.ticker || addEllipsis(t.asset.fingerprint, 9, 4)}`}
              </Tooltip>
            </span>
            )
          )}
        </div>
      )}
    </>
  );
};

export default TokenList;
