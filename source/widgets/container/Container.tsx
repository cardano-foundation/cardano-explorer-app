import classnames from 'classnames';
import styles from './Container.scss';

interface IContainer {
  children: any;
  hasTopMargin?: boolean;
}

export default ({ children, hasTopMargin }: IContainer) => (
  <div
    className={classnames([
      styles.containerComponent,
      hasTopMargin ? styles.topMargin : null,
    ])}
  >
    {children}
  </div>
);
