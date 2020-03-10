import Container from '../../../widgets/container/Container';
import { useI18nFeature } from '../../i18n/context';
import { LocalizedLink } from '../../navigation/ui/LocalizedLink';
import { IUnmoderatedDataWarning } from '../types';
import styles from './UnmoderatedDataWarning.module.scss';

export default ({ onAcceptUnmoderatedData }: IUnmoderatedDataWarning) => {
  const { translate } = useI18nFeature().store;
  return (
    <div className={styles.unmoderatedDataWarningContainer}>
      <Container>
        <div className={styles.contentTop}>
          <h2>
            <b>{translate('stakePools.unmoderatedWarning')}</b>{' '}
            {translate('stakePools.unmoderatedStakePoolData')}
          </h2>
          <p>{translate('stakePools.unmoderatedPoolTickerSymbols')}</p>
          <p>{translate('stakePools.unmoderatedEntitiesControl')}</p>
          <p>{translate('stakePools.unmoderatedContent')}</p>
        </div>
        <div className={styles.contentBottom}>
          <LocalizedLink href="/">
            <span>{translate('stakePools.unmoderatedLeave')}</span>
          </LocalizedLink>
          <button onClick={onAcceptUnmoderatedData}>
            {translate('stakePools.unmoderatedConfirmation')}
          </button>
        </div>
      </Container>
    </div>
  );
};
