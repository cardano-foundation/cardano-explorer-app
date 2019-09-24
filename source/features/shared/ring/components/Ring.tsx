import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './Ring.scss';

const RingPin = require('../../../../static/assets/images/epoch/epoch-filled.svg');

export enum RingSize {
  SMALL = 'small',
  BIG = 'big',
}

export interface IRingProps {
  percentage?: number;
  size: RingSize;
  showText?: boolean;
  text?: any;
}

const Ring = (props: IRingProps) => {
  const { percentage = 0, size, showText, text } = props;
  const sqSize = size === RingSize.SMALL ? 36 : 120;
  const strokeWidth = size === RingSize.SMALL ? 2 : 4;
  const percentageDegree = 3.6 * Math.min(percentage, 100);
  const rotateDegree = percentageDegree + 44.99;
  let percentageCircleStyle = null;
  if (percentage <= 50) {
    percentageCircleStyle = {
      backgroundImage: `linear-gradient(225deg, transparent 50%, #404250 50%), linear-gradient(${rotateDegree}deg, #1fc1c3 50%, #404250 50%)`,
    };
  } else {
    percentageCircleStyle = {
      backgroundImage: `linear-gradient(225deg, #1fc1c3 50%, transparent 50%), linear-gradient(${rotateDegree}deg, #1fc1c3 50%, #404250 50%)`,
    };
  }

  return (
    <div className={styles.ringContainer}>
      <div
        className={styles.outsideCircle}
        style={{ width: sqSize, height: sqSize, ...percentageCircleStyle }}
      >
        <div
          className={styles.spinnerCircle}
          style={{ width: sqSize, height: sqSize }}
        />
        <div
          className={styles.insideCircle}
          style={{
            height: sqSize - 2 * strokeWidth,
            width: sqSize - 2 * strokeWidth,
          }}
        >
          {showText && <span>{text}</span>}
        </div>
        {size === RingSize.SMALL ? (
          <div className={styles.ringPinCircle} />
        ) : (
          <RingPin className={styles.ringPinImage} />
        )}
      </div>
    </div>
  );
};

export default observer(Ring);
