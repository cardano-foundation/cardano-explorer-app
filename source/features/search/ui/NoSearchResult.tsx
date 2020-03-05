import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { useI18nFeature } from '../../i18n/context';
import { SearchType } from '../store';
import styles from './NoSearchResult.module.scss';

const NoSearchResult = ({
  searchQuery,
  searchType,
}: {
  searchQuery: string;
  searchType: SearchType;
}) => {
  const { translate } = useI18nFeature().store;
  const message =
    SearchType.address === searchType
      ? translate('search.notExist')
      : translate('search.notFound');
  return (
    <div className={styles.noSearchResultContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={`${searchType}`} />
      </div>
      <div className={styles.content}>
        <div className={styles.errorPanel}>
          <div className={styles.errorRow}>
            <div className={styles.errorIcon}>
              <span className={styles.errorInnerIcon}>X</span>
            </div>
            <div className={styles.errorMessage}>{message}</div>
          </div>
          <div className={styles.errorRowDescription}>
            <div className={styles.errorValue}>{searchQuery}</div>
            {searchType !== SearchType.address && (
              <div className={styles.errorDescriptionContainer}>
                <div className={styles.errorDescriptionIcon} />
                <p className={styles.errorDescriptionText}>
                  {translate('search.description')}
                </p>
              </div>
            )}
          </div>
          {/*<div className={styles.errorRow}>*/}
          {/*<div className={styles.errorIcon}>*/}
          {/*<span className={styles.errorInnerIcon}>X</span>*/}
          {/*</div>*/}
          {/*<div className={styles.errorMessage}>*/}
          {/*Sorry, there are multiple results matching:*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*<div className={styles.errorRowDescription}>*/}
          {/*<div className={styles.errorValue}>e70e8bb1</div>*/}
          {/*<div className={styles.errorDescriptionContainer}>*/}
          {/*<div className={styles.errorDescriptionIcon} />*/}
          {/*<p className={styles.errorDescriptionText}>*/}
          {/*You may have entered partial Id or partial address so the search*/}
          {/*is not able to match only one result. Please enter a valid epoch*/}
          {/*id, block id, transaction id, address or epoch number and retry*/}
          {/*your search.*/}
          {/*</p>*/}
          {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default observer(NoSearchResult);
