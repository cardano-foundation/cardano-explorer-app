import classnames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { isNumber } from 'lodash';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { isDefined } from '../../../lib/types';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { getAddressRoute } from '../../address/helpers';
import { BLOCK_SEARCH_RESULT_PATH } from '../../blocks/config';
import { EPOCH_SEARCH_RESULT_PATH } from '../../epochs/config';
import { useI18nFeature } from '../../i18n/context';
import { NavigationActions } from '../../navigation';
import { LocalizedLink } from '../../navigation/ui/LocalizedLink';
import { getBlockRoute, getEpochRoute, getTransactionRoute } from '../helpers';
import {
  ITransactionDetails,
  ITransactionInput,
  ITransactionOutput,
  IWithdrawal,
} from '../types';
import styles from './TransactionInfo.module.scss';

dayjs.extend(relativeTime);
dayjs.extend(utc);

const ArrowNext = require('../../../public/assets/images/arrow-next.svg');

const TransactionAddress = (props: { address: string }) =>
  props.address.length <= 34 ? (
    <span>{props.address}</span>
  ) : (
    <>
      <div>{props.address.toString().substring(0, 16)}</div>
      {'...'}
      <div>{props.address.toString().substring(props.address.length - 16)}</div>
    </>
  );

const TransactionAddressMobile = (props: { address: string }) =>
  props.address.length <= 34 ? (
    <span>{props.address}</span>
  ) : (
    <>
      <div>{props.address.toString().substring(0, 19)}</div>
      {'...'}
      <div>{props.address.toString().substring(props.address.length - 19)}</div>
    </>
  );

type AddressInputOutput = ITransactionInput | IWithdrawal | ITransactionOutput;

interface IAddressesRowProps {
  addresses?: Array<AddressInputOutput>;
  highlightedAddress?: string;
  isMobile: boolean;
}

const AddressesRow = ({
  addresses,
  highlightedAddress,
  isMobile,
}: IAddressesRowProps) => (
  <>
    {addresses?.filter(isDefined).map((io, index) => (
      <div className={styles.io}>
        {io.address === highlightedAddress ? (
          <div
            className={classnames([styles.address, styles.highlightAddress])}
            key={index}
          >
            {!isMobile && <TransactionAddress address={io.address} />}
            {isMobile && <TransactionAddressMobile address={io.address} />}
          </div>
        ) : (
          <LocalizedLink href={getAddressRoute(io.address)} key={index}>
            <span className={styles.address}>
              {!isMobile && <TransactionAddress address={io.address} />}
              {isMobile && <TransactionAddressMobile address={io.address} />}
            </span>
          </LocalizedLink>
        )}
        <div className={styles.amount}>{io.value} ADA</div>
      </div>
    ))}
  </>
);

export interface ITransactionInfoProps extends ITransactionDetails {
  dontLinkToTransaction?: boolean;
  hasSeparator?: boolean;
  highlightAddress?: string;
  navigation?: NavigationActions;
  networkBlockHeight?: number;
  showDetails?: boolean;
  title?: string;
  showUnmoderatedData?: boolean;
}

