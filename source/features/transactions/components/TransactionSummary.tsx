import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { BLOCK_SEARCH_RESULT_PATH } from '../../blocks/config';
import { EPOCH_SEARCH_RESULT_PATH } from '../../epochs/config';
import { useI18nFeature } from '../../i18n/context';
import { NavigationActions } from '../../navigation';
import { ITransactionDetails } from '../types';
import styles from './TransactionSummary.module.scss';

export interface ITransactionSummaryProps extends ITransactionDetails {
  navigation?: NavigationActions;
  networkBlockHeight: number;
  title: string;
}

const TransactionSummary = (props: ITransactionSummaryProps) => {
  const { translate } = useI18nFeature().store;
  const onEpochNumberClick = (e: ITransactionDetails['block']['epoch']) => {
    if ((!e && e !== 0) || e === '-') {
      return;
    }
    props.navigation?.push.trigger({
      path: EPOCH_SEARCH_RESULT_PATH,
      query: { number: e },
    });
  };
  const onBlockIdClick = (id: ITransactionDetails['block']['id']) => {
    if (!id) {
      return;
    }
    props.navigation?.push.trigger({
      path: BLOCK_SEARCH_RESULT_PATH,
      query: { id },
    });
  };
  const epoch = props.block.epoch === '-' ? 0 : props.block.epoch;
  return (
    <div className={styles.transactionSummaryContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.infoPanel}>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('transaction.receivedTime')}
            </div>
            <div className={styles.infoValue}>
              {dayjs(props.includedAt).format('YYYY-MM-DD HH:mm')}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('transaction.confirmations')}
            </div>
            <div className={styles.infoValue}>
              {props.block?.number && props.networkBlockHeight
                ? props.networkBlockHeight - props.block.number + 1
                : 0}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('transaction.includedIn')}
            </div>
            <div className={styles.infoValue}>
              {translate('transaction.epoch')}{' '}
              {isNumber(epoch) ? (
                <span onClick={() => onEpochNumberClick(epoch)}>{epoch}</span>
              ) : (
                '?'
              )}
              , {translate('transaction.block')}{' '}
              <span onClick={() => onBlockIdClick(props.block.id)}>
                {props.block.number ?? props.block.id}
              </span>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('transaction.totalOutput')}
            </div>
            <div className={styles.infoValue}>{props.totalOutput} ADA</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('transaction.fee')}
            </div>
            <div className={styles.infoValue}>{props.fee} ADA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(TransactionSummary);
