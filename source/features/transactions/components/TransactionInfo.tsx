import classnames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { observer } from 'mobx-react-lite';
import React from 'react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { ADDRESS_SEARCH_RESULT_PATH } from '../../address/config';
import { NavigationActions } from '../../navigation';
import { TRANSACTION_SEARCH_RESULT_PATH } from '../config';
import { ITransactionDetails } from '../types';
import styles from './TransactionInfo.module.scss';

dayjs.extend(relativeTime);
const ArrowNext = require('../../../public/assets/images/arrow-next.svg');
const SEVEN_DAYS = 7 * 24 * 3600000;

export interface ITransactionInfoProps extends ITransactionDetails {
  highlightAddress?: string;
  navigation?: NavigationActions;
  title?: string;
  dontLinkToTransaction?: boolean;
}

const TransactionInfo = (props: ITransactionInfoProps) => {
  const duration = dayjs().diff(dayjs(props.includedAt));
  let includedAt = null;
  if (Math.abs(duration) > SEVEN_DAYS) {
    includedAt = dayjs(props.includedAt).format('YYYY-MM-DD HH:mm');
  } else {
    includedAt = dayjs().to(dayjs(props.includedAt));
  }
  const onAddressClick = (address: string) => {
    if (!address) {
      return;
    }
    props.navigation?.push.trigger({
      path: ADDRESS_SEARCH_RESULT_PATH,
      query: { address },
    });
  };
  const onIdClick = (id: ITransactionDetails['id']) => {
    if (!id) {
      return;
    }
    props.navigation?.push.trigger({
      path: TRANSACTION_SEARCH_RESULT_PATH,
      query: { id },
    });
  };
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
            <div
              className={classnames([
                styles.id,
                props.dontLinkToTransaction ? null : styles.linkedId,
              ])}
            >
              <span
                onClick={() =>
                  !props.dontLinkToTransaction && onIdClick(props.id)
                }
              >
                {props.id}
              </span>
            </div>
            <div className={styles.includedAt}>{includedAt}</div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.inputs}>
              {props.inputs.map((input, i) => (
                <div
                  key={i}
                  className={
                    input.address === props.highlightAddress
                      ? styles.highlightAddress
                      : styles.input
                  }
                  onClick={() => onAddressClick(input.address)}
                >
                  {input.address.length <= 34 ? (
                    <span>{input.address}</span>
                  ) : (
                    <>
                      <span className={styles.startCharacters}>
                        {input.address.substring(0, input.address.length - 17)}
                      </span>
                      <span>
                        {input.address.substring(input.address.length - 17)}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.nextIcon}>
              <ArrowNext />
            </div>
            <div className={styles.outputs}>
              {props.outputs.map((output, i) => (
                <div
                  key={i}
                  className={
                    output.address === props.highlightAddress
                      ? styles.highlightAddress
                      : styles.output
                  }
                  onClick={() => onAddressClick(output.address)}
                >
                  {output.address.length <= 34 ? (
                    <span>{output.address}</span>
                  ) : (
                    <>
                      <span className={styles.startCharacters}>
                        {output.address.substring(
                          0,
                          output.address.length - 17
                        )}
                      </span>
                      <span>
                        {output.address.substring(output.address.length - 17)}
                      </span>
                    </>
                  )}
                </div>
              ))}
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