const TransactionInfo = (props: ITransactionInfoProps) => {
  const { translate } = useI18nFeature().store;
  const isMobile = window.innerWidth <= 768;
  const includedAtUtc = dayjs.utc(props.includedAt);
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
  const depositLabel =
    parseInt(props.deposit) >= 0
      ? 'transaction.deposit'
      : 'transaction.depositReclaim';
  return (
    <div className={styles.root}>
      {props.title && (
        <div className={styles.header}>
          <DividerWithTitle title={props.title} />
        </div>
      )}

      {/* ===== RECEIVED TIME ===== */}

      <div className={styles.row}>
        <div className={styles.label}>
          {translate('transaction.receivedTime')}
        </div>
        <div className={styles.value}>
          &gt; {dayjs().utc().to(includedAtUtc)} (
          {includedAtUtc.format('YYYY-MM-DD HH:mm:ss')} UTC)
        </div>
      </div>

      {/* ===== INCLUDED IN ===== */}

      {props.showDetails && (
        <div className={styles.row}>
          <div className={styles.label}>
            {translate('transaction.includedIn')}
          </div>
          <div className={styles.value}>
            {translate('transaction.epoch')}{' '}
            {isNumber(epoch) ? (
              <LocalizedLink href={getEpochRoute(epoch)}>{epoch}</LocalizedLink>
            ) : (
              '?'
            )}
            , {translate('transaction.block')}{' '}
            <LocalizedLink href={getBlockRoute(props.block.id)}>
              {props.block.number ?? props.block.id}
            </LocalizedLink>
          </div>
        </div>
      )}

      {/* ===== CONFIRMATIONS ===== */}

      {props.showDetails && (
        <div className={styles.row}>
          <div className={styles.label}>
            {translate('transaction.confirmations')}
          </div>
          <div className={styles.value}>
            {props.block?.number && props.networkBlockHeight
              ? props.networkBlockHeight - props.block.number + 1
              : 0}
          </div>
        </div>
      )}

      {/* ===== TRANSACTION ID ===== */}

      <div className={classnames([styles.idRow, styles.row])}>
        <div className={styles.label}>{translate('transaction.id')}</div>
        <div className={styles.value}>
          {props.dontLinkToTransaction ? (
            <div className={styles.id}>{props.id}</div>
          ) : (
            <LocalizedLink href={getTransactionRoute(props.id)}>
              {props.id}
            </LocalizedLink>
          )}
        </div>
      </div>

      {/* ===== FROM ADDRESSES ===== */}

      <div className={classnames([styles.fromRow, styles.row])}>
        <div className={styles.label}>
          {translate('transaction.from')}
          <div className={styles.arrowDesktop}>
            <ArrowNext />
          </div>
        </div>
        <div className={styles.value}>
          <AddressesRow
            addresses={[...props.inputs, ...props.withdrawals]}
            highlightedAddress={props.highlightAddress}
            isMobile={isMobile}
          />
        </div>
      </div>

      <div className={styles.arrowMobile}>
        <ArrowNext />
      </div>

      {/* ===== TO ADDRESSES ===== */}

      <div className={styles.row}>
        <div className={styles.label}>{translate('transaction.to')}</div>
        <div className={styles.value}>
          <AddressesRow
            addresses={props.outputs}
            highlightedAddress={props.highlightAddress}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* ===== DEPOSIT ===== */}
      {props.deposit !== '0' && (
        <div className={styles.row}>
          <div className={styles.label}>{translate(depositLabel)}</div>
          <div className={styles.value}>
            {Math.abs(parseInt(props.deposit))} ADA
          </div>
        </div>
      )}

      {/* ===== TOTAL OUTPUT ===== */}

      <div className={styles.row}>
        <div className={styles.label}>
          {translate('transaction.totalOutput')}
        </div>
        <div className={styles.value}>{props.totalOutput} ADA</div>
      </div>

      {/* ===== CONFIRMATIONS ===== */}

      {props.showDetails && (
        <div className={styles.row}>
          <div className={styles.label}>{translate('transaction.fee')}</div>
          <div className={styles.value}>{props.fee} ADA</div>
        </div>
      )}

      {/* ===== METADATA ===== */}

      {props.showUnmoderatedData && props.metadata && props.metadata.length && (
        <div className={styles.row}>
          <div className={styles.label}>
            {translate('transaction.metadata')}
          </div>
          <div className={styles.value}>
            {props.metadata.map((item) => {
              return <span>{item.value}</span>;
            })}
          </div>
        </div>
      )}

      {/* ===== DOTTED LINE SEPARATOR ===== */}

      {props.hasSeparator && (
        <div className={styles.txSeparator}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="3px">
            <line
              x1="1px"
              x2="100%"
              y1="1px"
              y2="1px"
              stroke="#36395d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1px, 6px"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default observer(TransactionInfo);
