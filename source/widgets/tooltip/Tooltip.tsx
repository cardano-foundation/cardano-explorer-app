import { useEffect, useRef, useState } from 'react';
import styles from './Tooltip.module.scss';

interface ITooltipProps {
  children: React.ReactNode;
  content: string | React.ReactElement;
  theme?: string;
  themeClass?: string;
  style?: object;
}

export const ContentContainer = (props: {
  label: string;
  body?: React.ReactNode;
}) => (
  <div className={styles.contentContainer}>
    <div className={styles.label}>{props.label}</div>
    {props.body ?? <div className={styles.body}>{props.body}</div>}
  </div>
);

const Tooltip = ({
  children,
  theme = 'tooltip',
  themeClass = 'translateCenter',
  content,
  style,
}: ITooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const windowWidth = useRef(window.innerWidth);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const [positioning, setPositioning] = useState<object>();

  useEffect(() => {
    const distanceFromRight = tooltipRef.current?.getBoundingClientRect()
      .right!;

    if (distanceFromRight > windowWidth.current) {
      const x = windowWidth.current - distanceFromRight - 10;
      setPositioning({ left: x });
    }
  }, [isVisible]);

  return isMobile ? (
    <div className={styles[theme]}>
      {isVisible && (
        <span
          style={positioning}
          ref={tooltipRef}
          className={styles[themeClass]}
        >
          {content}
        </span>
      )}

      <div onClick={() => setIsVisible(!isVisible)}>{children}</div>
    </div>
  ) : (
    <div className={styles[theme]}>
      <span style={positioning} ref={tooltipRef} className={styles[themeClass]}>
        {content}
      </span>
      {children}
    </div>
  );
};

export default Tooltip;
