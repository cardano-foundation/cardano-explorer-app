import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { NavigationActions } from '../../navigation';
import { ITransactionDetails } from '../types';
import styles from './TransactionSummary.scss';

export interface ITransactionSummaryProps {
  navigation?: NavigationActions;
  networkBlockHeight: number;
  title: string;
  transaction: ITransactionDetails;
}

const TransactionSummary = ({
  navigation,
  networkBlockHeight,
  title,
  transaction,
}: ITransactionSummaryProps) => {
  const onEpochNumberClick = (epoch: ITransactionDetails['epoch']) => () => {
    if (epoch) {
      navigation?.goToEpochDetailsPage.trigger({ number: epoch });
    }
  };
  const onBlockIdClick = (id: ITransactionDetails['block']['id']) => () => {
    if (id) {
      navigation?.goToBlockDetailsPage.trigger({ id });
    }
  };
  const txBlock = transaction.block;
  return (
    <div className={styles.transactionSummaryContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={title} />
      </div>
      <div className={styles.content}>
        <div className={styles.infoPanel}>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Received Time</div>
            <div className={styles.infoValue}>{transaction.receivedTime}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Confirmations</div>
            <div className={styles.infoValue}>
              {txBlock?.number ? networkBlockHeight - txBlock?.number + 1 : 0}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Included In</div>
            <div className={styles.infoValue}>
              Epoch{' '}
              {transaction.epoch ? (
                <span onClick={onEpochNumberClick(transaction.epoch)}>
                  {transaction.epoch}
                </span>
              ) : (
                '?'
              )}
              , Slot {transaction.slot}, block{' '}
              <span onClick={onBlockIdClick(transaction.block.id)}>
                {transaction.block.number ?? transaction.block.id}
              </span>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Total Output</div>
            <div className={styles.infoValue}>
              {transaction.totalOutput} ADA
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Transaction Fee</div>
            <div className={styles.infoValue}>{transaction.fee} ADA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(TransactionSummary);
