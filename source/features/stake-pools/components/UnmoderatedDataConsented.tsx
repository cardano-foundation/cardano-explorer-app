import { useI18nFeature } from '../../i18n/context';
import styles from './UnmoderatedDataConsented.module.scss';

export default () => {
  const { translate } = useI18nFeature().store;
  return (
    <div className={styles.unmoderatedDataConsentedContainer}>
      {translate('stakePools.unmoderated')}
    </div>
  );
};
