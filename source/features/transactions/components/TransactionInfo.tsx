import classnames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { observer } from 'mobx-react-lite';
import React from 'react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { getAddressRoute } from '../../address/helpers';
import { LocalizedLink } from '../../navigation/ui/LocalizedLink';
import { getTransactionRoute } from '../helpers';
import { ITransactionDetails } from '../types';
import styles from './TransactionInfo.module.scss';

dayjs.extend(relativeTime);
const ArrowNext = require('../../../public/assets/images/arrow-next.svg');
const SEVEN_DAYS = 7 * 24 * 3600000;

export interface ITransactionInfoProps extends ITransactionDetails {
  highlightAddress?: string;
  title?: string;
  dontLinkToTransaction?: boolean;
}

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

const TransactionInfo = (props: ITransactionInfoProps) => {
  const duration = dayjs().diff(dayjs(props.includedAt));
  let includedAt = null;
  if (Math.abs(duration) > SEVEN_DAYS) {
    includedAt = dayjs(props.includedAt).format('YYYY-MM-DD HH:mm');
  } else {
    includedAt = dayjs().to(dayjs(props.includedAt));
  }
  return (
    <div className={styles.transactionInfoContainer}>
      {props.title && (
        <div className={styles.header}>
          <DividerWithTitle title={props.title} />
        </div>
      )}
      <div className={styles.transactionInfoRowContainer}>
        <div className={styles.addresses}>
          <div className={styles.infoRow}>
            {props.dontLinkToTransaction ? (
              <div className={styles.id}>{props.id}</div>
            ) : (
              <LocalizedLink href={getTransactionRoute(props.id)}>
                <a className={classnames([styles.id, styles.linkedId])}>
                  {props.id}
                </a>
              </LocalizedLink>
            )}
            <div className={styles.includedAt}>{includedAt}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.inputs}>
              {props.inputs.map((input, i) =>
                input.address === props.highlightAddress ? (
                  <div
                    className={classnames([
                      styles.input,
                      styles.highlightAddress,
                    ])}
                    key={i}
                  >
                    <TransactionAddress address={input.address} />
                  </div>
                ) : (
                  <LocalizedLink href={getAddressRoute(input.address)} key={i}>
                    <a className={styles.input}>
                      <TransactionAddress address={input.address} />
                    </a>
                  </LocalizedLink>
                )
              )}
            </div>
            <div className={styles.nextIcon}>
              <ArrowNext />
            </div>
            <div className={styles.outputs}>
              {props.outputs.map((output, i) =>
                output.address === props.highlightAddress ? (
                  <div
                    className={classnames([
                      styles.output,
                      styles.highlightAddress,
                    ])}
                    key={i}
                  >
                    <TransactionAddress address={output.address} />
                  </div>
                ) : (
                  <LocalizedLink href={getAddressRoute(output.address)} key={i}>
                    <a className={styles.output}>
                      <TransactionAddress address={output.address} />
                    </a>
                  </LocalizedLink>
                )
              )}
            </div>
          </div>
        </div>
        <div className={styles.values}>
          <div className={styles.infoRow}>
            <div className={styles.totalOutput}>{props.totalOutput} ADA</div>
          </div>
          <div className={styles.infoRow}>
            {props.outputs.map((output, i) => (
              <div key={i} className={styles.value}>
                {output.value} ADA
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(TransactionInfo);
