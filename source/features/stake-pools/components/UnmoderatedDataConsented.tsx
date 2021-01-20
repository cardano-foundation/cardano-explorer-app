import { useI18nFeature } from '../../i18n/context';
import { IUnmoderatedDataConsented } from '../types';
import styles from './UnmoderatedDataConsented.module.scss';

export default ({ type }: IUnmoderatedDataConsented) => {
  const { translate } = useI18nFeature().store;
  return (
    <div className={styles.unmoderatedDataConsentedContainer}>
      {type === 'stakePools'
        ? translate('stakePools.unmoderated')
        : translate('transaction.unmoderated')}
    </div>
  );
};
