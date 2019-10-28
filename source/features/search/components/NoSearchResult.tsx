import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
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
        <div className={styles.errorRow}>
          <div className={styles.errorIcon}>
            <span className={styles.errorInnerIcon}>X</span>
          </div>
          <div className={styles.errorMessage}>
            Sorry, we could not find any results matching:
          </div>
        </div>
        <div className={styles.errorRowDescription}>
          <div className={styles.errorValue}>
            e70e8bb1b7a1a9eddb52e1f7923600611189ea70f69de15588f4947925ee5831
          </div>
          <div className={styles.errorDescriptionContainer}>
            <div className={styles.errorDescriptionIcon}></div>
            <p className={styles.errorDescriptionText}>
              Please enter a valid epoch id, block id, transaction id, address
              or epoch number and retry your search.
            </p>
          </div>
        </div>
        <div className={styles.errorRow}>
          <div className={styles.errorIcon}>
            <span className={styles.errorInnerIcon}>X</span>
          </div>
          <div className={styles.errorMessage}>
            Sorry, there are multiple results matching:
          </div>
        </div>
        <div className={styles.errorRowDescription}>
          <div className={styles.errorValue}>e70e8bb1</div>
          <div className={styles.errorDescriptionContainer}>
            <div className={styles.errorDescriptionIcon}></div>
            <p className={styles.errorDescriptionText}>
              You may have entered partial Id or partial address so the search
              is not able to match only one result. Please enter a valid epoch
              id, block id, transaction id, address or epoch number and retry
              your search.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default observer(NoSearchResult);
