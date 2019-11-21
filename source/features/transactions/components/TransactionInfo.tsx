import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import DividerWithTitle from '../../../widgets/divider-with-title/DividerWithTitle';
import { NavigationActions } from '../../navigation';
import { ITransactionDetails } from '../types';
import styles from './TransactionInfo.scss';

const ArrowNext = require('../../../public/assets/images/arrow-next.svg');
const SEVEN_DAYS = 7 * 24 * 3600000;

export interface ITransactionInfoProps extends ITransactionDetails {
  highlightAddress?: string;
  navigation?: NavigationActions;
  title?: string;
}

const TransactionInfo = (props: ITransactionInfoProps) => {
  const duration = moment(props.includedAt).diff(moment());
  let includedAt = null;
  if (Math.abs(duration) > SEVEN_DAYS) {
    includedAt = moment(props.includedAt).format('YYYY-MM-DD HH:mm');
  } else {
    includedAt = moment.duration(duration, 'milliseconds').humanize(true);
  }
  const onAddressClick = (address: string) => {
    if (!address) {
      return;
    }
    props.navigation?.goToAddressDetailsPage.trigger({ address });
  };
  const onIdClick = (id: ITransactionDetails['id']) => {
    if (!id) {
      return;
    }
    props.navigation?.goToTransactionDetailsPage.trigger({ id });
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
            <div className={styles.id}>
              <span onClick={() => onIdClick(props.id)}>{props.id}</span>
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
