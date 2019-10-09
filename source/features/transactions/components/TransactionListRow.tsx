import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import { shrinkAddress } from '../../../common/helpers';
import styles from './TransactionListRow.scss';

const ArrowNext = require('../../../static/assets/images/arrow-next.svg');
const SEVEN_DAYS = 7 * 24 * 3600000;

export interface ITransactionListRowProps {
  amounts: Array<number>;
  currentAddress: string;
  id: string;
  receivers: Array<string>;
  senders: Array<string>;
  transferredAt: number;
}

const TransactionListRow = (props: ITransactionListRowProps) => {
  const totalAmount = props.amounts.reduce((acc, value) => acc + value, 0);
  const duration = props.transferredAt - new Date().getTime();
  let transferredAt = null;
  if (Math.abs(duration) > SEVEN_DAYS) {
    transferredAt = moment(props.transferredAt).format('YYYY-MM-DD HH:mm');
  } else {
    transferredAt = moment.duration(duration, 'milliseconds').humanize(true);
  }
  return (
    <div className={styles.transactionListRowContainer}>
      <div className={styles.addresses}>
        <div className={styles.infoRow}>
          <div className={styles.id}>{props.id}</div>
          <div className={styles.transferredAt}>{transferredAt}</div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.senders}>
            {props.senders.map(sender => (
              <div
                key={sender}
                className={
                  sender === props.currentAddress
                    ? styles.currentAddress
                    : styles.sender
                }
              >
                {shrinkAddress(sender)}
              </div>
            ))}
          </div>
          <div className={styles.nextIcon}>
            <ArrowNext />
          </div>
          <div className={styles.receivers}>
            {props.receivers.map(receiver => (
              <div
                key={receiver}
                className={
                  receiver === props.currentAddress
                    ? styles.currentAddress
                    : styles.receiver
                }
              >
                {shrinkAddress(receiver)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.amounts}>
        <div className={styles.infoRow}>
          <div className={styles.totalAmount}>{totalAmount} ADA</div>
        </div>
        <div className={styles.infoRow}>
          {props.amounts.map((amount, index) => (
            <div key={`${index}`} className={styles.amount}>
              {amount} ADA
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default observer(TransactionListRow);
