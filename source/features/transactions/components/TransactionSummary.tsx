import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { NavigationActions } from '../../navigation';
import { ITransactionDetails } from '../types';
import styles from './TransactionSummary.scss';

export interface ITransactionSummaryProps extends ITransactionDetails {
  navigation?: NavigationActions;
  networkBlockHeight: number;
  title: string;
}

const TransactionSummary = (props: ITransactionSummaryProps) => {
  const onEpochNumberClick = (epoch: ITransactionDetails['block']['epoch']) => {
    if ((!epoch && epoch !== 0) || epoch === '-') {
      return;
    }
    props.navigation?.goToEpochDetailsPage.trigger({ number: epoch });
  };
  const onBlockIdClick = (id: ITransactionDetails['block']['id']) => {
    if (!id) {
      return;
    }
    props.navigation?.goToBlockDetailsPage.trigger({ id });
  };
  return (
    <div className={styles.transactionSummaryContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.infoPanel}>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Received Time</div>
            <div className={styles.infoValue}>
              {props.includedAt.toString()}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Confirmations</div>
            <div className={styles.infoValue}>
              {props.block?.number && props.networkBlockHeight
                ? props.networkBlockHeight - props.block.number + 1
                : 0}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Included In</div>
            <div className={styles.infoValue}>
              Epoch{' '}
              {props.block.epoch ? (
                <span onClick={() => onEpochNumberClick(props.block.epoch)}>
                  {props.block.epoch}
                </span>
              ) : (
                '?'
              )}
              , Block{' '}
              <span onClick={() => onBlockIdClick(props.block.id)}>
                {props.block.number ?? props.block.id}
              </span>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Total Output</div>
            <div className={styles.infoValue}>{props.totalOutput} ADA</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Transaction Fee</div>
            <div className={styles.infoValue}>{props.fee} ADA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(TransactionSummary);
