import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { isNumber } from 'lodash';
import { observer } from 'mobx-react-lite';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { EPOCH_SEARCH_RESULT_PATH } from '../../epochs/config';
import { getEpochRoute } from '../../epochs/helpers';
import { useI18nFeature } from '../../i18n/context';
import { NavigationActions } from '../../navigation';
import { LocalizedLink } from '../../navigation/ui/LocalizedLink';
import { ITransactionDetails } from '../../transactions/types';
import { BLOCK_SEARCH_RESULT_PATH } from '../config';
import { IBlockDetailed } from '../types';
import styles from './BlockSummary.module.scss';

dayjs.extend(utc);

export type BlockSummaryProps = {
  navigation?: NavigationActions;
  networkBlockHeight: number;
  title: string;
} & IBlockDetailed;

const BlockSummary = (props: BlockSummaryProps) => {
  const { translate } = useI18nFeature().store;
  const onEpochNumberClick = (
    epoch: ITransactionDetails['block']['epoch']
  ) => () => {
    if (isNumber(epoch)) {
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
            <div className={styles.infoLabel}>
              {translate('blockSummary.id')}
            </div>
            <div className={styles.infoValue}>{props.id}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('blockSummary.epoch')}
            </div>
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
            <div className={styles.infoLabel}>
              {translate('blockSummary.block')}
            </div>
            <div className={styles.infoValue}>{props.number}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('blockSummary.slot')}
            </div>
            <div className={styles.infoValue}>{props.slotNo}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('blockSummary.confirmations')}
            </div>
            <div className={styles.infoValue}>{confirmations}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('blockSummary.size')}
            </div>
            <div className={styles.infoValue}>{props.size} bytes</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('blockSummary.transactions')}
            </div>
            <div className={styles.infoValue}>{props.transactionsCount}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('blockSummary.createdBy')}
            </div>
            <div className={styles.infoValue}>{props.createdBy}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('blockSummary.time')}
            </div>
            <div className={styles.infoValue}>
              {dayjs.utc(props.createdAt).format('YYYY/MM/DD HH:mm:ss')} UTC
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('blockSummary.previousBlock')}
            </div>
            <div className={styles.infoValue}>
              <span onClick={onBlockIdClick(props.prevBlock.id)}>
                {props.prevBlock.number !== '-'
                  ? props.prevBlock.number
                  : props.prevBlock.id}
              </span>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
              {translate('blockSummary.nextBlock')}
            </div>
            <div className={styles.infoValue}>
              <span onClick={onBlockIdClick(props.nextBlock.id)}>
                {props.nextBlock.number !== '-'
                  ? props.nextBlock.number
                  : props.nextBlock.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(BlockSummary);
