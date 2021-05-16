import React from 'react';
import styles from '../TransactionInfo.module.scss';

interface ITransactionInfoRowProps {
  label: string;
  value: string;
}

export const TransactionInfoRow = (props: ITransactionInfoRowProps) => {
  return (
    <div className={styles.row}>
      <div data-testid="label" className={styles.label}>
        {props.label}
      </div>
      <div data-testid="value" className={styles.value}>
        {props.value}
      </div>
    </div>
  );
};
