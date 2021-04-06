import styles from './Tooltip.module.scss';
import { useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = window.innerWidth <= 768;

  return isMobile ? (
    <div className={styles[theme]}>
      {isVisible && <span className={styles[themeClass]}>{content}</span>}

      <div onClick={() => setIsVisible(!isVisible)}>{children}</div>
    </div>
  ) : (
    <div className={styles[theme]}>
      <span style={style} className={styles[themeClass]}>
        {content}
      </span>
      {children}
    </div>
  );
};

export default Tooltip;
