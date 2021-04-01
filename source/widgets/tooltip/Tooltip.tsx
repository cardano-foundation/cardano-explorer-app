import styles from './Tooltip.module.scss';

interface ITooltipProps {
  children: React.ReactNode;
  content: string | React.ReactElement;
  theme?: string;
  themeClass?: string;
  style?: object;
}

export const ContentContainer = (props: { label: string; body?: React.ReactNode }) => (
  <div className={styles.contentContainer}>
    <div className={styles.label}>{props.label}</div>
    { props.body ?? <div className={styles.body}>{props.body}</div> }
  </div>
);

const Tooltip = ({
  children,
  theme,
  themeClass,
  content,
  style,
}: ITooltipProps) => (
  <div className={styles[theme ?? 'tooltip']}>
    <span style={style} className={styles[themeClass || 'translateCenter']}>
      {content}
    </span>
    {children}
  </div>
);

export default Tooltip;
