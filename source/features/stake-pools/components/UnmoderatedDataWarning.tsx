import cx from 'classnames';
import Container from '../../../widgets/container/Container';
import { useI18nFeature } from '../../i18n/context';
import { LocalizedLink } from '../../navigation/ui/LocalizedLink';
import { IUnmoderatedDataWarning } from '../types';
import styles from './UnmoderatedDataWarning.module.scss';

export default ({ onAcceptUnmoderatedData, type }: IUnmoderatedDataWarning) => {
  const { translate } = useI18nFeature().store;
  const containerStyles = cx([
    styles.unmoderatedDataWarningContainer,
    type === 'transactions' ? styles.transactionsWarning : null,
  ]);
  return (
    <div className={containerStyles}>
      <Container>
        <div className={styles.contentTop}>
          <h2>
            <b>
              {type === 'stakePools'
                ? translate('stakePools.unmoderatedWarning')
                : translate('transaction.unmoderatedWarning')}
            </b>{' '}
            {type === 'stakePools'
              ? translate('stakePools.unmoderatedStakePoolData')
              : translate('transaction.unmoderatedTransactionData')}
          </h2>
          <p>
            {type === 'stakePools'
              ? translate('stakePools.unmoderatedPoolTickerSymbols')
              : translate('transaction.unmoderatedPoolTickerSymbols')}
          </p>
          <p>
            {type === 'stakePools'
              ? translate('stakePools.unmoderatedEntitiesControl')
              : translate('transaction.unmoderatedEntitiesControl')}
          </p>
          <p>
            {type === 'stakePools'
              ? translate('stakePools.unmoderatedContent')
              : translate('transaction.unmoderatedContent')}
          </p>
        </div>
        <div className={styles.contentBottom}>
          <LocalizedLink href="">
            <span>
              {type === 'stakePools'
                ? translate('stakePools.unmoderatedLeave')
                : translate('transaction.unmoderatedLeave')}
            </span>
          </LocalizedLink>
          <button onClick={onAcceptUnmoderatedData}>
            {type === 'stakePools'
              ? translate('stakePools.unmoderatedConfirmation')
              : translate('transaction.unmoderatedConfirmation')}
          </button>
        </div>
      </Container>
    </div>
  );
};
