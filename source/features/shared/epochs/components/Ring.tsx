import { observer } from 'mobx-react-lite';
import styles from './Ring.scss';

export interface IRingProps {
  percentage: number;
  sqSize: number;
  strokeWidth: number;
  showText?: boolean;
}

const Ring = (props: IRingProps) => {
  const { percentage, sqSize, strokeWidth, showText } = props;

  const invertedPercentage = 100 - percentage;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * invertedPercentage) / 100;
  const rotateDeg = -((invertedPercentage / 100) * 360 + 90);

  return (
    <div className={styles.ringContainer}>
      <svg width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle
          className={styles.circleProgress}
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className={styles.circleBackground}
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(${rotateDeg} ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
        {showText && (
          <text
            className={styles.circleText}
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
          >
            {`${invertedPercentage}%`}
          </text>
        )}
      </svg>
    </div>
  );
};

export default observer(Ring);
