import { observer } from 'mobx-react-lite';
import moment from 'moment';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { NavigationActions } from '../../navigation';
import { ITransactionDetails } from '../../transactions/types';
import { IBlockDetailed } from '../types';
import styles from './BlockSummary.scss';

export type BlockSummaryProps = {
  navigation?: NavigationActions;
  networkBlockHeight: number;
  title: string;
} & IBlockDetailed;

const BlockSummary = (props: BlockSummaryProps) => {
  const onEpochNumberClick = (
    epoch: ITransactionDetails['block']['epoch']
  ) => () => {
    if (epoch && epoch !== '-') {
      props.navigation?.goToEpochDetailsPage.trigger({ number: epoch });
    }
  };
  const onBlockIdClick = (id: ITransactionDetails['block']['id']) => () => {
    if (id) {
      props.navigation?.goToBlockDetailsPage.trigger({ id });
    }
  };
  const effectiveNumber = props.number !== '-' ? props.number : 0;
  const confirmations = props.networkBlockHeight - effectiveNumber + 1;
  return (
    <div className={styles.blockSummaryContainer}>
      <div className={styles.header}>
        <DividerWithTitle title={props.title} />
      </div>
      <div className={styles.content}>
        <div className={styles.infoPanel}>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>ID</div>
            <div className={styles.infoValue}>{props.id}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Epoch</div>
            <div className={styles.infoValue}>
              <span onClick={onEpochNumberClick(props.epoch)}>
                {props.epoch}
              </span>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Block</div>
            <div className={styles.infoValue}>{props.number}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Confirmations</div>
            <div className={styles.infoValue}>{confirmations}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Size</div>
            <div className={styles.infoValue}>{props.size} bytes</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Transactions</div>
            <div className={styles.infoValue}>{props.transactionsCount}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Created by</div>
            <div className={styles.infoValue}>{props.createdBy}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Time</div>
            <div className={styles.infoValue}>
              {moment(props.createdAt).format('YYYY/MM/DD HH:mm:ss')}
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Previous block</div>
            <div className={styles.infoValue}>
              <span onClick={onBlockIdClick(props.prevBlock.id)}>
                {props.prevBlock.number !== '-'
                  ? props.prevBlock.number
                  : props.prevBlock.id}
              </span>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Next block</div>
            <div className={styles.infoValue}>
              <span onClick={onBlockIdClick(props.nextBlock.id)}>
                {props.nextBlock.number !== '-'
                  ? props.nextBlock.number
                  : props.nextBlock.id}
              </span>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Merkle root</div>
            <div className={styles.infoValue}>{props.merkleRoot}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(BlockSummary);
