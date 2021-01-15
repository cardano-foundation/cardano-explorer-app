import styles from './Tooltip.module.scss';

interface ITooltipProps {
  children: React.ReactNode;
  content: string | React.ReactElement;
  theme?: string;
  themeClass?: string;
}

export const ContentContainer = (props: { label: string; body: string }) => (
  <div className={styles.contentContainer}>
    <div className={styles.label}>{props.label}</div>
    <div className={styles.body}>{props.body}</div>
  </div>
);

const Tooltip = ({ children, theme, themeClass, content }: ITooltipProps) => (
  <div className={styles[theme ?? 'tooltip']}>
    <span className={styles[themeClass || 'translateCenter']}>{content}</span>
    {children}
  </div>
);

export default Tooltip;
