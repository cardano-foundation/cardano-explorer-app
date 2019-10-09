import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../divider-with-title/components/DividerWithTitle';
import styles from './NoSearchResult.scss';

const error = 'Address';

const NoSearchResult = () => (
  <div className={styles.noSearchResultContainer}>
    <div className={styles.header}>
      <DividerWithTitle title={error} />
    </div>
    <div className={styles.content}>
      <div className={styles.errorPanel}>
        <div className={styles.errorRow}>
          <div className={styles.errorIcon}>
            <span className={styles.errorInnerIcon}>X</span>
          </div>
          <div className={styles.errorMessage}>Address does not exist.</div>
        </div>
      </div>
    </div>
  </div>
);

export default observer(NoSearchResult);
