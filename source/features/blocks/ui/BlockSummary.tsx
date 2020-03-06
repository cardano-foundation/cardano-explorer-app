import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { EPOCH_SEARCH_RESULT_PATH } from '../../epochs/config';
import { getEpochRoute } from '../../epochs/helpers';
import { NavigationActions } from '../../navigation';
import { LocalizedLink } from '../../navigation/ui/LocalizedLink';
import { ITransactionDetails } from '../../transactions/types';
import { BLOCK_SEARCH_RESULT_PATH } from '../config';
import { IBlockDetailed } from '../types';
import styles from './BlockSummary.module.scss';

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
      props.navigation?.push.trigger({
        path: EPOCH_SEARCH_RESULT_PATH,
        query: { number: epoch },
      });
    }
  };
  const onBlockIdClick = (id: ITransactionDetails['block']['id']) => () => {
    if (id) {
      props.navigation?.push.trigger({
        path: BLOCK_SEARCH_RESULT_PATH,
        query: { id },
      });
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
              {isNumber(props.epoch) ? (
                <LocalizedLink href={getEpochRoute(props.epoch)}>
                  {props.epoch}
                </LocalizedLink>
              ) : (
                props.epoch
              )}
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
              {dayjs(props.createdAt).format('YYYY/MM/DD HH:mm:ss')}
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
